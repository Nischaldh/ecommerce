import * as yup from "yup";

export const updateProfileValidation = yup.object({
  name: yup.string(),
      currentPassword: yup.string().when("newPassword", {
      is: (val: string) => !!val,
      then: (schema) => schema.required("Current password is required to change password"),
      otherwise: (schema) => schema.notRequired(),
    }),
  newPassword: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character",
    ),
  confirmNewPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Passwords must match"),
  newEmail: yup.string().email("Invalid email"),
});

export const verifyEmailOtpValidation = yup.object({
  otp: yup.string().required("OTP is required"),
});

export const getSellersValidation = yup.object({
  name: yup.string().optional(),
  page: yup.number().min(1).optional(),
  pageSize: yup.number().min(1).optional(),
});

export const sellerParamValidation = yup.object({
  id: yup.string().uuid("Invalid seller id").required(),
});

export const getSellerProductsValidation = yup.object({
  name: yup.string().optional(),
  minPrice: yup.number().min(0).optional(),
  maxPrice: yup.number().min(0).optional(),
  sort: yup.string().optional(),
  minRating: yup.number().min(0).max(5).optional(),
  page: yup.number().min(1).optional(),
  pageSize: yup.number().min(1).optional(),
});

