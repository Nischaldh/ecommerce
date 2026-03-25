import type { Context } from "koa";
import {
  createReviewValidation,
  productReviewParamValidation,
  reviewParamValidation,
  updateReviewValidation,
} from "../validations/review.validation.js";
import {
  createReviewService,
  deleteReviewService,
  getProductReviewsService,
  getReviewService,
  getUserReviewsService,
  updateReviewService,
} from "../service/review.service.js";


export const createReview = async (ctx: Context) => {
  const userId = ctx.state.user.id;

  const { productId } = await productReviewParamValidation.validate(
    ctx.request.body,
    { stripUnknown: false },
  );
  const data = await createReviewValidation.validate(ctx.request.body, {
    stripUnknown: true,
  });

  const result = await createReviewService(userId, productId, data);

  ctx.status = 201;
  ctx.body = {
    success: true,
    message: "Review submitted successfully",
    review: result.review,
  };
};


export const getReview = async (ctx: Context) => {
  const { reviewId } = await reviewParamValidation.validate(ctx.params);
  const result = await getReviewService(reviewId);

  ctx.status = 200;
  ctx.body = {
    success: true,
    review: result.review,
  };
};

export const updateReview = async (ctx: Context) => {
  const { reviewId } = await reviewParamValidation.validate(ctx.params);
  const userId = ctx.state.user.id;
  const data = await updateReviewValidation.validate(ctx.request.body, {
    stripUnknown: true,
  });

  const result = await updateReviewService(reviewId, userId, data);

  ctx.status = 200;
  ctx.body = {
    success: true,
    message: "Review updated successfully",
    review: result.review,
  };
};

export const deleteReview = async (ctx: Context) => {
  const { reviewId } = await reviewParamValidation.validate(ctx.params);
  const userId = ctx.state.user.id;

  await deleteReviewService(reviewId, userId);

  ctx.status = 200;
  ctx.body = {
    success: true,
    message: "Review deleted successfully",
  };
};

export const getProductReviews = async (ctx: Context) => {
  const { productId } = await productReviewParamValidation.validate(ctx.params);
  const result = await getProductReviewsService(productId);

  ctx.status = 200;
  ctx.body = {
    success: true,
    reviews: result.reviews,
    total: result.total,
  };
};

export const getUserReviews = async (ctx: Context) => {
  const userId = ctx.state.user.id;
  const result = await getUserReviewsService(userId);

  ctx.status = 200;
  ctx.body = {
    success: true,
    reviews: result.reviews,
    total: result.total,
  };
};