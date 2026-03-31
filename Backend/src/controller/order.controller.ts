import type { Context } from "koa";
import {
  createOrderValidation,
  orderItemParamValidation,
  orderParamValidation,
  updateDeliveryValidation,
  updateOrderItemStatusValidation,
} from "../validations/order.validation.js";
import {
  cancelOrderService,
  getMyOrdersService,
  getOrderByIdService,
  getSellerOrderItemsService,
  placeOrderService,
  updateDeliveryService,
  updateOrderAddressService,
  updateOrderItemStatusService,
} from "../service/order.service.js";
import { OrderItemStatus } from "../types/global.types.js";
import { createAddressValidation } from "../validations/address.validation.js";
import { ICreateAddress } from "../types/address.schema.js";

export const placeOrder = async (ctx: Context) => {
  const userId = ctx.state.user.id;
  const data = await createOrderValidation.validate(ctx.request.body, {
    stripUnknown: true,
  });
  const result = await placeOrderService(userId, data as any);
  ctx.status = 201;
  ctx.body = {
    success: true,
    message: "Order placed successfully",
    order: result.order,
  };
};

export const getMyOrders = async (ctx: Context) => {
  const userId = ctx.state.user.id;
  const { status, page, pageSize } = ctx.request.query as {
    status?: string;
    page?: string;
    pageSize?: string;
  };

  const result = await getMyOrdersService(userId, {
    status,
    page: page ? parseInt(page) : 1,
    pageSize: pageSize ? parseInt(pageSize) : 10,
  });
  ctx.status = 200;
  ctx.body = {
    success: true,
    orders: result.orders,
    total: result.total,
  };
};

export const getOrderById = async (ctx: Context) => {
  const { id } = await orderParamValidation.validate(ctx.params);
  const userId = ctx.state.user.id;
  const result = await getOrderByIdService(id, userId);
  ctx.status = 200;
  ctx.body = {
    success: true,
    order: result.order,
  };
};

export const cancelOrder = async (ctx: Context) => {
  const { id } = await orderParamValidation.validate(ctx.params);
  const userId = ctx.state.user.id;
  await cancelOrderService(id, userId);
  ctx.status = 200;
  ctx.body = {
    success: true,
    message: "Order cancelled successfully",
  };
};

export const getSellerOrders = async (ctx: Context) => {
  const sellerId = ctx.state.user.id;
  const result = await getSellerOrderItemsService(sellerId);
  ctx.status = 200;
  ctx.body = {
    success: true,
    items: result.items,
    total: result.total,
  };
};

export const updateOrderItemStatus = async (ctx: Context) => {
  const { itemId } = await orderItemParamValidation.validate(ctx.params);
  const sellerId = ctx.state.user.id;
  const { status } = await updateOrderItemStatusValidation.validate(
    ctx.request.body,
  );
  const result = await updateOrderItemStatusService(
    itemId,
    sellerId,
    status as OrderItemStatus,
  );
  ctx.status = 200;
  ctx.body = {
    success: true,
    item: result.item,
  };
};

export const updateDelivery = async (ctx: Context) => {
  const { itemId } = await orderItemParamValidation.validate(ctx.params);
  const sellerId = ctx.state.user.id;
  const data = await updateDeliveryValidation.validate(ctx.request.body, {
    stripUnknown: true,
  });
  const result = await updateDeliveryService(itemId, sellerId, data);
  ctx.status = 200;
  ctx.body = {
    success: true,
    message: "Delivery updated successfully",
    delivery: result.delivery,
  };
};

export const updateOrderAddress = async (ctx: Context) => {
  const { id } = await orderParamValidation.validate(ctx.params);
  const userId = ctx.state.user.id;

  const data = await createAddressValidation.validate(
    ctx.request.body,
    { stripUnknown: true },
  ) as ICreateAddress;

  const result = await updateOrderAddressService(id, userId, data);

  ctx.status = 200;
  ctx.body = {
    success: true,
    message: "Shipping address updated successfully",
    order: result.order,
  };
};

