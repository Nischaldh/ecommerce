import * as yup from "yup";

export const productValidation = yup.object().shape({
    name: yup.string().required("Product name is required"),
    price: yup.number().required("Price is required").min(0,"Price must be a positive number"),
    description: yup.string().required("Description is required"),
    category: yup.string().required("Category is required"),
});

export const getProductsValidation = yup.object().shape({
    name: yup.string().optional(),
    category: yup.string().optional(),
    minPrice: yup.number().optional().min(0,"Minimum price must be a positive number"),
    maxPrice: yup.number().optional().min(0,"Maximum price must be a positive number"),
    page: yup.number().optional().min(1,"Page must be at least 1"),
    pageSize: yup.number().optional().min(1,"Page size must be at least 1"),
})

export const getProductParamValidation = yup.object({
  id: yup.string().uuid("Invalid product id"),
});