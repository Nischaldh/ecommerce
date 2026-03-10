import * as yup from "yup";
import { userRole } from "../types/global.types.js";

export const loginValidation = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});
export const signupValidation = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters"),
  email: yup.string().email("Invalid email").required("Email is required"),
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

  role: yup
    .mixed<userRole>()
    .oneOf(Object.values(userRole), "Role must be either buyer or seller")
    .required("Role is required"),
});

export const emailValidation = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
})

export const otpValidatoin = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  otp: yup.string().required("OTP is required"),
});

export const resetPasswordValidation = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  otp: yup.string().required("OTP is required"),
  newPassword: yup
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
    .oneOf([yup.ref("newPassword")], "Passwords must match"),
});
