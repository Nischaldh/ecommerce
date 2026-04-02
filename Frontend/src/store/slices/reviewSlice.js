import { createSlice } from "@reduxjs/toolkit";

const reviewSlice = createSlice({
  name: "reviews",
  initialState: {
    
    productReviews: [],
    productReviewsTotal: 0,
    submitRating: 0,  
    hoverRating: 0,
   
    userReviews: [],
    userReviewsTotal: 0,
    loading: false,
  },
  reducers: {
    setProductReviews: (state, action) => {
      state.productReviews = action.payload.reviews;
      state.productReviewsTotal = action.payload.total;
    },
    addReview: (state, action) => {
      state.productReviews.unshift(action.payload);
      state.productReviewsTotal += 1;
    },
    updateReview: (state, action) => {
      const index = state.productReviews.findIndex(
        (r) => r.id === action.payload.id
      );
      if (index !== -1) state.productReviews[index] = action.payload;

      const userIndex = state.userReviews.findIndex(
        (r) => r.id === action.payload.id
      );
      if (userIndex !== -1) state.userReviews[userIndex] = action.payload;
    },
    removeReview: (state, action) => {
      state.productReviews = state.productReviews.filter(
        (r) => r.id !== action.payload
      );
      state.productReviewsTotal -= 1;
      state.userReviews = state.userReviews.filter(
        (r) => r.id !== action.payload
      );
    },
    setUserReviews: (state, action) => {
      state.userReviews = action.payload.reviews;
      state.userReviewsTotal = action.payload.total;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
        setSubmitRating: (state, action) => { 
      state.submitRating = action.payload;
    },
    setHoverRating: (state, action) => { 
      state.hoverRating = action.payload;
    },

  },
});

export const {
  setProductReviews,
  addReview,
  updateReview,
  removeReview,
  setUserReviews,
  setLoading,
  setSubmitRating, 
  setHoverRating,   
} = reviewSlice.actions;
export default reviewSlice.reducer;