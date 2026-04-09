import type { Context } from "koa";
import {
  initiatePaymentValidation,
  upsertPaymentInfoSchema,
  verifyKhaltiValidation,
} from "../validations/payment.validation.js";
import {
  getPaymentInfoService,
    getSellerBalanceService,
  getSellerCommissionsService,
  getSellerDashboardService,
  initiatePaymentService,
  upsertPaymentInfoService,
  verifyKhaltiService,
} from "../service/payment.service.js";
import { PaymentMethod } from "../types/global.types.js";
import env from "../lib/env.js";

export const initiatePayment = async (ctx: Context) => {
  const userId = ctx.state.user.id;
  const { orderId, method } = await initiatePaymentValidation.validate(
    ctx.request.body,
  );

  const result = await initiatePaymentService(
    userId,
    orderId,
    method as PaymentMethod,
  );
  ctx.status = 200;
  ctx.body = {
    success: true,
    transaction: result.transaction,
    paymentUrl: result.paymentUrl ?? null,
  };
};

export const verifyKhalti = async (ctx: Context) => {
  const { pidx } = await verifyKhaltiValidation.validate(ctx.request.query);

  const result = await verifyKhaltiService(pidx);

  ctx.redirect(
    result.success
      ? `${env.FRONTEND_URL}/orders/${result.orderId}?payment=success`
      : `${env.FRONTEND_URL}/checkout?payment=failed`,
  );
};

export const getMyBalance = async (ctx: Context) => {
    const sellerId = ctx.state.user.id;
  const balance = await getSellerBalanceService(sellerId);
  ctx.status = 200;
  ctx.body = { success: true, balance };

};

export const getMyPaymentInfo = async (ctx: Context) => {
  const sellerId = ctx.state.user.id;
  const result = await getPaymentInfoService(sellerId);
  ctx.status = 200;
  ctx.body = { success: true, paymentInfo: result.paymentInfo };
};

export const upsertMyPaymentInfo = async (ctx: Context) => {
  const sellerId = ctx.state.user.id;
  const data = await upsertPaymentInfoSchema.validate(ctx.request.body, {
    stripUnknown: true,
  });
  const result = await upsertPaymentInfoService(sellerId, data as any);
  ctx.status = 200;
  ctx.body = { success: true, paymentInfo: result.paymentInfo };
};

export const getSellerDashboard = async (ctx: Context) => {
  const sellerId = ctx.state.user.id;
  const result = await getSellerDashboardService(sellerId);
  ctx.status = 200;
  ctx.body = { success: true, stats: result };
};

export const getSellerCommissions = async (ctx: Context) => {
  const sellerId = ctx.state.user.id;
  const { search, page, pageSize } = ctx.request.query as any;
  const result = await getSellerCommissionsService(sellerId, {
    search,
    page: page ? parseInt(page) : 1,
    pageSize: pageSize ? parseInt(pageSize) : 10,
  });
  ctx.status = 200;
  ctx.body = {
    success: true,
    commissions: result.commissions,
    total: result.total,
  };
};
