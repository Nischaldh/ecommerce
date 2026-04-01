import { Link } from "react-router-dom";
import { ShoppingCart, Zap, Pencil, Trash2, Package, Tag, Calendar } from "lucide-react";
import StarRating from "../Review/StarRating";

const ProductInfo = ({
  product,
  formattedDate,
  isSeller,
  addingToCart,
  handleAddToCart,
  handleBuyNow,
  handleDeleteProduct,
}) => {
  return (
    <div className="flex flex-col gap-5 flex-1 min-w-0">

      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug">
        {product.name}
      </h1>

      <p className="text-2xl sm:text-3xl font-bold text-orange-500">
        Rs. {Number(product.price).toLocaleString("en-NP")}
      </p>

      <div className="flex items-center gap-6 flex-wrap">
        <div className="flex items-center gap-2">
          <StarRating rating={Math.round(product.averageRating ?? 0)} readonly size="md" />
          <span className="text-sm text-gray-500">
            ({Number(product.averageRating ?? 0).toFixed(1)}) · {product.reviewCount ?? 0} reviews
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <Package className="size-4 text-gray-400" />
          <span className={`text-sm font-medium ${
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

      <div className="flex items-center gap-2">
        <Tag className="size-4 text-gray-400" />
        <span className="text-sm text-gray-500 capitalize">{product.category}</span>
      </div>

      <div className="flex flex-col gap-1.5">
        <h3 className="font-semibold text-gray-800 text-sm">Description</h3>
        <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
          {product.description}
        </p>
      </div>

      <hr className="border-gray-100" />

      {/* Seller + Date */}
      <div className="flex items-center justify-between">
        <Link to={`/seller/${product.seller?.id}`} className="flex items-center gap-2 group">
          <div className="size-9 rounded-full bg-orange-100 overflow-hidden flex items-center justify-center shrink-0">
            {product.seller?.profilePic ? (
              <img src={product.seller.profilePic} alt={product.seller.name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-orange-500 font-bold text-sm">
                {product.seller?.name?.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          <div>
            <p className="text-xs text-gray-400">Sold by</p>
            <p className="text-sm font-semibold text-gray-800 group-hover:text-orange-500 transition-colors">
              {product.seller?.name}
            </p>
          </div>
        </Link>
        <div className="flex items-center gap-1.5 text-gray-400">
          <Calendar className="size-4" />
          <span className="text-xs">{formattedDate}</span>
        </div>
      </div>

      <hr className="border-gray-100" />


      {isSeller ? (
      
        <div className="flex gap-3">
          <button
            onClick={handleDeleteProduct}
            className="flex-1 flex items-center justify-center gap-2 py-3 border border-red-500 text-red-500 rounded-xl font-semibold hover:bg-red-50 transition-colors"
          >
            <Trash2 className="size-5" />
            Delete Product
          </button>
        </div>
      ) : product.stock > 0 ? (
        
        <div className="flex gap-3">
          <button
            onClick={handleAddToCart}
            disabled={addingToCart}
            className="flex-1 flex items-center justify-center gap-2 py-3 border-2 border-orange-500 text-orange-500 rounded-xl font-semibold hover:bg-orange-50 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <ShoppingCart className="size-5" />
            {addingToCart ? "Adding..." : "Add to Cart"}
          </button>
          <button
            onClick={handleBuyNow}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-colors"
          >
            <Zap className="size-5" />
            Buy Now
          </button>
        </div>
      ) : (
        // out of stock
        <button
          disabled
          className="w-full py-3 bg-gray-100 text-gray-400 rounded-xl font-semibold cursor-not-allowed"
        >
          Out of Stock
        </button>
      )}
    </div>
  );
};

export default ProductInfo;