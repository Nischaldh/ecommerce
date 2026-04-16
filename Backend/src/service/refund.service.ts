import { AppDataSource } from "../config/data-source.js";
import { Refund } from "../entity/Refund.js";
import { Order } from "../entity/Order.js";
import { Commission } from "../entity/Commission.js";
import { SellerBalance } from "../entity/SellerBalance.js";
import { PaymentTransaction } from "../entity/PaymentTransaction.js";
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
} from "../lib/erros.js";
import {
  CommissionStatus,
  OrderStatus,
  PaymentMethod,
  PaymentStatus,
  RefundStatus,
  TransactionStatus,
} from "../types/global.types.js";
import { verifyKhaltiPayment } from "../lib/khalti.js";

const refundRepository = AppDataSource.getRepository(Refund);
const orderRepository = AppDataSource.getRepository(Order);
const txRepository = AppDataSource.getRepository(PaymentTransaction);
const commissionRepository = AppDataSource.getRepository(Commission);
const balanceRepository = AppDataSource.getRepository(SellerBalance);

export const requestRefundService = async (
  userId: string,
  orderId: string,
  reason: string,
): Promise<{ refund: Refund }> => {
  const order = await orderRepository.findOne({
    where: { id: orderId, user_id: userId },
  });

  if (!order) throw new NotFoundError("Order not found");

  if (order.paymentStatus !== PaymentStatus.PAID) {
    throw new BadRequestError("Order has not been paid — nothing to refund");
  }

  if (order.status === OrderStatus.CANCELLED) {
    throw new BadRequestError("Order is already cancelled");
  }

 
  const tx = await txRepository.findOne({
    where: { order_id: orderId, status: TransactionStatus.COMPLETED },
    order: { createdAt: "DESC" },
  });

  if (!tx) throw new NotFoundError("Payment record not found");

  if (tx.refundEligibleUntil && new Date() > tx.refundEligibleUntil) {
    throw new BadRequestError(
      "Refund window has expired. Refunds are only allowed within 14 days of payment.",
    );
  }

 
  const existing = await refundRepository.findOne({
    where: { order_id: orderId, user_id: userId }, 
  });
  if (existing) {
    throw new BadRequestError(
      existing.status === RefundStatus.REJECTED
        ? "Your refund request was rejected. Contact support for assistance."
        : `A refund request already exists for this order (${existing.status.toLowerCase()}).`,
    );
  }

  const refund = refundRepository.create({
    order_id: orderId,
    user_id: userId,
    amount: Number(order.totalAmount),
    reason,
    status: RefundStatus.REQUESTED,
  });

  const saved = await refundRepository.save(refund);
  return { refund: saved };
};

// ── admin approves refund ──
export const approveRefundService = async (
  refundId: string,
  adminId: string,
  adminNotes?: string,
): Promise<{ refund: Refund }> => {
  const refund = await refundRepository.findOne({
    where: { id: refundId },
    relations: ["order"],
  });

  if (!refund) throw new NotFoundError("Refund not found");
  if (refund.status !== RefundStatus.REQUESTED) {
    throw new BadRequestError("Refund is not in requested state");
  }

  const tx = await txRepository.findOne({
    where: { order_id: refund.order_id, status: TransactionStatus.COMPLETED },
    order: { createdAt: "DESC" },
  });

  if (!tx) throw new NotFoundError("Payment transaction not found");

  return await AppDataSource.transaction(async (manager) => {
   
    const commissions = await manager.find(Commission, {
      where: { order_id: refund.order_id },
    });

    for (const commission of commissions) {
      if (commission.status === CommissionStatus.RELEASED) {
     
        const balance = await manager.findOne(SellerBalance, {
          where: { seller_id: commission.seller_id },
        });
        if (balance) {
          balance.availableAmount = Math.max(
            0,
            parseFloat(
              (balance.availableAmount - commission.sellerAmount).toFixed(2),
            ),
          );
          await manager.save(SellerBalance, balance);
        }
      } else if (
        commission.status === CommissionStatus.PENDING ||
        commission.status === CommissionStatus.CONFIRMED
      ) {
        // deduct from pending balance
        const balance = await manager.findOne(SellerBalance, {
          where: { seller_id: commission.seller_id },
        });
        if (balance) {
          balance.pendingAmount = Math.max(
            0,
            parseFloat(
              (balance.pendingAmount - commission.sellerAmount).toFixed(2),
            ),
          );
          await manager.save(SellerBalance, balance);
        }
      }

      commission.status = CommissionStatus.REFUNDED;
      await manager.save(Commission, commission);
    }

    // mark transaction refunded
    tx.status = TransactionStatus.REFUNDED;
    await manager.save(PaymentTransaction, tx);

    // mark order refunded
    await manager.update(Order, refund.order_id, {
      paymentStatus: PaymentStatus.REFUNDED,
      status: OrderStatus.CANCELLED,
    });

    // update refund record
    refund.status = RefundStatus.APPROVED;
    refund.admin_id = adminId;
    refund.adminNotes = adminNotes ?? null;
    const saved = await manager.save(Refund, refund);

    return { refund: saved };
  });
};

export const completeRefundService = async (
  refundId: string,
  refundReference?: string,
): Promise<{ refund: Refund }> => {
  const refund = await refundRepository.findOne({ where: { id: refundId } });
  if (!refund) throw new NotFoundError("Refund not found");
  if (refund.status !== RefundStatus.APPROVED) {
    throw new BadRequestError("Refund must be approved before completing");
  }

  refund.status = RefundStatus.COMPLETED;
  refund.refundReference = refundReference??null;
  const saved = await refundRepository.save(refund);
  return { refund: saved };
};

export const rejectRefundService = async (
  refundId: string,
  adminId: string,
  adminNotes: string,
): Promise<{ refund: Refund }> => {
  const refund = await refundRepository.findOne({ where: { id: refundId } });
  if (!refund) throw new NotFoundError("Refund not found");
  if (refund.status !== RefundStatus.REQUESTED) {
    throw new BadRequestError("Refund is not in requested state");
  }

  refund.status = RefundStatus.REJECTED;
  refund.admin_id = adminId;
  refund.adminNotes = adminNotes;
  const saved = await refundRepository.save(refund);
  return { refund: saved };
};

// ── get refunds (buyer) ──
export const getMyRefundsService = async (userId: string) => {
  const refunds = await refundRepository.find({
    where: { user_id: userId },
    order: { createdAt: "DESC" },
  });
  return { refunds };
};

export const getAllRefundsService = async (query: {
  status?: string;
  page?: number;
  pageSize?: number;
}) => {
  const { status, page = 1, pageSize = 20 } = query;
  const skip = (page - 1) * pageSize;
  const where: any = {};
  if (status) where.status = status;

  const [refunds, total] = await refundRepository.findAndCount({
    where,
    relations: ["order", "user"],
    order: { createdAt: "DESC" },
    skip,
    take: pageSize,
  });

  return { refunds, total };
};
