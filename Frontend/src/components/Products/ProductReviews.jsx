import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { reviewSchema } from "@/validations/validations";
import { useReviews } from "@/hooks/review/useReview";
import { useAuth } from "@/hooks/auth/useAuth";
import { useProducts } from "@/hooks/products/useProduct";
import ReviewCard from "../Review/ReviewCard";
import ReviewSkeleton from "../Review/ReviewSkeleton";
import StarRating from "../Review/StarRating";
import { useState } from "react";

const ProductReviews = () => {
  const { user, isAuthenticated } = useAuth();
  const { selectedProduct: product } = useProducts();
  const {
    reviews,
    total: reviewsTotal,
    loading: reviewsLoading,
    submitRating,
    setSubmitRating,
    hoverRating,
    setHoverRating,
    submitReview,
    editReview,
    deleteReview,
  } = useReviews();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting },
  } = useForm({ resolver: yupResolver(reviewSchema) });

  const isSeller = user && product && user.id === product.seller?.id;
  const userReview = reviews.find((r) => r.user?.id === user?.id);
  const otherReviews = reviews.filter((r) => r.user?.id !== user?.id);

  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editingRating, setEditingRating] = useState(0);

  const onSubmit = async (data) => {
    if (submitRating === 0) return;
    const res = await submitReview({
      productId: product.id,
      rating: data.rating,
      comment: data.comment,
    });
    if (res.success) {
      reset();
      setSubmitRating(0);
    }
  };

  const handleStartEdit = (review) => {
    setEditingReviewId(review.id);
    setEditingRating(review.rating);
  };

  const handleSaveEdit = async (reviewId, comment) => {
    await editReview(reviewId, { rating: editingRating, comment });
    setEditingReviewId(null);
    setEditingRating(0);
  };

  const handleCancelEdit = () => {
    setEditingReviewId(null);
    setEditingRating(0);
  };

  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm("Delete this review?")) return;
    await deleteReview(reviewId);
  };

  if (!product) return null;

  return (
    <section className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">
          Reviews
          <span className="ml-2 text-base font-normal text-gray-400">
            ({reviewsTotal})
          </span>
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-gray-900">
            {Number(product.averageRating ?? 0).toFixed(1)}
          </span>
          <StarRating
            rating={Math.round(product.averageRating ?? 0)}
            readonly
            size="md"
          />
        </div>
      </div>

      {/* Write review */}
      {isAuthenticated && !userReview && !isSeller && (
        <div className="bg-gray-50 rounded-xl p-5 flex flex-col gap-4">
          <div>
            <h3 className="font-semibold text-gray-800">Write a Review</h3>
            <p className="text-xs text-gray-500 mt-1">
              Only verified buyers who received the product can leave a review.
            </p>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">
              Your Rating
            </label>
            <StarRating
              rating={submitRating}
              hover={hoverRating}
              onRate={(val) => {
                setSubmitRating(val);
                setValue("rating", val);
              }}
              onHover={setHoverRating}
              onLeave={() => setHoverRating(0)}
              size="lg"
            />
            {submitRating === 0 && (
              <p className="text-xs text-red-500">Please select a rating</p>
            )}
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">
                Comment{" "}
                <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <textarea
                {...register("comment")}
                rows={3}
                placeholder="Share your experience with this product..."
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-orange-400 transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting || submitRating === 0}
              className="self-start px-6 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </button>
          </form>
        </div>
      )}

      {/* User's own review */}
      {userReview && (
        <div className="bg-orange-50 border border-orange-100 rounded-xl p-4">
          <p className="text-xs font-medium text-orange-500 mb-3">
            Your Review
          </p>
          <ReviewCard
            review={userReview}
            isOwner
            editingReviewId={editingReviewId}
            editingRating={editingRating}
            setEditingRating={setEditingRating}
            handleStartEdit={handleStartEdit}
            handleSaveEdit={handleSaveEdit}
            handleCancelEdit={handleCancelEdit}
            handleDeleteReview={handleDeleteReview}
          />
        </div>
      )}

      {/* Other reviews */}
      {reviewsLoading ? (
        <div className="flex flex-col gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <ReviewSkeleton key={i} />
          ))}
        </div>
      ) : otherReviews.length === 0 && !userReview ? (
        <div className="text-center py-12 text-gray-400">
          <p className="text-lg font-medium">No reviews yet</p>
          <p className="text-sm mt-1">Be the first to review this product</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {otherReviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              isOwner={false}
              editingReviewId={editingReviewId}
              editingRating={editingRating}
              setEditingRating={setEditingRating}
              handleStartEdit={handleStartEdit}
              handleSaveEdit={handleSaveEdit}
              handleCancelEdit={handleCancelEdit}
              handleDeleteReview={handleDeleteReview}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default ProductReviews;
