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
