import type { Context } from "koa";
import { verifyToken } from "../lib/jwt.js";
import { AuthenticationError, ForbiddenError } from "../lib/erros.js";
import { AppDataSource } from "../config/data-source.js";
import { User } from "../entity/User.js";
import { userStatus } from "../types/global.types.js";

export const authMiddleware = async (
  ctx: Context,
  next: () => Promise<void>,
) => {
  const authHeader = ctx.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new AuthenticationError("You are not authenticated.");
  }

  const token = authHeader.split(" ")[1];
  if (!token) throw new AuthenticationError("Invalid Authorization Error.");

  const payload = verifyToken(token);

  if (!payload) {
    throw new AuthenticationError("Invalid or expired token.");
  }
  const userRepo = AppDataSource.getRepository(User);
  const user = await userRepo.findOne({
    where: { id: payload.id },
    select: ["id", "email", "role", "status"],
  });

  if (!user) throw new AuthenticationError("User not found");

  if (user.status === userStatus.SUSPENDED) {
    throw new ForbiddenError("Your account has been suspended");
  }

  if (user.status === userStatus.DELETED) {
    throw new ForbiddenError("Your account has been deleted");
  }

  ctx.state.user = payload;

  await next();
};
