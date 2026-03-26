import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import toast from "react-hot-toast";
import {
  setProductReviews,
  addReview,
  updateReview,
  removeReview,
  setLoading,
  setSubmitRating as setSubmitRatingAction,
  setHoverRating as setHoverRatingAction,
} from "../../store/slices/reviewSlice.js";
import {
  getProductReviewsService,
  createReviewService,
  updateReviewService,
  deleteReviewService,
} from "../../services/review.service.js";

export const useReviews = () => {
  const dispatch = useDispatch();
  const {
    productReviews,
    productReviewsTotal,
    loading,
    submitRating,
    hoverRating,
  } = useSelector((state) => state.reviews);
  const setSubmitRating = useCallback(
    (val) => {
      dispatch(setSubmitRatingAction(val));
    },
    [dispatch],
  );

  const setHoverRating = useCallback(
    (val) => {
      dispatch(setHoverRatingAction(val));
    },
    [dispatch],
  );
  const fetchProductReviews = useCallback(
    async (productId) => {
      dispatch(setLoading(true));
      const res = await getProductReviewsService(productId);
      if (res.success) {
        dispatch(setProductReviews({ reviews: res.reviews, total: res.total }));
      } else {
        toast.error(res.message || "Failed to load reviews");
      }
      dispatch(setLoading(false));
      return res;
    },
    [dispatch],
  );

  const submitReview = useCallback(
    async (data) => {
      console.log("submit review called ", data);
      const res = await createReviewService(data);
      if (res.success) {
        dispatch(addReview(res.review));
        toast.success("Review submitted!");
      } else {
        toast.error(res.message || "Failed to submit review");
      }
      return res;
    },
    [dispatch],
  );

  const editReview = useCallback(
    async (reviewId, data) => {
      const res = await updateReviewService(reviewId, data);
      if (res.success) {
        dispatch(updateReview(res.review));
        toast.success("Review updated!");
      } else {
        toast.error(res.message || "Failed to update review");
      }
      return res;
    },
    [dispatch],
  );

  const deleteReview = useCallback(
    async (reviewId) => {
      const res = await deleteReviewService(reviewId);
      if (res.success) {
        dispatch(removeReview(reviewId));
        toast.success("Review deleted");
      } else {
        toast.error(res.message || "Failed to delete review");
      }
      return res;
    },
    [dispatch],
  );

  return {
    reviews: productReviews,
    total: productReviewsTotal,
    loading,
    submitRating,
    hoverRating,
    setSubmitRating,
    setHoverRating,
    fetchProductReviews,
    submitReview,
    editReview,
    deleteReview,
  };
};
