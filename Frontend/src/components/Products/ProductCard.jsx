// components/Products/ProductCard.jsx
import { Link } from "react-router-dom";
import { Star, Package } from "lucide-react";

const ProductCard = ({ product }) => {
  const formattedDate = new Date(product.createdAt).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    },
  );

  return (
    <Link
      to={`/products/${product.id}`}
      className="group flex flex-col bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-300"
    >
      {/* Image */}
      <div className="w-full aspect-4/3 overflow-hidden bg-gray-50">
        <img
          src={product.primaryImage}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 p-3">
        {/* Name */}
        <h3 className="font-semibold text-gray-900 truncate text-sm sm:text-base">
          {product.name}
        </h3>

        {/* Price */}
        <p className="text-orange-500 font-bold text-base sm:text-lg">
          Rs. {Number(product.price).toLocaleString("en-NP")}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`size-3.5 ${
                i < Math.round(product.averageRating ?? 0)
                  ? "fill-orange-400 text-orange-400"
                  : "fill-gray-200 text-gray-200"
              }`}
            />
          ))}
          <span className="text-xs text-gray-400 ml-1">
            ({Number(product.averageRating ?? 0).toFixed(1)})
          </span>
        </div>

        {/* Stock */}
        <div className="flex items-center gap-1.5">
          <Package className="size-3.5 text-gray-400" />
          <span
            className={`text-xs font-medium ${
              product.stock === 0
                ? "text-red-500"
                : product.stock < 10
                  ? "text-yellow-500"
                  : "text-green-600"
            }`}
          >
            {product.stock === 0
              ? "Out of stock"
              : product.stock < 10
                ? `Only ${product.stock} left`
                : `${product.stock} in stock`}
          </span>
        </div>

        {/* Description */}
        <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        {/* Divider */}
        <hr className="border-gray-100" />

        {/* Seller + Date */}
        {/* Seller + Date */}
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          {/* Seller */}
          <Link
            to={`/seller/${product.seller?.id}`}
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1.5 group/seller"
          >
            <div className="size-6 rounded-full bg-orange-100 overflow-hidden flex items-center justify-center shrink-0">
              {product.seller?.profilePic ? (
                <img
                  src={product.seller.profilePic}
                  alt={product.seller.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-orange-500 text-[10px] font-bold">
                  {product.seller?.name?.charAt(0).toUpperCase()}
                </span>
              )}
            </div>

            <span className="text-[11px] sm:text-xs text-gray-500 group-hover/seller:text-orange-500 transition-colors truncate max-w-20">
              {product.seller?.name}
            </span>
          </Link>

          {/* Date */}
          <span className="text-[10px] sm:text-[11px] text-gray-400">
            {formattedDate}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
