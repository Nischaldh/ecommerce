import type { Context } from "koa";
import { getNotificationsService, markAllReadService, markOneReadService } from "../service/notification.service.js";


export const getNotifications = async (ctx: Context) => {
  const userId = ctx.state.user.id;
  const result = await getNotificationsService(userId);
  ctx.status = 200;
  ctx.body = {
    success: true,
    notifications: result.notifications,
    unreadCount: result.unreadCount,
  };
};

export const markAllRead = async (ctx: Context) => {
  const userId = ctx.state.user.id;
  await markAllReadService(userId);
  ctx.status = 200;
  ctx.body = { success: true };
};

export const markOneRead = async (ctx: Context) => {
  const { id } = ctx.params;
  const userId = ctx.state.user.id;
  await markOneReadService(id, userId);
  ctx.status = 200;
  ctx.body = { success: true };
};