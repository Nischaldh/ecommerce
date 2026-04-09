import type { Context } from "koa";
import {
  completePayoutService,
  confirmOrderCommissionsService,
  createPayoutService,
  failPayoutService,
  getPayoutsService,
  getSellerBalancesService,
  getSellerPaymentInfoService,
  verifySellerPaymentInfoService,
} from "../../service/admin/admin.payment.service.js";
import { PayoutMethod } from "../../types/global.types.js";
import { releaseCommissionService } from "../../service/payment.service.js";
import {
  completePayoutSchema,
  createPayoutSchema,
  failPayoutSchema,
} from "../../validations/admin.validation.js";

export const createPayout = async (ctx: Context) => {
  const adminId = ctx.state.admin.id;
  const { sellerId, amount, method, notes } = await createPayoutSchema.validate(
    ctx.request.body,
    { stripUnknown: true },
  );

  const result = await createPayoutService(
    adminId,
    sellerId,
    amount,
    method as PayoutMethod,
    notes,
  );
  ctx.status = 201;
  ctx.body = { success: true, payout: result.payout };
};

export const completePayout = async (ctx: Context) => {
  const { id } = ctx.params;
  const { payoutReference } = await completePayoutSchema.validate(
    ctx.request.body,
  );
  const result = await completePayoutService(id, payoutReference);
  ctx.status = 200;
  ctx.body = { success: true, payout: result.payout };
};

export const failPayout = async (ctx: Context) => {
  const { id } = ctx.params;
  const { notes } = await failPayoutSchema.validate(ctx.request.body);
  const result = await failPayoutService(id, notes);
  ctx.status = 200;
  ctx.body = { success: true, payout: result.payout };
};

export const getPayouts = async (ctx: Context) => {
  const { sellerId, status, page, pageSize } = ctx.request.query as any;
  const result = await getPayoutsService({
    sellerId,
    status,
    page: page ? parseInt(page) : 1,
    pageSize: pageSize ? parseInt(pageSize) : 20,
  });
  ctx.status = 200;
  ctx.body = { success: true, payouts: result.payouts, total: result.total };
};

export const confirmCommissions = async (ctx: Context) => {
  const { orderId } = ctx.params;
  const result = await confirmOrderCommissionsService(orderId);
  ctx.status = 200;
  ctx.body = { success: true, confirmed: result.confirmed };
};

export const releaseCommissions = async (ctx: Context) => {
  const { orderId } = ctx.params;
  const result = await releaseCommissionService(orderId);
  ctx.status = 200;
  ctx.body = { success: true, released: result.released };
};


export const verifySellerPaymentInfo = async (ctx: Context) => {
  const { sellerId } = ctx.params;
  const result = await verifySellerPaymentInfoService(sellerId);
  ctx.status = 200;
  ctx.body = { success: true, paymentInfo: result.paymentInfo };
};

export const getSellerBalances = async (ctx: Context) => {
  const { sellerId, page, pageSize } = ctx.request.query as any;
  const result = await getSellerBalancesService({
    sellerId,
    page: page ? parseInt(page) : 1,
    pageSize: pageSize ? parseInt(pageSize) : 20,
  });
  ctx.status = 200;
  ctx.body = { success: true, balances: result.balances, total: result.total };
};

export const getSellerPaymentInfo = async (ctx: Context) => {
  const { sellerId } = ctx.params;
  const result = await getSellerPaymentInfoService(sellerId);
  ctx.status = 200;
  ctx.body = { success: true, paymentInfo: result.paymentInfo };
};
