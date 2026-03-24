import { Link } from "react-router-dom";
import ProductCard from "../Products/ProductCard";
import ProductCardSkeleton from "../Products/ProductCardSkeleton";

const ProductSection = ({ title, subtitle, products, loading, viewMoreLink }) => {
  return (
    <section className="py-10">
      {/* Section header */}
      <div className="flex flex-col items-center text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold">{title}</h2>
        {subtitle && (
          <p className="text-gray-500 text-sm mt-2 max-w-md">{subtitle}</p>
        )}
        <div className="w-12 h-1 bg-orange-500 rounded mt-3" />
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))
          : products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
      </div>

      {/* View more button */}
      {!loading && (
        <div className="flex justify-center mt-8">
          <Link
            to={viewMoreLink}
            className="px-8 py-2.5 border border-gray-800 text-sm font-medium hover:bg-gray-800 hover:text-white transition-colors"
          >
            View All Products
          </Link>
        </div>
      )}
    </section>
  );
};

export default ProductSection;