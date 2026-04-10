import { AppDataSource } from "../config/data-source.js";
import { Commission } from "../entity/Commission.js";
import { Order } from "../entity/Order.js";
import { OrderItem } from "../entity/OrderItems.js";
import { PaymentTransaction } from "../entity/PaymentTransaction.js";
import { SellerBalance } from "../entity/SellerBalance.js";
import {
  PayoutPreference,
  SellerPaymentInfo,
} from "../entity/SellerPaymentInfo.js";
import { calculateCommission } from "../lib/commission.js";
import env from "../lib/env.js";
import { BadRequestError, NotFoundError } from "../lib/erros.js";
import { initiateKhaltiPayment, verifyKhaltiPayment } from "../lib/khalti.js";
import { mapSellerCommission, mapTx } from "../lib/utlis.js";
import {
  CommissionStatus,
  NotificationType,
  PaymentMethod,
  PaymentStatus,
  TransactionStatus,
} from "../types/global.types.js";
import {
  ISellerCommissionResponse,
  ISellerDashboardStats,
} from "../types/payment.schema.js";
import { createNotificationService } from "./notification.service.js";
import { In } from "typeorm";

const transcationRepository = AppDataSource.getRepository(PaymentTransaction);
const commissionRepository = AppDataSource.getRepository(Commission);
const balanceRepository = AppDataSource.getRepository(SellerBalance);
const orderRepository = AppDataSource.getRepository(Order);
const orderItemRepository = AppDataSource.getRepository(OrderItem);
const sellerPaymentInfoRepository =
  AppDataSource.getRepository(SellerPaymentInfo);

const getOrCreateBalance = async (
  manager: any,
  sellerId: string,
): Promise<SellerBalance> => {
  let balance = await manager.findOne(SellerBalance, {
    where: { seller_id: sellerId },
  });
  if (!balance) {
    balance = manager.create(SellerBalance, {
      seller_id: sellerId,
      pendingAmount: 0,
      availableAmount: 0,
      totalPaidOut: 0,
    });
    balance = await manager.save(SellerBalance, balance);
  }
  return balance;
};

const processPaymentSuccess = async (
  manager: any,
  order: Order,
  items: OrderItem[],
) => {
  for (const item of items) {
    const { rate, commissionAmount, sellerAmount } = calculateCommission(
      Number(item.subtotal),
    );

    const commission = manager.create(Commission, {
      order_item_id: item.id,
      order_id: order.id,
      seller_id: item.seller_id,
      itemAmount: Number(item.subtotal),
      commissionRate: rate,
      commissionAmount,
      sellerAmount,
      status: CommissionStatus.PENDING,
    });
    await manager.save(Commission, commission);

    const balance = await getOrCreateBalance(manager, item.seller_id);
    balance.pendingAmount = parseFloat(
      (balance.pendingAmount + sellerAmount).toFixed(2),
    );
    await manager.save(SellerBalance, balance);
  }
};

export const initiatePaymentService = async (
  userId: string,
  orderId: string,
  method: PaymentMethod,
) => {
  const order = await orderRepository.findOne({
    where: { id: orderId, user_id: userId },
    relations: ["items"],
  });
  if (!order) throw new NotFoundError("Order not found");
  if (order.paymentStatus === "PAID") {
    throw new BadRequestError("Order is already paid");
  }
  return await AppDataSource.transaction(async (manager) => {
    if (method === PaymentMethod.COD) {
      const tx = manager.create(PaymentTransaction, {
        order_id: orderId,
        user_id: userId,
        method: PaymentMethod.COD,
        status: TransactionStatus.PENDING,
        amount: Number(order.totalAmount),
      });
      const saved = await manager.save(PaymentTransaction, tx);

  
      await manager.update(Order, orderId, {
        paymentMethod: PaymentMethod.COD,
      });

      return { transaction: mapTx(saved) };
    }
    const khaltiRes = await initiateKhaltiPayment({
      amount: Number(order.totalAmount),
      orderId: order.id,
      orderName: `Order #${order.id.slice(0, 8).toUpperCase()}`,
      returnUrl: `${env.BACKEND_URL}/payments/khalti/verify`,
    });

    const tx = manager.create(PaymentTransaction, {
      order_id: orderId,
      user_id: userId,
      method: PaymentMethod.KHALTI,
      status: TransactionStatus.INITIATED,
      amount: Number(order.totalAmount),
      pidx: khaltiRes.pidx,
    });
    const saved = await manager.save(PaymentTransaction, tx);

    await manager.update(Order, orderId, {
      paymentMethod: PaymentMethod.KHALTI,
    });

    return {
      paymentUrl: khaltiRes.payment_url,
      transaction: mapTx(saved),
    };
  });
};

