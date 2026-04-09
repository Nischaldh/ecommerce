import type { Context } from "koa";
import {
  requestRefundService,
  getMyRefundsService,
} from "../service/refund.service.js";
import { requestRefundValidation } from "../validations/refund.validation.js";


export const requestRefund = async (ctx: Context) => {
  const userId = ctx.state.user.id;
  const { orderId, reason } = await requestRefundValidation.validate(
    ctx.request.body,
  );
  const result = await requestRefundService(userId, orderId, reason);
  ctx.status = 201;
  ctx.body = { success: true, refund: result.refund };
};

export const getMyRefunds = async (ctx: Context) => {
  const userId = ctx.state.user.id;
  const result = await getMyRefundsService(userId);
  ctx.status = 200;
  ctx.body = { success: true, refunds: result.refunds };
};