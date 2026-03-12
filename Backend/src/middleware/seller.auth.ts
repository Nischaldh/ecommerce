import type { Context } from "koa";
import { AuthenticationError, ForbiddenError } from "../lib/erros.js";
import { userRole } from "../types/global.types.js";

export const sellerAuth = async (
  ctx: Context,
  next: () => Promise<void>,
): Promise<void> => {

  const user = ctx.state.user;

  if (!user) {
   throw new AuthenticationError("No user");
  }

  if (user.role !== userRole.SELLER) {
    throw new ForbiddenError("Only seller can access this route.")
  }

  await next();
};