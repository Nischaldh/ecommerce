import * as yup from "yup";

export const createReviewValidation = yup.object({
  rating: yup.number().min(1).max(5).integer().required(),
  comment: yup.string().max(1000).optional(),
});

export const updateReviewValidation = yup.object({
  rating: yup.number().min(1).max(5).integer().optional(),
  comment: yup.string().max(1000).optional(),
});

export const reviewParamValidation = yup.object({
  reviewId: yup.string().uuid().required(),
});

export const productReviewParamValidation = yup.object({
  productId: yup.string().uuid().required(),
});