import { timeAgo } from "@/lib/formatedDate";
import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import StarRating from "./StarRating";


const ReviewCard = ({
  review,
  isOwner,
  editingReviewId,
  editingRating,
  setEditingRating,
  handleStartEdit,
  handleSaveEdit,
  handleCancelEdit,
  handleDeleteReview,
}) => {
  const [editComment, setEditComment] = useState("");
  const isEditing = editingReviewId === review.id;
  return (
    <div className="flex flex-col gap-3 bg-white border border-gray-100 rounded-xl p-4">
      {/* Reviewer info */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="size-8 rounded-full bg-orange-100 overflow-hidden flex items-center justify-center shrink-0">
            {review.user?.profilePic ? (
              <img
                src={review.user.profilePic}
                alt={review.user.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-orange-500 text-xs font-bold">
                {review.user?.name?.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">
              {review.user?.name}
            </p>
            <p className="text-xs text-gray-400">{timeAgo(review.createdAt)}</p>
          </div>
        </div>
        {isOwner && !isEditing && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                handleStartEdit(review);
                setEditComment(review.comment || "");
              }}
              className="p-1.5 text-gray-400 hover:text-blue-500 transition-colors"
            >
              <Pencil className="size-4" />
            </button>
            <button
              onClick={() => handleDeleteReview(review.id)}
              className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
            >
              <Trash2 className="size-4" />
            </button>
          </div>
        )}
      </div>
      {isEditing ? (
        <StarRating
          rating={editingRating}
          onRate={setEditingRating}
          size="md"
        />
      ) : (
        <StarRating rating={review.rating} readonly size="sm" />
      )}
      {/* Comment */}
      {isEditing ? (
        <div className="flex flex-col gap-2">
          <textarea
            value={editComment}
            onChange={(e) => setEditComment(e.target.value)}
            rows={2}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-orange-400 resize-none"
          />
          <div className="flex gap-2">
            <button
              onClick={() => handleSaveEdit(review.id, editComment)}
              className="px-4 py-1.5 bg-orange-500 text-white rounded-lg text-xs font-medium hover:bg-orange-600 transition-colors"
            >
              Save
            </button>
            <button
              onClick={handleCancelEdit}
              className="px-4 py-1.5 border border-gray-200 text-gray-600 rounded-lg text-xs hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        review.comment && (
          <p className="text-sm text-gray-600 leading-relaxed">
            {review.comment}
          </p>
        )
      )}
    </div>
  );
};

export default ReviewCard;
