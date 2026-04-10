import * as yup from "yup";

export const reviewSchema = yup.object({
  rating: yup
    .number()
    .min(1, "Rating is required")
    .max(5)
    .required("Rating is required"),
  comment: yup.string().optional(),
});

export const addressSchema = yup.object({
  fullName: yup.string().trim().required("Full name is required"),
  phone: yup.string().trim().required("Phone is required"),
  addressLine1: yup.string().trim().required("Address is required"),
  addressLine2: yup.string().trim().nullable().optional(),
  city: yup.string().trim().required("City is required"),
  state: yup.string().trim().required("State is required"),
  postalCode: yup.string().trim().required("Postal code is required"),
  country: yup.string().trim().required("Country is required"),
});

export const updateNameSchema = yup.object({
  name: yup.string().trim().min(2, "Name must be at least 2 characters").required("Name is required"),
});

export const updateEmailSchema = yup.object({
  newEmail: yup.string().email("Invalid email").required("Email is required"),
});

export const verifyEmailOtpSchema = yup.object({
  otp: yup.string().length(6, "OTP must be 6 digits").required("OTP is required"),
});

export const changePasswordSchema = yup.object({
  currentPassword: yup.string().required("Current password is required"),
  newPassword: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Must contain at least one uppercase letter")
    .matches(/[a-z]/, "Must contain at least one lowercase letter")
    .matches(/[0-9]/, "Must contain at least one number")
    .matches(/[^A-Za-z0-9]/, "Must contain at least one special character")
    .required("New password is required"),
  confirmNewPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Passwords must match")
    .required("Please confirm your password"),
});

export const addProductSchema = yup.object({
  name: yup.string().trim().min(2).max(100).required("Name is required"),
  description: yup.string().trim().min(10).required("Description is required"),
  price: yup.number().min(0).required("Price is required"),
  category: yup.string().required("Category is required"),
  stock: yup.number().min(0).required("Stock is required"),
});

export const paymentSchema = yup.object({
  payoutPreference: yup.string().oneOf(["KHALTI", "BANK"]).required(),
  khaltiId: yup.string().trim().nullable().optional(),
  khaltiName: yup.string().trim().nullable().optional(),
});