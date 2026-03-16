import type { Context } from "koa";
import {
  addToCartService,
  getCartService,
  removeCartItemService,
  updateCartItemService,
} from "../service/cart.service.js";

import {
  addToCartValidation,
  cartItemParamValidation,
  updateCartItemValidation,
} from "../validations/cart.validation.js";

export const addToCart = async (ctx: Context) => {

  const userId = ctx.state.user.id;

  const { productId, quantity } = await addToCartValidation.validate(
    ctx.request.body
  );

  const item = await addToCartService(userId, productId, quantity);

  ctx.status = 201;
  ctx.body = {
    success: true,
    message: "Item added to cart",
    item:item.cartItem,
  };
};

export const getCart = async (ctx: Context) => {

  const userId = ctx.state.user.id;

  const cart = await getCartService(userId);

  ctx.body = {
    success: true,
    cart,
  };
};

export const updateCartItem = async (ctx: Context) => {

  const userId = ctx.state.user.id;

  const { id } = await cartItemParamValidation.validate(ctx.params);

  const { quantity } = await updateCartItemValidation.validate(
    ctx.request.body
  );

  const item = await updateCartItemService(id, userId, quantity);

  ctx.body = {
    success: true,
    message: "Cart item updated",
    item,
  };
};

export const removeCartItem = async (ctx: Context) => {

  const userId = ctx.state.user.id;

  const { id } = await cartItemParamValidation.validate(ctx.params);

  await removeCartItemService(id, userId);

  ctx.body = {
    success: true,
    message: "Item removed from cart",
  };
};