import * as yup from "yup";

export const createAddressValidation = yup.object({
  fullName: yup.string().trim().required("Full name is required"),
  phone: yup.string().trim().required("Phone is required"),
  addressLine1: yup.string().trim().required("Address is required"),
  addressLine2: yup.string().trim().nullable().optional(),
  city: yup.string().trim().required("City is required"),
  state: yup.string().trim().required("State is required"),
  postalCode: yup.string().trim().required("Postal code is required"),
  country: yup.string().trim().required("Country is required"),
  isDefault: yup.boolean().optional(),
});

export const updateAddressValidation = yup.object({
  fullName: yup.string().trim().optional(),
  phone: yup.string().trim().optional(),
  addressLine1: yup.string().trim().optional(),
  addressLine2: yup.string().trim().nullable().optional(),
  city: yup.string().trim().optional(),
  state: yup.string().trim().optional(),
  postalCode: yup.string().trim().optional(),
  country: yup.string().trim().optional(),
  isDefault: yup.boolean().optional(),
});

export const addressParamValidation = yup.object({
  id: yup.string().uuid("Invalid address id").required(),
});