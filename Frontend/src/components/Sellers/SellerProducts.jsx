import { Search, X } from "lucide-react";
import ProductCard from "../Products/ProductCard";
import ProductCardSkeleton from "../Products/ProductCardSkeleton";

const SellerProducts = ({
  sellerName,
  products,
  productsTotal,
  loading,
  productFilters,
  totalPages,
  sortOptions,
  searchInput,
  setSearchInput,
  hasActiveFilters,
  handleSortChange,
  handlePageChange,
  handleClearFilters,
}) => {
  return (
    <div className="flex flex-col gap-4 flex-1 min-w-0">

      {/* Search + clear */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder={`Search ${sellerName}'s products...`}
            className="w-full pl-9 pr-9 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-orange-400 transition-colors"
          />
          {searchInput && (
            <button
              onClick={() => setSearchInput("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="size-4" />
            </button>
          )}
        </div>

        {hasActiveFilters && (
          <button
            onClick={handleClearFilters}
            className="flex items-center gap-1 px-3 py-2 border border-red-200 text-red-500 rounded-lg text-sm hover:bg-red-50 transition-colors shrink-0"
          >
            <X className="size-3.5" />
            Clear
          </button>
        )}
      </div>

      {/* Mobile sort pills */}
      <div className="flex md:hidden gap-2 overflow-x-auto pb-1">
        {sortOptions.map((opt) => (
          <button
            key={opt.value}
            onClick={() => handleSortChange(opt.value)}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs border transition-colors ${
              productFilters.sort === opt.value
                ? "bg-orange-500 text-white border-orange-500"
                : "border-gray-200 text-gray-600 hover:border-orange-400 hover:text-orange-500"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Result count */}
      <p className="text-sm text-gray-500">
        {loading
          ? "Loading..."
          : `${productsTotal} product${productsTotal !== 1 ? "s" : ""}`}
      </p>

      {/* Products grid */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-gray-400">
          <p className="text-lg font-semibold">No products found</p>
          <p className="text-sm mt-1">Try adjusting your filters</p>
          {hasActiveFilters && (
            <button
              onClick={handleClearFilters}
              className="mt-3 px-5 py-2 bg-orange-500 text-white rounded-lg text-sm hover:bg-orange-600 transition-colors"
            >
              Clear Filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div className="flex items-center justify-center gap-1.5 py-4">
          <button
            onClick={() => handlePageChange(productFilters.page - 1)}
            disabled={productFilters.page === 1}
            className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm text-gray-600 hover:border-orange-400 hover:text-orange-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(
              (p) =>
                p === 1 ||
                p === totalPages ||
                Math.abs(p - productFilters.page) <= 1
            )
            .reduce((acc, p, idx, arr) => {
              if (idx > 0 && p - arr[idx - 1] > 1) acc.push("...");
              acc.push(p);
              return acc;
            }, [])
            .map((p, i) =>
              p === "..." ? (
                <span key={`e-${i}`} className="px-2 text-gray-400 text-sm">
                  ...
                </span>
              ) : (
                <button
                  key={p}
                  onClick={() => handlePageChange(p)}
                  className={`w-9 h-9 rounded-lg text-sm transition-colors ${
                    productFilters.page === p
                      ? "bg-orange-500 text-white font-medium"
                      : "border border-gray-200 text-gray-600 hover:border-orange-400 hover:text-orange-500"
                  }`}
                >
                  {p}
                </button>
              )
            )}

          <button
            onClick={() => handlePageChange(productFilters.page + 1)}
            disabled={productFilters.page === totalPages}
            className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm text-gray-600 hover:border-orange-400 hover:text-orange-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default SellerProducts;