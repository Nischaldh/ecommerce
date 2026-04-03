import { AppDataSource } from "../config/data-source.js";
import { Order } from "../entity/Order.js";
import { Cart } from "../entity/Cart.js";
import { CartItem } from "../entity/CartItem.js";
import { Product } from "../entity/Product.js";
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
} from "../lib/erros.js";
import {
  ICreateOrder,
  IDeliveryResponse,
  IOrderItemResponse,
  IOrderResponse,
  IUpdateDelivery,
} from "../types/order.schema.js";
import {
  allowedTransitions,
  mapDelivery,
  mapOrder,
  mapOrderItem,
} from "../lib/utlis.js";
import { OrderItem } from "../entity/OrderItems.js";
import {
  OrderItemStatus,
  OrderStatus,
  PaymentStatus,
} from "../types/global.types.js";
import { Delivery } from "../entity/Delivery.js";
import { ICreateAddress } from "../types/address.schema.js";

const orderRepository = AppDataSource.getRepository(Order);
const orderItemRepository = AppDataSource.getRepository(OrderItem);
const cartRepository = AppDataSource.getRepository(Cart);
const deliveryRepository = AppDataSource.getRepository(Delivery);

export const placeOrderService = async (
  userId: string,
  data: ICreateOrder,
): Promise<{ order: IOrderResponse; success: boolean }> => {
  const cart = await cartRepository.findOne({
    where: { user_id: userId },
    relations: ["items", "items.product"],
  });

  if (!cart || cart.items.length === 0) {
    throw new BadRequestError("Your cart is empty");
  }

  const itemsToOrder = data.cartItemIds?.length
    ? cart.items.filter((i) => data.cartItemIds!.includes(i.id))
    : cart.items;

  if (itemsToOrder.length === 0) {
    throw new BadRequestError("No valid cart items found");
  }

  for (const cartItem of itemsToOrder) {
    const product = cartItem.product;

    if (!product || product.deleted) {
      throw new BadRequestError(`Product is no longer available`);
    }
    if (product.stock < cartItem.quantity) {
      throw new BadRequestError(`Insufficient stock for "${product.name}"`);
    }
  }

  return await AppDataSource.transaction(async (manager) => {
    let totalAmount = 0;
    const orderItemEntities: OrderItem[] = [];

    for (const cartItem of itemsToOrder) {
      const product = cartItem.product;
      const subtotal = product.price * cartItem.quantity;
      totalAmount += subtotal;

      const orderItem = manager.create(OrderItem, {
        product_id: product.id,
        seller_id: product.seller_id,
        productName: product.name,
        priceAtPurchase: product.price,
        quantity: cartItem.quantity,
        subtotal,
        status: OrderItemStatus.PENDING,
      });

      orderItemEntities.push(orderItem);

      await manager.decrement(
        Product,
        { id: product.id },
        "stock",
        cartItem.quantity,
      );
    }

    const order = manager.create(Order, {
      user_id: userId,
      totalAmount,
      shippingAddress: data.shippingAddress,
      status: OrderStatus.PENDING,
      paymentStatus: PaymentStatus.UNPAID,
      items: orderItemEntities,
    });

    const savedOrder = await manager.save(Order, order);
    for (const item of savedOrder.items) {
      const delivery = manager.create(Delivery, {
        order_item_id: item.id,
      });
      await manager.save(Delivery, delivery);
    }

    await manager.delete(
      CartItem,
      itemsToOrder.map((i) => i.id),
    );
    const fullOrder = await manager.findOneOrFail(Order, {
      where: { id: savedOrder.id },
      relations: ["items", "items.product"],
    });

    return { order: mapOrder(fullOrder), success: true };
  });
};

export const getMyOrdersService = async (
  userId: string,
  query: { status?: string; page?: number; pageSize?: number },
): Promise<{ orders: IOrderResponse[]; total: number }> => {
  const { status, page = 1, pageSize = 10 } = query;
  const skip = (page - 1) * pageSize;
  const where: any = { user_id: userId };
  if (status) where.status = status;

  const [orders, total] = await orderRepository.findAndCount({
    where,
    relations: ["items", "items.delivery", "items.product"],
    order: { createdAt: "DESC" },
    skip,
    take: pageSize,
  });

  return { orders: orders.map(mapOrder), total };
};

export const getOrderByIdService = async (
  orderId: string,
  userId: string,
): Promise<{ order: IOrderResponse }> => {
  const order = await orderRepository.findOne({
    where: { id: orderId },
    relations: ["items", "items.product", "items.delivery", "items.seller"],
  });

  if (!order) throw new NotFoundError("Order not found");

  // buyer can only see their own orders
  if (order.user_id !== userId) {
    throw new ForbiddenError("Access denied");
  }

  return { order: mapOrder(order) };
};

