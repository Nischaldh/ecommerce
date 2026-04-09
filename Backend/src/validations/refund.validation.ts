import * as yup from "yup";

export const requestRefundValidation = yup.object({
  orderId: yup.string().uuid().required(),
  reason: yup.string().trim().min(10, "Please provide more detail").required(),
});