import * as yup from "yup";

export const addToCartValidation = yup.object({
  productId: yup.string().uuid("Invalid product id").required(),
  quantity: yup
    .number()
    .integer()
    .min(1, "Quantity must be at least 1")
    .required(),
});

export const updateCartItemValidation = yup.object({
  quantity: yup
    .number()
    .integer()
    .min(1, "Quantity must be at least 1")
    .required(),
});

export const cartItemParamValidation = yup.object({
  id: yup.string().uuid("Invalid cart item id").required(),
});