export const cancelOrderService = async (
  orderId: string,
  userId: string,
): Promise<{ success: boolean }> => {
  return await AppDataSource.transaction(async (manager) => {
    const order = await manager.findOne(Order, {
      where: { id: orderId, user_id: userId },
      relations: ["items"],
    });

    if (!order) throw new NotFoundError("Order not found");

    if (order.status !== OrderStatus.PENDING) {
      throw new BadRequestError("Only pending orders can be cancelled");
    }

    const hasShipped = order.items.some(
      (i) =>
        i.status === OrderItemStatus.SHIPPED ||
        i.status === OrderItemStatus.DELIVERED,
    );
    if (hasShipped) {
      throw new BadRequestError(
        "Cannot cancel — one or more items have already shipped",
      );
    }

    order.status = OrderStatus.CANCELLED;
    await manager.save(Order, order);

    for (const item of order.items) {
      item.status = OrderItemStatus.CANCELLED;
      await manager.save(OrderItem, item);
      await manager.increment(
        Product,
        { id: item.product_id },
        "stock",
        item.quantity,
      );
    }

    return { success: true };
  });
};

export const getSellerOrderItemsService = async (
  sellerId: string,
): Promise<{ items: IOrderItemResponse[]; total: number }> => {
  const [items, total] = await orderItemRepository.findAndCount({
    where: { seller_id: sellerId },
    relations: ["order", "product", "delivery"],
    order: { createdAt: "DESC" },
  });

  return { items: items.map(mapOrderItem), total };
};

export const updateOrderItemStatusService = async (
  itemId: string,
  sellerId: string,
  newStatus: OrderItemStatus,
): Promise<{ item: IOrderItemResponse }> => {
  const item = await orderItemRepository.findOne({
    where: { id: itemId, seller_id: sellerId },
    relations: ["order"],
  });

  if (!item) throw new NotFoundError("Order item not found");

  if (!allowedTransitions[item.status].includes(newStatus)) {
    throw new BadRequestError(
      `Cannot transition from ${item.status} to ${newStatus}`,
    );
  }

  item.status = newStatus;
  if (newStatus === OrderItemStatus.DELIVERED) {
    const allItems = await orderItemRepository.find({
      where: { order_id: item.order_id },
    });
    const allDelivered = allItems.every(
      (i) => i.id === item.id || i.status === OrderItemStatus.DELIVERED,
    );
    if (allDelivered) {
      await orderRepository.update(item.order_id, {
        status: OrderStatus.COMPLETED,
      });
    }
  }

  const saved = await orderItemRepository.save(item);
  return { item: mapOrderItem(saved) };
};

export const updateDeliveryService = async (
  orderItemId: string,
  sellerId: string,
  data: IUpdateDelivery,
): Promise<{ delivery: IDeliveryResponse }> => {
  const orderItem = await orderItemRepository.findOne({
    where: { id: orderItemId, seller_id: sellerId },
    relations: ["delivery"],
  });

  if (!orderItem) throw new NotFoundError("Order item not found");

  if (orderItem.status === OrderItemStatus.PENDING) {
    throw new BadRequestError(
      "Cannot update delivery info before processing the order item",
    );
  }

  if (orderItem.status === OrderItemStatus.CANCELLED) {
    throw new BadRequestError(
      "Cannot update delivery info for a cancelled item",
    );
  }

  const delivery = orderItem.delivery;

  if (!delivery) throw new NotFoundError("Delivery record not found");

  Object.assign(delivery, data);

  if (orderItem.status === OrderItemStatus.DELIVERED && !delivery.deliveredAt) {
    delivery.deliveredAt = new Date();
  }

  const saved = await deliveryRepository.save(delivery);
  return { delivery: mapDelivery(saved) };
};

// service/order.service.ts — add to existing file
export const updateOrderAddressService = async (
  orderId: string,
  userId: string,
  shippingAddress: ICreateAddress,
): Promise<{ success: boolean; order: IOrderResponse }> => {
  const order = await orderRepository.findOne({
    where: { id: orderId, user_id: userId },
    relations: ["items", "items.delivery", "items.product", "items.seller"],
  });

  if (!order) throw new NotFoundError("Order not found");

  if (order.status !== OrderStatus.PENDING) {
    throw new BadRequestError(
      "Shipping address can only be updated on pending orders",
    );
  }

  order.shippingAddress = {
    ...order.shippingAddress,
    ...shippingAddress,
  };

  const saved = await orderRepository.save(order);

  const fullOrder = await orderRepository.findOneOrFail({
    where: { id: saved.id },
    relations: ["items", "items.delivery", "items.product", "items.seller"],
  });

  return { success: true, order: mapOrder(fullOrder) };
};
