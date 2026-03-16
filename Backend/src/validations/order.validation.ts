
import * as yup from "yup";

const shippingAddressSchema = yup.object({
  fullName: yup.string().trim().required("Full name is required"),
  phone: yup.string().trim().required("Phone is required"),
  addressLine1: yup.string().trim().required("Address is required"),
  addressLine2: yup.string().trim().nullable().optional(),
  city: yup.string().trim().required("City is required"),
  state: yup.string().trim().required("State is required"),
  postalCode: yup.string().trim().required("Postal code is required"),
  country: yup.string().trim().required("Country is required"),
});

export const createOrderValidation = yup.object({
  shippingAddress: shippingAddressSchema.required("Shipping address is required"),
  cartItemIds: yup
    .array()
    .of(yup.string().uuid("Invalid cart item id").required())
    .optional(),
});

export const orderParamValidation = yup.object({
  id: yup.string().uuid("Invalid order id").required(),
});

export const orderItemParamValidation = yup.object({
  itemId: yup.string().uuid("Invalid order item id").required(),
});

export const updateOrderItemStatusValidation = yup.object({
  status: yup
    .string()
    .oneOf(
      ["PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"],
      "Invalid status"
    )
    .required("Status is required"),
});

export const updateDeliveryValidation = yup.object({
  trackingNumber: yup.string().trim().optional(),
  carrier: yup.string().trim().optional(),
  estimatedDelivery: yup.date().optional(),
  notes: yup.string().trim().nullable().optional(),
});
