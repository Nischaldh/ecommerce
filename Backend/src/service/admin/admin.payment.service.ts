import { AppDataSource } from "../../config/data-source.js";
import { Commission } from "../../entity/Commission.js";
import { Order } from "../../entity/Order.js";
import { Payout } from "../../entity/Payout.js";
import { SellerBalance } from "../../entity/SellerBalance.js";
import { SellerPaymentInfo } from "../../entity/SellerPaymentInfo.js";
import { BadRequestError, NotFoundError } from "../../lib/erros.js";
import { initiateKhaltiTransfer } from "../../lib/khalti.js";
import { mapPayout } from "../../lib/utlis.js";
import { CommissionStatus, NotificationType, PayoutMethod, PayoutStatus } from "../../types/global.types.js";
import { IPayoutResponse } from "../../types/payment.schema.js";
import { createNotificationService } from "../notification.service.js";

const payoutRepository = AppDataSource.getRepository(Payout);
const balanceRepository = AppDataSource.getRepository(SellerBalance);
const orderRepository = AppDataSource.getRepository(Order);

const sellerBalanceRepository = AppDataSource.getRepository(SellerBalance);
const sellerPaymentInfoRepository = AppDataSource.getRepository(SellerPaymentInfo);

export const createPayoutService = async (
  adminId: string,
  sellerId: string,
  amount: number,
  method: PayoutMethod,
  notes?: string | null,
): Promise<{ payout: IPayoutResponse }> => {
  const balance = await balanceRepository.findOne({ where: { seller_id: sellerId } });
  if (!balance) throw new NotFoundError("Seller has no balance record");
  if (balance.availableAmount < amount) {
    throw new BadRequestError(
      `Insufficient balance. Available: Rs. ${balance.availableAmount}`
    );
  }

  let khaltiTransferId: string | null = null;

  if (method === PayoutMethod.KHALTI) {
    const paymentInfo = await AppDataSource
      .getRepository(SellerPaymentInfo)
      .findOne({ where: { seller_id: sellerId } });

    if (!paymentInfo?.khaltiId) {
      throw new BadRequestError(
        "Seller has not added their Khalti ID. Cannot process Khalti payout."
      );
    }
    if (!paymentInfo.isVerified) {
      throw new BadRequestError(
        "Seller payment info is not verified by admin yet."
      );
    }
  
        notes = notes
      ? `${notes} | Khalti: ${paymentInfo.khaltiId}`
      : `Khalti: ${paymentInfo.khaltiId} (${paymentInfo.khaltiName ?? "no name"})`;

    // const transferRes = await initiateKhaltiTransfer({
    //   amount,
    //   receiverKhaltiId: paymentInfo.khaltiId,
    //   remarks: `Payout for seller ${sellerId.slice(0, 8)}`,
    // });

    // if (!transferRes.success) {
    //   throw new BadRequestError(`Khalti transfer failed: ${transferRes.message}`);
    // }

    // khaltiTransferId = transferRes.transfer_id;
  }

  return await AppDataSource.transaction(async (manager) => {
    const payout = manager.create(Payout, {
      seller_id: sellerId,
      admin_id: adminId,
      amount,
      method,
      status: PayoutStatus.PROCESSING,
      payoutReference: null,
      notes: notes ?? null,
    });
    const saved = await manager.save(Payout, payout);

    balance.availableAmount = parseFloat(
      (balance.availableAmount - amount).toFixed(2)
    );
    balance.totalPaidOut = parseFloat(
      (balance.totalPaidOut + amount).toFixed(2)
    );
    await manager.save(SellerBalance, balance);
    await createNotificationService({
      userId: sellerId,
      type: NotificationType.PAYOUT_CREATED,
      title:"PAYOUT CREATED",
      message: `Your payout has been created and is being processed. Amount: Rs. ${amount}. Method: ${method}.`,
    })

    return { payout: mapPayout(saved) };
  });
};


export const completePayoutService = async (
  payoutId: string,
  payoutReference?: string,
): Promise<{ payout: IPayoutResponse }> => {
  const payout = await payoutRepository.findOne({ where: { id: payoutId } });
  if (!payout) throw new NotFoundError("Payout not found");

  if (payout.status !== PayoutStatus.PROCESSING) {
    throw new BadRequestError("Payout is not in processing state");
  }

  payout.status = PayoutStatus.COMPLETED;
  payout.payoutReference = payoutReference||null;
  const saved = await payoutRepository.save(payout);
  await createNotificationService({
    userId: payout.seller_id,
    type: NotificationType.PAYOUT_COMPLETED,
    title:"PAYOUT COMPLETED",
    message: `Your payout of Rs. ${payout.amount} has been completed. Method: ${payout.method}. Reference: ${payoutReference ?? "N/A"}`,
  })

  return { payout: mapPayout(saved) };
};


