import * as yup from "yup";
import { PaymentMethod } from "../types/global.types.js";
import { PayoutPreference } from "../entity/SellerPaymentInfo.js";

export const initiatePaymentValidation = yup.object({
  orderId: yup.string().uuid("Invalid order id").required(),
  method: yup.mixed<PaymentMethod>().oneOf(Object.values(PaymentMethod),"Only KHALTI or COD are allowed").required("Payment method is required"),
});

export const verifyKhaltiValidation = yup.object({
  pidx: yup.string().required("pidx is required"),
});


export const upsertPaymentInfoSchema = yup.object({
  payoutPreference: yup
    .string()
    .oneOf(Object.values(PayoutPreference))
    .required("Payout preference is required"),
  khaltiId: yup.string().trim().nullable().optional(),
  khaltiName: yup.string().trim().nullable().optional(),
});
