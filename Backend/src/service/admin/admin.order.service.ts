import { AppDataSource } from "../../config/data-source.js";
import { Order } from "../../entity/Order.js";
import { Commission } from "../../entity/Commission.js";
import { NotFoundError } from "../../lib/erros.js";
import { mapOrder } from "../../lib/utlis.js";
import { CommissionStatus, OrderStatus } from "../../types/global.types.js";

const orderRepository = AppDataSource.getRepository(Order);
const commissionRepository = AppDataSource.getRepository(Commission);

export const adminGetOrdersService = async (query: {
  status?: OrderStatus;
  paymentStatus?: string;
  search?: string;
  page?: number;
  pageSize?: number;
}) => {
  const { status, paymentStatus, search, page = 1, pageSize = 20 } = query;
  const skip = (page - 1) * pageSize;

  const qb = orderRepository
    .createQueryBuilder("order")
    .leftJoinAndSelect("order.user", "user")
    .leftJoinAndSelect("order.items", "items")
    .orderBy("order.createdAt", "DESC")
    .skip(skip)
    .take(pageSize);

  if (status) qb.andWhere("order.status = :status", { status });
  if (paymentStatus) {
    qb.andWhere("order.payment_status = :paymentStatus", { paymentStatus });
  }
  if (search) {
    qb.andWhere(
      "(order.id::text ILIKE :search OR user.name ILIKE :search OR user.email ILIKE :search)",
      { search: `%${search}%` },
    );
  }

  const [orders, total] = await qb.getManyAndCount();
  return { orders: orders.map(mapOrder), total };
};

export const adminGetOrderByIdService = async (orderId: string) => {
  const order = await orderRepository.findOne({
    where: { id: orderId },
    relations: ["user", "items", "items.product", "items.delivery", "items.seller"],
  });
  if (!order) throw new NotFoundError("Order not found");

  const commissions = await commissionRepository.find({
    where: { order_id: orderId },
  });

  return { order: mapOrder(order), commissions };
};

export const adminGetCommissionsService = async (query: {
  status?: CommissionStatus;
  sellerId?: string;
  page?: number;
  pageSize?: number;
}) => {
  const { status, sellerId, page = 1, pageSize = 20 } = query;
  const skip = (page - 1) * pageSize;

  const qb = commissionRepository
    .createQueryBuilder("c")
    .leftJoinAndSelect("c.seller", "seller")
    .leftJoinAndSelect("c.order", "order")
    .leftJoinAndSelect("c.orderItem", "orderItem")
    .orderBy("c.createdAt", "DESC")
    .skip(skip)
    .take(pageSize);

  if (status) qb.andWhere("c.status = :status", { status });
  if (sellerId) qb.andWhere("c.seller_id = :sellerId", { sellerId });

  const [commissions, total] = await qb.getManyAndCount();
  return { commissions, total };
};