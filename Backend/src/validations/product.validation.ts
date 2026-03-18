import * as yup from "yup";
import { SortBy } from "../types/global.types.js";

export const productValidation = yup.object().shape({
    name: yup.string().required("Product name is required").min(2, "Product name must be at least 2 characters").max(100, "Product name must be at most 100 characters"),
    price: yup.number().required("Price is required").min(0, "Price must be a positive number"),
    description: yup.string().required("Description is required"),
    category: yup.string().required("Category is required"),
    stock: yup.number().required("Stock is required").min(0),
});

export const getProductsValidation = yup.object().shape({
    name: yup.string().optional(),
    category: yup.string().optional(),
    minPrice: yup.number().optional().min(0,"Minimum price must be a positive number"),
    maxPrice: yup.number().optional().min(0,"Maximum price must be a positive number"),
    page: yup.number().optional().min(1,"Page must be at least 1"),
    pageSize: yup.number().optional().min(1,"Page size must be at least 1"),
    minRating: yup.number().optional().min(0,"Please provide positive rating").max(5,"Ratings cannot be above 5."),
      sort: yup
    .mixed<SortBy>()
    .oneOf(
      Object.values(SortBy),
      "Invalid sort option"
    )
    .optional(),

})

export const getProductParamValidation = yup.object({
  id: yup.string().uuid("Invalid product id"),
});

export const updateProductValidation = yup.object({
  name: yup
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name cannot exceed 100 characters")
    .optional(),

  price: yup
    .number()
    .min(0, "Price must be a positive number")
    .optional(),

  description: yup
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters")
    .max(2000, "Description cannot exceed 2000 characters")
    .optional(),

  category: yup
    .string()
    .trim()
    .min(2, "Category must be at least 2 characters")
    .max(100, "Category cannot exceed 100 characters")
    .optional(),
    stock: yup.number().required("Stock is required").min(0).optional(),
});