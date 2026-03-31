import type { Context } from "koa";
import { getSellerProductsValidation, getSellersValidation, sellerParamValidation } from "../validations/user.validation.js";
import { getSellerByIdService, getSellerProductsService, getSellersService } from "../service/seller.service.js";


export const getSellers = async (ctx: Context) => {
  const validatedQuery = await getSellersValidation.validate(
    ctx.request.query,
  );
  const result = await getSellersService(validatedQuery);
  ctx.status = 200;
  ctx.body = {
    success: true,
    sellers: result.sellers,
    total: result.total,
  };
};

export const getSellerById = async (ctx: Context) => {
  const { id } = await sellerParamValidation.validate(ctx.params) as { id: string };
  const result = await getSellerByIdService(id);
  ctx.status = 200;
  ctx.body = {
    success: true,
    seller: result.seller,
  };
};

export const getSellerProducts = async (ctx: Context) => {
  const { id } = await sellerParamValidation.validate(ctx.params) as { id: string };
  const validatedQuery = await getSellerProductsValidation.validate(
    ctx.request.query,
  );
  const result = await getSellerProductsService(id, validatedQuery);
  ctx.status = 200;
  ctx.body = {
    success: true,
    products: result.products,
    total: result.total,
  };
};