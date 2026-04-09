
import type { Context } from "koa";

import { approveSchema, completeSchema, rejectSchema } from "../../validations/admin.validation.js";
import { approveRefundService, completeRefundService, getAllRefundsService, rejectRefundService } from "../../service/refund.service.js";

export const approveRefund = async (ctx: Context) => {
  const { id } = ctx.params;
  const adminId = ctx.state.admin.id;
  const { adminNotes } = await approveSchema.validate(ctx.request.body);
  const result = await approveRefundService(id, adminId, adminNotes);
  ctx.status = 200;
  ctx.body = { success: true, refund: result.refund };
};

export const completeRefund = async (ctx: Context) => {
  const { id } = ctx.params;
  const { refundReference } = await completeSchema.validate(ctx.request.body);
  const result = await completeRefundService(id, refundReference);
  ctx.status = 200;
  ctx.body = { success: true, refund: result.refund };
};

export const rejectRefund = async (ctx: Context) => {
  const { id } = ctx.params;
  const adminId = ctx.state.admin.id;
  const { adminNotes } = await rejectSchema.validate(ctx.request.body);
  const result = await rejectRefundService(id, adminId, adminNotes);
  ctx.status = 200;
  ctx.body = { success: true, refund: result.refund };
};

export const getAllRefunds = async (ctx: Context) => {
  const { status, page, pageSize } = ctx.request.query as any;
  const result = await getAllRefundsService({
    status,
    page: page ? parseInt(page) : 1,
    pageSize: pageSize ? parseInt(pageSize) : 20,
  });
  ctx.status = 200;
  ctx.body = { success: true, refunds: result.refunds, total: result.total };
};