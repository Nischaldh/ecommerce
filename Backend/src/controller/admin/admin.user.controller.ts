import type { Context } from "koa";
import {
  adminGetUsersService,
  adminGetUserByIdService,
  adminSuspendUserService,
  adminUnsuspendUserService,
  adminDeleteUserService,
} from "../../service/admin/admin.user.service.js";
import { adminGetUsersSchema } from "../../validations/admin.validation.js";

export const getUsers = async (ctx: Context) => {
  const { role, search, status, page, pageSize } =
    await adminGetUsersSchema.validate(ctx.request.query, {
      abortEarly: false,
    });
  const result = await adminGetUsersService({
    role,
    search,
    status,
    page: page ? parseInt(page) : 1,
    pageSize: pageSize ? parseInt(pageSize) : 20,
  });
  ctx.status = 200;
  ctx.body = { success: true, users: result.users, total: result.total };
};

export const getUserById = async (ctx: Context) => {
  const result = await adminGetUserByIdService(ctx.params.id);
  ctx.status = 200;
  ctx.body = { success: true, ...result };
};

export const suspendUser = async (ctx: Context) => {
  await adminSuspendUserService(ctx.params.id);
  ctx.status = 200;
  ctx.body = { success: true, message: "User suspended" };
};

export const unsuspendUser = async (ctx: Context) => {
  await adminUnsuspendUserService(ctx.params.id);
  ctx.status = 200;
  ctx.body = { success: true, message: "User unsuspended" };
};

export const deleteUser = async (ctx: Context) => {
  await adminDeleteUserService(ctx.params.id);
  ctx.status = 200;
  ctx.body = { success: true, message: "User deleted" };
};
