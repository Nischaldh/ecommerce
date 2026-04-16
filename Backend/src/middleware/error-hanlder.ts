import type { Context } from "koa";
import { EntityNotFoundError } from "typeorm";
import { ValidationError } from "yup";
import {
  AuthenticationError,
  BadRequestError,
  ForbiddenError,
  NotFoundError,
} from "../lib/erros.js"

export const errorHandlerMiddleware = async (
  ctx: Context,
  next: () => Promise<void>,
) => {
  try {
    await next();
  } catch (error: any) {
    if (
      error instanceof NotFoundError ||
      error instanceof EntityNotFoundError
    ) {
      ctx.status = 404;
      ctx.body = {
        message: error.message,
        ...(error instanceof NotFoundError ? error.data : {}),
      };

      return;
    } else if (error instanceof ValidationError) {
      ctx.status = 400;
      ctx.body = {
        message: error.message,
      };
      return;
    } else if (error instanceof AuthenticationError) {
      ctx.status = error.status ?? 401;
      ctx.body = {
        message: error.message || "Session Expired",
      };
      return;
    } else if (error instanceof ForbiddenError) {
      ctx.status = error.status ?? 403;
      ctx.body = {
        message: error.message || "You're not allowed",
      };
      return;
    }else if(error instanceof BadRequestError){
      ctx.status = error.status ?? 400;
      ctx.body = {
        message: error.message || "Bad Request",
      }
    } 
    else {
      console.error("Unexpected error:", error.message);
      ctx.status = 500;
      ctx.body = { error: "Something went wrong!" };

      return;
    }
  }
};
