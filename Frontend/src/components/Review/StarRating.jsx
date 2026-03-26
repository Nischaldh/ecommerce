import { Star } from "lucide-react";

const StarRating = ({ rating, hover, onRate, onHover, onLeave, size = "md", readonly = false }) => {
  const sizeClass = size === "sm" ? "size-3.5" : size === "lg" ? "size-6" : "size-5";

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < (hover || rating);
        return (
          <Star
            key={i}
            className={`${sizeClass} transition-colors ${
              filled ? "fill-orange-400 text-orange-400" : "fill-gray-200 text-gray-200"
            } ${!readonly ? "cursor-pointer" : ""}`}
            onClick={() => !readonly && onRate?.(i + 1)}
            onMouseEnter={() => !readonly && onHover?.(i + 1)}
            onMouseLeave={() => !readonly && onLeave?.()}
          />
        );
      })}
    </div>
  );
};

export default StarRating;