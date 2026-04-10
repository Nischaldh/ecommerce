import type { Context, Next } from "koa";
import { verifyAdminToken } from "../lib/adminAuth.js";
import { AppDataSource } from "../config/data-source.js";
import { Admin } from "../entity/Admin.js";
import { ForbiddenError, AuthenticationError } from "../lib/erros.js";
import { AdminRole } from "../types/global.types.js";

const adminRepo = AppDataSource.getRepository(Admin);

export const adminAuthMiddleware = async (ctx: Context, next: Next) => {
  const authHeader = ctx.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    throw new AuthenticationError("No token provided");
  }

  const token = authHeader.split(" ")[1];

  let payload;
  try {
    payload = verifyAdminToken(token);
  } catch {
    throw new AuthenticationError("Invalid or expired admin token");
  }


  const admin = await adminRepo.findOne({
    where: { id: payload.id, isActive: true },
  });

  if (!admin) {
    throw new AuthenticationError("Admin account not found or deactivated");
  }

  ctx.state.admin = admin;
  await next();
};


export const superAdminOnly = async (ctx: Context, next: Next) => {
  if (ctx.state.admin?.role !== AdminRole.SUPER_ADMIN) {
    throw new ForbiddenError("Super admin access required");
  }
  await next();
};