export const verifyKhaltiService = async (pidx: string) => {
  const tx = await transcationRepository.findOne({
    where: { pidx },
    relations: ["order"],
  });

  if (!tx) throw new NotFoundError("Transaction not found");
  if (tx.status === TransactionStatus.COMPLETED) {
    return { success: true, orderId: tx.order_id };
  }

  const khaltiData = await verifyKhaltiPayment(pidx);

  return await AppDataSource.transaction(async (manager) => {
    if (khaltiData.status !== "Completed") {
      tx.status = TransactionStatus.FAILED;
      tx.gatewayResponse = khaltiData;
      await manager.save(PaymentTransaction, tx);
      throw new BadRequestError(`Payment not completed: ${khaltiData.status}`);
    }

    tx.status = TransactionStatus.COMPLETED;
    tx.transactionId = khaltiData.transaction_id;
    tx.gatewayResponse = khaltiData;
    tx.refundEligibleUntil = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);
    await manager.save(PaymentTransaction, tx);

    await manager.update(Order, tx.order_id, {
      paymentStatus: PaymentStatus.PAID,
      paymentReference: khaltiData.transaction_id,
    });

    
    const freshOrder = await manager.findOneOrFail(Order, {
      where: { id: tx.order_id },
      relations: ["items"],
    });

    const items = await manager.find(OrderItem, {
      where: { order_id: tx.order_id },
    });

    await processPaymentSuccess(manager, freshOrder, items);

    await createNotificationService({
      userId: tx.user_id,
      type: NotificationType.PAYMENT_RECEIVED,
      title: "Payment Successful",
      message: `Your payment of Rs. ${Number(tx.amount).toLocaleString()} was received.`,
      orderId: tx.order_id,
    });

    return { success: true, orderId: tx.order_id };
  });
};

export const confirmCODPaymentService = async (
  orderId: string,
): Promise<void> => {
  const order = await orderRepository.findOne({
    where: { id: orderId },
    relations: ["items"],
  });

  if (!order) throw new NotFoundError("Order not found");
  if (order.paymentStatus === PaymentStatus.PAID) return;

  await AppDataSource.transaction(async (manager) => {
    await processCODConfirmation(manager, orderId, order);
  });
};

export const releaseCommissionService = async (orderId: string) => {
  const commissions = await commissionRepository.find({
    where: { order_id: orderId, status: CommissionStatus.CONFIRMED },
  });

  if (commissions.length === 0) return { released: 0 };
  const tx = await transcationRepository.findOne({
    where: { order_id: orderId, status: TransactionStatus.COMPLETED },
    order: { createdAt: "DESC" },
  });

  if (!tx)
    throw new BadRequestError("No completed payment found for this order");

  if (tx.refundEligibleUntil && new Date() < tx.refundEligibleUntil) {
    const daysLeft = Math.ceil(
      (tx.refundEligibleUntil.getTime() - Date.now()) / (1000 * 60 * 60 * 24),
    );
    throw new BadRequestError(
      `Cannot release commissions yet. Refund window closes in ${daysLeft} day${daysLeft === 1 ? "" : "s"}.`,
    );
  }

  return await AppDataSource.transaction(async (manager) => {
    for (const commission of commissions) {
      commission.status = CommissionStatus.RELEASED;
      await manager.save(Commission, commission);

      const balance = await getOrCreateBalance(manager, commission.seller_id);
      balance.pendingAmount = Math.max(
        0,
        parseFloat(
          (balance.pendingAmount - commission.sellerAmount).toFixed(2),
        ),
      );
      balance.availableAmount = parseFloat(
        (balance.availableAmount + commission.sellerAmount).toFixed(2),
      );

      await manager.save(SellerBalance, balance);
    }
    return { released: commissions.length };
  });
};

export const getSellerBalanceService = async (sellerId: string) => {
  const balance = await getOrCreateBalance(
    AppDataSource.createEntityManager(),
    sellerId,
  );
  return {
    id: balance.id,
    seller_id: balance.seller_id,
    pendingAmount: balance.pendingAmount,
    availableAmount: balance.availableAmount,
    totalPaidOut: balance.totalPaidOut,
  };
};

export const upsertPaymentInfoService = async (
  sellerId: string,
  data: {
    khaltiId?: string;
    khaltiName?: string;
    payoutPreference: PayoutPreference;
  },
) => {
  let info = await sellerPaymentInfoRepository.findOne({
    where: { seller_id: sellerId },
  });

  if (info) {
   
    if (data.khaltiId && data.khaltiId !== info.khaltiId) {
      info.isVerified = false;
    }
    Object.assign(info, data);
  } else {
    info = sellerPaymentInfoRepository.create({
      seller_id: sellerId,
      ...data,
      isVerified: false,
    });
  }

  const saved = await sellerPaymentInfoRepository.save(info);
  return { paymentInfo: saved };
};