export const failPayoutService = async (
  payoutId: string,
  notes: string,
): Promise<{ payout: IPayoutResponse }> => {
  const payout = await payoutRepository.findOne({ where: { id: payoutId } });
  if (!payout) throw new NotFoundError("Payout not found");

  if (payout.status !== PayoutStatus.PROCESSING) {
    throw new BadRequestError("Payout is not in processing state");
  }

  return await AppDataSource.transaction(async (manager) => {
    payout.status = PayoutStatus.FAILED;
    payout.notes = notes;
    await manager.save(Payout, payout);

    const balance = await manager.findOne(SellerBalance, {
      where: { seller_id: payout.seller_id },
    });
    if (balance) {
      balance.availableAmount = parseFloat(
        (balance.availableAmount + payout.amount).toFixed(2),
      );
      balance.totalPaidOut = parseFloat(
        (balance.totalPaidOut - payout.amount).toFixed(2),
      );
      await manager.save(SellerBalance, balance);
    }
    await createNotificationService({
      userId: payout.seller_id,
      type: NotificationType.PAYOUT_FAILED,
      title:"PAYOUT FAILED",
      message: `Your payout of Rs. ${payout.amount} has failed. Reason: ${notes}`,
    })

    return { payout: mapPayout(payout) };
  });
};


export const getPayoutsService = async (query: {
  sellerId?: string;
  status?: string;
  page?: number;
  pageSize?: number;
}) => {
  const { sellerId, status, page = 1, pageSize = 20 } = query;
  const skip = (page - 1) * pageSize;

  const where: any = {};
  if (sellerId) where.seller_id = sellerId;
  if (status) where.status = status;

  const [payouts, total] = await payoutRepository.findAndCount({
    where,
    relations: ["seller"],
    order: { createdAt: "DESC" },
    skip,
    take: pageSize,
  });

  return { payouts: payouts.map(mapPayout), total };
};


export const confirmOrderCommissionsService = async (
  orderId: string,
): Promise<{ confirmed: number }> => {
  const commissions = await AppDataSource.getRepository(Commission).find({
    where: { order_id: orderId, status: CommissionStatus.PENDING },
  });

  for (const c of commissions) {
    c.status = CommissionStatus.CONFIRMED;
  }
  

  await AppDataSource.getRepository(Commission).save(commissions);
  await createNotificationService({
    userId: commissions[0]?.seller_id ?? "",
    type: NotificationType.COMMISSION_CONFIRMED,
    title:"COMMISSION CONFIRMED",
    message: `Your commission for order ${orderId.slice(0, 8)} has been confirmed by admin. Amount: Rs. ${commissions.reduce((sum, c) => sum + c.commissionAmount, 0)}.`,
  })
  return { confirmed: commissions.length };
};

export const verifySellerPaymentInfoService = async (sellerId: string) => {
  const repo = AppDataSource.getRepository(SellerPaymentInfo);
  const info = await repo.findOne({ where: { seller_id: sellerId } });
  if (!info) throw new NotFoundError("Seller has no payment info");
  if (!info.khaltiId) throw new BadRequestError("Seller has no Khalti ID set");
  
  info.isVerified = true;
  const saved = await repo.save(info);
  await createNotificationService({
    userId: sellerId,
    type: NotificationType.PAYMENT_INFO_VERIFIED,
    title:"PAYMENT INFO VERIFIED",
    message: `Your payment info has been verified by admin. You can now receive payouts through your preferred method.`,
  })
  return { paymentInfo: saved };
};

export const getSellerPaymentInfoService = async (sellerId: string) => {
  const info = await sellerPaymentInfoRepository.findOne({
    where: { seller_id: sellerId },
    relations: ["seller"],
  });
  if (!info) throw new NotFoundError("Seller has no payment info");
  return { paymentInfo: info };
};


export const getSellerBalancesService = async (query: {
  sellerId?: string;
  page?: number;
  pageSize?: number;
}) => {
  const { sellerId, page = 1, pageSize = 20 } = query;
  const skip = (page - 1) * pageSize;

  const qb = sellerBalanceRepository
    .createQueryBuilder("balance")
    .leftJoinAndSelect("balance.seller", "seller")
    .orderBy("balance.availableAmount", "DESC")
    .skip(skip)
    .take(pageSize);

  if (sellerId) qb.where("balance.seller_id = :sellerId", { sellerId });

  const [balances, total] = await qb.getManyAndCount();

  return {
    balances: balances.map((b) => ({
      id: b.id,
      seller_id: b.seller_id,
      sellerName: b.seller?.name ?? null,
      pendingAmount: b.pendingAmount,
      availableAmount: b.availableAmount,
      totalPaidOut: b.totalPaidOut,
    })),
    total,
  };
};