import * as yup from "yup";

export const productValidation = yup.object().shape({
    name: yup.string().required("Product name is required"),
    price: yup.number().required("Price is required").min(0,"Price must be a positive number"),
    description: yup.string().required("Description is required"),
    category: yup.string().required("Category is required"),
});