export const getPaymentInfoService = async (sellerId: string) => {
  const info = await sellerPaymentInfoRepository.findOne({
    where: { seller_id: sellerId },
  });
  return { paymentInfo: info ?? null };
};

export const processCODConfirmation = async (
  manager: any,
  orderId: string,
  order: Order,
): Promise<void> => {
  const tx = await manager.findOne(PaymentTransaction, {
    where: { order_id: orderId, method: PaymentMethod.COD },
  });

  if (!tx) return;
  if (order.paymentStatus === PaymentStatus.PAID) return;

  tx.status = TransactionStatus.COMPLETED;
  tx.refundEligibleUntil = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);
  await manager.save(PaymentTransaction, tx);

  await manager.update(Order, orderId, { paymentStatus: PaymentStatus.PAID });

  await processPaymentSuccess(manager, order, order.items);

  await createNotificationService({
    userId: order.user_id,
    type: NotificationType.PAYMENT_RECEIVED,
    title: "COD Payment Confirmed",
    message: `Your cash payment for order #${orderId.slice(0, 8).toUpperCase()} has been confirmed.`,
    orderId,
  });
};

export const getSellerDashboardService = async (
  sellerId: string,
): Promise<ISellerDashboardStats> => {
  const balance = await balanceRepository.findOne({
    where: { seller_id: sellerId },
  });

  const stats = await commissionRepository
    .createQueryBuilder("c")
    .select("SUM(c.seller_amount)", "totalEarned")
    .addSelect("SUM(c.commission_amount)", "totalCommission")
    .addSelect("SUM(c.item_amount)", "grossRevenue")
    .addSelect("COUNT(c.id)", "totalItems")
    .where("c.seller_id = :sellerId", { sellerId })
    .andWhere("c.status != :refunded", { refunded: CommissionStatus.REFUNDED })
    .getRawOne();

  const pendingStats = await commissionRepository
    .createQueryBuilder("c")
    .select("SUM(c.seller_amount)", "pendingAmount")
    .where("c.seller_id = :sellerId", { sellerId })
    .andWhere("c.status IN (:...statuses)", {
      statuses: [CommissionStatus.PENDING, CommissionStatus.CONFIRMED],
    })
    .getRawOne();

  return {
    totalEarned: parseFloat(stats?.totalEarned ?? "0"),
    totalCommission: parseFloat(stats?.totalCommission ?? "0"),
    grossRevenue: parseFloat(stats?.grossRevenue ?? "0"),
    totalItems: parseInt(stats?.totalItems ?? "0"),
    pendingAmount: parseFloat(pendingStats?.pendingAmount ?? "0"),
    availableAmount: Number(balance?.availableAmount ?? 0),
    totalPaidOut: Number(balance?.totalPaidOut ?? 0),
  };
};

export const getSellerCommissionsService = async (
  sellerId: string,
  query: { search?: string; status?: string; page?: number; pageSize?: number },
): Promise<{ commissions: ISellerCommissionResponse[]; total: number }> => {
  const { search, status, page = 1, pageSize = 10 } = query;
  const skip = (page - 1) * pageSize;

  const qb = commissionRepository
    .createQueryBuilder("c")
    .leftJoinAndSelect("c.order", "order")
    .leftJoinAndSelect("c.orderItem", "orderItem")
    .leftJoinAndSelect("orderItem.product", "product") // ← for image
    .where("c.seller_id = :sellerId", { sellerId })
    .orderBy("c.createdAt", "DESC")
    .skip(skip)
    .take(pageSize);

  if (search) {
    qb.andWhere(
      "(c.order_id::text ILIKE :search OR orderItem.product_name ILIKE :search)",
      { search: `%${search}%` },
    );
  }

  if (status) {
    qb.andWhere("c.status = :status", { status });
  }

  const [commissions, total] = await qb.getManyAndCount();

  
  const orderIds = [...new Set(commissions.map((c) => c.order_id))];

  const transactions =
    orderIds.length > 0
      ? await AppDataSource.getRepository(PaymentTransaction).find({
          where: {
            order_id: In(orderIds),
            status: TransactionStatus.COMPLETED,
          },
          select: ["order_id", "refundEligibleUntil"],
        })
      : [];

  const txMap = new Map(
    transactions.map((t) => [t.order_id, t.refundEligibleUntil]),
  );

  const mapped = commissions.map((c) =>
    mapSellerCommission(
      Object.assign(c, { releaseDate: txMap.get(c.order_id) ?? null }),
    ),
  );

  return { commissions: mapped, total };
};
