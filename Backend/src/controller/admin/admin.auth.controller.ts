import type { Context } from "koa";
import {
  createAdminSchema,
  loginSchema,
} from "../../validations/admin.validation.js";
import {
  createAdminService,
  deactivateAdminService,
  getMeAdminService,
  loginAdminService,
} from "../../service/admin/admin.auth.service.js";

export const createAdmin = async (ctx: Context) => {
  const data = await createAdminSchema.validate(ctx.request.body, {
    stripUnknown: true,
  });
  const result = await createAdminService(data);
  ctx.status = 201;
  ctx.body = { success: true, admin: result };
};

export const loginAdmin = async (ctx: Context) => {
  const { email, password } = await loginSchema.validate(ctx.request.body);
  const result = await loginAdminService(email, password);
  ctx.status = 200;
  ctx.body = {
    success: true,
    token: result.token,
    admin: result.admin,
  };
};

export const getMe = async (ctx: Context) => {
  const result = await getMeAdminService(ctx.state.admin.id);
  ctx.status = 200;
  ctx.body = { success: true, admin: result };
};

export const deactivateAdmin = async (ctx: Context) => {
  await deactivateAdminService(ctx.params.id, ctx.state.admin.id);
  ctx.status = 200;
  ctx.body = { success: true, message: "Admin deactivated" };
};
