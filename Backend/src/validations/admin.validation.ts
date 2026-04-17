import * as yup from "yup";
import { AdminRole, CommissionStatus, OrderStatus, PayoutMethod, userRole, userStatus } from "../types/global.types.js";

export const createAdminSchema = yup.object({
  name: yup.string().trim().required("Name is required"),
  email: yup.string().email().required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character",
    )
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
  role: yup.string().oneOf(Object.values(AdminRole)).optional(),
});

export const loginSchema = yup.object({
  email: yup.string().email().required("Email is required"),
  password: yup.string().required("Password is required"),
});

export const createPayoutSchema = yup.object({
  sellerId:yup.string().uuid().required("Seller ID is required"),
  amount:yup.number().positive().required("Amount is required"),
  method:yup.string().oneOf(Object.values(PayoutMethod)).required("Method is required"),
  notes:yup.string().optional(),
});

export const completePayoutSchema = yup.object({
  payoutReference: yup.string().trim().optional(),
});

export const failPayoutSchema = yup.object({
  notes: yup.string().trim().required("Notes are required"),
});

export const approveSchema = yup.object({
  adminNotes: yup.string().trim().optional(),
});

export const completeSchema = yup.object({
  refundReference: yup.string().trim().optional(),
});

export const rejectSchema = yup.object({
  adminNotes: yup.string().trim().required("Reason for rejection is required"),
});


export const adminGetUsersSchema = yup.object({
  role: yup.string().oneOf(Object.values(userRole)).optional(),
  status: yup.string().oneOf(Object.values(userStatus)).optional(),
  search: yup.string().trim().optional(),
  page: yup.string().optional(),
  pageSize: yup.string().optional(),
})

export const adminGetProductsSchema = yup.object({
  search: yup.string().trim().optional(),
  category: yup.string().trim().optional(),
  sellerId: yup.string().uuid().optional(),
  page: yup.string().optional(),
  pageSize: yup.string().optional(),
})

export const adminGetOrdersSchema = yup.object({
  status: yup.string().oneOf(Object.values(OrderStatus)).optional(),
  paymentStatus: yup.string().trim().optional(),
  search: yup.string().trim().optional(),
  page: yup.string().optional(),
  pageSize: yup.string().optional(),
})

export const adminGetCommissionsSchema = yup.object({
  status: yup.string().oneOf(Object.values(CommissionStatus)).optional(),
  sellerId: yup.string().uuid().optional(),
  page: yup.string().optional(),
  pageSize: yup.string().optional(),
})

export const adminProductDeleteSchema = yup.object({
  note: yup.string().trim().required("Reason for deletion is required"),
})