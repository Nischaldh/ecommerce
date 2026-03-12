import type { Context } from "koa";
import { verifyToken } from "../lib/jwt.js";
import { AuthenticationError } from "../lib/erros.js";

export const authMiddleware = async (ctx: Context, next: () => Promise<void>) => {
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

  ctx.state.user = payload;


  await next();
};