import type { Context } from "koa";
import {
  adminGetProductsService,
  adminDeleteProductService,
} from "../../service/admin/admin.product.service.js";
import { adminGetProductsSchema } from "../../validations/admin.validation.js";

export const getProducts = async (ctx: Context) => {
  const { search, category, sellerId, page, pageSize } =
    await adminGetProductsSchema.validate(ctx.request.query, {
      abortEarly: false,
    });
  const result = await adminGetProductsService({
    search,
    category,
    sellerId,
    page: page ? parseInt(page) : 1,
    pageSize: pageSize ? parseInt(pageSize) : 20,
  });
  ctx.status = 200;
  ctx.body = { success: true, products: result.products, total: result.total };
};

export const deleteProduct = async (ctx: Context) => {
  await adminDeleteProductService(ctx.params.id);
  ctx.status = 200;
  ctx.body = { success: true, message: "Product deleted" };
};
