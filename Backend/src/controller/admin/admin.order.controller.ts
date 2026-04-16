import type { Context } from "koa";
import {
  adminGetOrdersService,
  adminGetOrderByIdService,
  adminGetCommissionsService,
} from "../../service/admin/admin.order.service.js";
import { adminGetCommissionsSchema, adminGetOrdersSchema } from "../../validations/admin.validation.js";

export const getOrders = async (ctx: Context) => {
  const { status, paymentStatus, search, page, pageSize } = await adminGetOrdersSchema.validate(ctx.request.query, {
    abortEarly: false,
  });
  const result = await adminGetOrdersService({
    status, paymentStatus, search,
    page: page ? parseInt(page) : 1,
    pageSize: pageSize ? parseInt(pageSize) : 20,
  });
  ctx.status = 200;
  ctx.body = { success: true, orders: result.orders, total: result.total };
};

export const getOrderById = async (ctx: Context) => {
  const result = await adminGetOrderByIdService(ctx.params.id);
  ctx.status = 200;
  ctx.body = { success: true, ...result };
};

export const getCommissions = async (ctx: Context) => {
  const { status, sellerId, page, pageSize } = await adminGetCommissionsSchema.validate(ctx.request.query, {
    abortEarly: false,
  });
  const result = await adminGetCommissionsService({
    status, sellerId,
    page: page ? parseInt(page) : 1,
    pageSize: pageSize ? parseInt(pageSize) : 20,
  });
  ctx.status = 200;
  ctx.body = { success: true, commissions: result.commissions, total: result.total };
};