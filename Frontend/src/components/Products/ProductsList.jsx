import { useNavigate, Link } from "react-router-dom";
import { Star, Package } from "lucide-react";
import { timeAgo } from "@/lib/formatedDate";


const ProductListCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/products/${product.id}`)}
      className="group flex gap-3 sm:gap-4 bg-white border border-gray-100 rounded-xl p-3 hover:shadow-md transition-shadow duration-300 w-full cursor-pointer"
    >
      {/* Image */}
      <div className="w-28 sm:w-36 md:w-44 shrink-0 aspect-square rounded-lg overflow-hidden bg-gray-50">
        <img
          src={product.primaryImage}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 gap-1.5 min-w-0">
        <h3 className="font-semibold text-gray-900 text-sm sm:text-base line-clamp-1">
          {product.name}
        </h3>
        <p className="text-xs sm:text-sm text-gray-500 line-clamp-2 leading-relaxed">
          {product.description}
        </p>
        <p className="text-orange-500 font-bold text-sm sm:text-base">
          Rs. {Number(product.price).toLocaleString("en-NP")}
        </p>

        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`size-3 ${
                  i < Math.round(product.averageRating ?? 0)
                    ? "fill-orange-400 text-orange-400"
                    : "fill-gray-200 text-gray-200"
                }`}
              />
            ))}
            <span className="text-xs text-gray-400 ml-0.5">
              ({Number(product.averageRating ?? 0).toFixed(1)})
            </span>
          </div>

          <div className="flex items-center gap-1">
            <Package className="size-3 text-gray-400" />
            <span className={`text-xs font-medium ${
              product.stock === 0 ? "text-red-500"
              : product.stock < 10 ? "text-yellow-500"
              : "text-green-600"
            }`}>
              {product.stock === 0 ? "Out of stock"
                : product.stock < 10 ? `Only ${product.stock} left`
                : `${product.stock} in stock`}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
          {/* seller link  */}
          <Link
            to={`/seller/${product.seller?.id}`}
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1.5 group/seller min-w-0"
          >
            <div className="size-5 sm:size-6 rounded-full bg-orange-100 overflow-hidden flex items-center justify-center shrink-0">
              {product.seller?.profilePic ? (
                <img src={product.seller.profilePic} alt={product.seller.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-orange-500 text-[10px] font-bold">
                  {product.seller?.name?.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            <span className="text-xs text-gray-500 group-hover/seller:text-orange-500 transition-colors truncate max-w-20 sm:max-w-30">
              {product.seller?.name}
            </span>
          </Link>

          <span className="text-[11px] text-gray-400 shrink-0 ml-2">
            {timeAgo(product.createdAt)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductListCard;