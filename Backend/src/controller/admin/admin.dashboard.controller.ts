import type { Context } from "koa";
import { adminDashboardService } from "../../service/admin/admin.dashboard.service.js";

export const getDashboard = async (ctx: Context) => {
  const result = await adminDashboardService();
  ctx.status = 200;
  ctx.body = { success: true, stats: result };
};