import { AppDataSource } from "../../config/data-source.js";
import { User } from "../../entity/User.js";
import { Order } from "../../entity/Order.js";
import { Product } from "../../entity/Product.js";
import { Commission } from "../../entity/Commission.js";
import { Refund } from "../../entity/Refund.js";
import { Payout } from "../../entity/Payout.js";
import {
  CommissionStatus,
  OrderStatus,
  PaymentStatus,
  PayoutStatus,
  RefundStatus,
  userRole,
} from "../../types/global.types.js";

const userRepo = AppDataSource.getRepository(User);
const orderRepo = AppDataSource.getRepository(Order);
const productRepo = AppDataSource.getRepository(Product);
const commissionRepo = AppDataSource.getRepository(Commission);
const refundRepo = AppDataSource.getRepository(Refund);
const payoutRepo = AppDataSource.getRepository(Payout);

export const adminDashboardService = async () => {
  const [
    totalBuyers,
    totalSellers,
    totalOrders,
    completedOrders,
    totalProducts,
    pendingRefunds,
    pendingPayouts,
  ] = await Promise.all([
    userRepo.count({ where: { role: userRole.BUYER } }),
    userRepo.count({ where: { role: userRole.SELLER } }),
    orderRepo.count(),
    orderRepo.count({ where: { status: OrderStatus.COMPLETED } }),
    productRepo.count({ where: { deleted: false } }),
    refundRepo.count({ where: { status: RefundStatus.REQUESTED } }),
    payoutRepo.count({ where: { status: PayoutStatus.PROCESSING } }),
  ]);

  // revenue stats
  const revenueStats = await commissionRepo
    .createQueryBuilder("c")
    .select("SUM(c.commission_amount)", "totalRevenue")
    .addSelect("SUM(c.seller_amount)", "totalSellerPayouts")
    .where("c.status != :refunded", { refunded: CommissionStatus.REFUNDED })
    .getRawOne();

  // recent orders 
  const recentOrders = await orderRepo
    .createQueryBuilder("order")
    .select("DATE(order.created_at)", "date")
    .addSelect("COUNT(order.id)", "count")
    .addSelect("SUM(order.total_amount)", "revenue")
    .where("order.created_at >= NOW() - INTERVAL '7 days'")
    .groupBy("DATE(order.created_at)")
    .orderBy("date", "ASC")
    .getRawMany();

  return {
    totalBuyers,
    totalSellers,
    totalOrders,
    completedOrders,
    totalProducts,
    pendingRefunds,
    pendingPayouts,
    totalRevenue: parseFloat(revenueStats?.totalRevenue ?? "0"),
    totalSellerPayouts: parseFloat(revenueStats?.totalSellerPayouts ?? "0"),
    recentOrders,
  };
};