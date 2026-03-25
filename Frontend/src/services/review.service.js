import api from "../lib/api.js";

export const createReviewService = async (data) => {
  try {
    const res = await api.post("/reviews", data);
    return res.data;
  } catch (err) {
    return { success: false, message: err.response?.data?.message || "Failed to submit review" };
  }
};

export const getReviewService = async (reviewId) => {
  try {
    const res = await api.get(`/reviews/${reviewId}`);
    return res.data;
  } catch (err) {
    return { success: false, message: err.response?.data?.message || "Failed to fetch review" };
  }
};

export const updateReviewService = async (reviewId, data) => {
  try {
    const res = await api.patch(`/reviews/${reviewId}`, data);
    return res.data;
  } catch (err) {
    return { success: false, message: err.response?.data?.message || "Failed to update review" };
  }
};

export const deleteReviewService = async (reviewId) => {
  try {
    const res = await api.delete(`/reviews/${reviewId}`);
    return res.data;
  } catch (err) {
    return { success: false, message: err.response?.data?.message || "Failed to delete review" };
  }
};

export const getProductReviewsService = async (productId) => {
  try {
    const res = await api.get(`/products/${productId}/reviews`);
    return res.data;
  } catch (err) {
    return { success: false, message: err.response?.data?.message || "Failed to fetch reviews" };
  }
};

export const getUserReviewsService = async () => {
  try {
    const res = await api.get("/reviews/user");
    return res.data;
  } catch (err) {
    return { success: false, message: err.response?.data?.message || "Failed to fetch user reviews" };
  }
};