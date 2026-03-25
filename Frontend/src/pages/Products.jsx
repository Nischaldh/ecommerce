import { Search, X } from "lucide-react";

import { categories, sortOptions } from "@/constants/constants";
import { useProductsPage } from "@/hooks/products/useProductsPage";
import { MobileProductsFilter } from "@/components/Products/MobileProductsFilter";
import ProductListSkeleton from "@/components/Products/ProductListSkeleton";
import ProductListCard from "@/components/Products/ProductsList";
import PriceFilter from "@/components/Products/PriceFilter";


const Products = () => {
  const {
    products,
    total,
    loading,
    filters,
    totalPages,
    searchInput,
    setSearchInput,
    handleCategorySelect,
    handleSortChange,
    handlePageChange,
    handleClearFilters,
    hasActiveFilters,
    priceInput,
    setPriceInput,
    handlePriceApply,
    handlePriceClear
  } = useProductsPage();
  const selectedCategory = categories.find((c) => c.value === filters.category);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex gap-6 flex-1 py-6">

        {/* ── Desktop sidebar categories ── */}
        <aside className="hidden md:flex flex-col gap-1 w-48 shrink-0">
          <h2 className="font-semibold text-gray-800 px-3 mb-2">Categories</h2>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategorySelect(cat.value)}
              className={`text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                filters.category === cat.value
                  ? "bg-orange-500 text-white font-medium"
                  : "text-gray-600 hover:bg-orange-50 hover:text-orange-500"
              }`}
            >
              {cat.name}
            </button>
          ))}
            <div className="mt-4 px-1">
    <PriceFilter
      priceInput={priceInput}
      setPriceInput={setPriceInput}
      handlePriceApply={handlePriceApply}
      handlePriceClear={handlePriceClear}
      filters={filters}
    />
  </div>

        </aside>

        {/* ── Main content ── */}
        <div className="flex flex-col flex-1 gap-4 min-w-0">

          {/* ── Search bar ── */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-orange-400 transition-colors"
              />
              {/* clear search */}
              {searchInput && (
                <button
                  onClick={() => setSearchInput("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="size-4" />
                </button>
              )}
            </div>

            {/* Mobile filter button */}
            <MobileProductsFilter
              filters={filters}
              handleCategorySelect={handleCategorySelect}
              handleSortChange={handleSortChange}
              handleClearFilters={handleClearFilters}
              hasActiveFilters={hasActiveFilters}
            />
          </div>

          {/* ── Desktop sort pills ── */}
          <div className="hidden md:flex items-center gap-2 flex-wrap">
            {sortOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleSortChange(opt.value)}
                className={`px-3 py-1.5 rounded-full text-xs border transition-colors ${
                  filters.sort === opt.value
                    ? "bg-orange-500 text-white border-orange-500"
                    : "border-gray-200 text-gray-600 hover:border-orange-400 hover:text-orange-500"
                }`}
              >
                {opt.label}
              </button>
            ))}

            {hasActiveFilters && (
              <button
                onClick={handleClearFilters}
                className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs border border-red-200 text-red-500 hover:bg-red-50 transition-colors ml-auto"
              >
                <X className="size-3" />
                Clear filters
              </button>
            )}
          </div>

          {/* ── Active filter tags — mobile ── */}
          {hasActiveFilters && (
            <div className="flex md:hidden items-center gap-2 flex-wrap">
              {selectedCategory && (
                <span className="flex items-center gap-1 px-2.5 py-1 bg-orange-50 text-orange-500 text-xs rounded-full border border-orange-200">
                  {selectedCategory.name}
                  <button onClick={() => handleCategorySelect(filters.category)}>
                    <X className="size-3" />
                  </button>
                </span>
              )}
              {filters.sort && (
                <span className="flex items-center gap-1 px-2.5 py-1 bg-orange-50 text-orange-500 text-xs rounded-full border border-orange-200">
                  {sortOptions.find((s) => s.value === filters.sort)?.label}
                  <button onClick={() => handleSortChange("")}>
                    <X className="size-3" />
                  </button>
                </span>
              )}
              <button
                onClick={handleClearFilters}
                className="flex items-center gap-1 px-2.5 py-1 text-xs text-red-500 border border-red-200 rounded-full hover:bg-red-50 transition-colors ml-auto"
              >
                <X className="size-3" />
                Clear all
              </button>
            </div>
          )}

          {/* ── Result count ── */}
          <p className="text-sm text-gray-500">
            {loading
              ? "Loading..."
              : `${total} product${total !== 1 ? "s" : ""} found`}
            {selectedCategory && !loading && (
              <span className="ml-1">
                in{" "}
                <span className="text-orange-500 font-medium">
                  {selectedCategory.name}
                </span>
              </span>
            )}
          </p>

          {/* ── Product list ── */}
          <div className="flex flex-col gap-3">
            {loading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <ProductListSkeleton key={i} />
              ))
            ) : products.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                <Search className="size-12 mb-3 opacity-30" />
                <p className="text-lg font-medium">No products found</p>
                <p className="text-sm mt-1">
                  Try adjusting your search or filters
                </p>
                <button
                  onClick={handleClearFilters}
                  className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-lg text-sm hover:bg-orange-600 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              products.map((product) => (
                <ProductListCard key={product.id} product={product} />
              ))
            )}
          </div>

          {/* ── Pagination ── */}
          {!loading && totalPages > 1 && (
            <div className="flex items-center justify-center gap-1.5 py-6">
              <button
                onClick={() => handlePageChange(filters.page - 1)}
                disabled={filters.page === 1}
                className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm text-gray-600 hover:border-orange-400 hover:text-orange-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((p) => (
                  p === 1 ||
                  p === totalPages ||
                  Math.abs(p - filters.page) <= 1
                ))
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
                        filters.page === p
                          ? "bg-orange-500 text-white font-medium"
                          : "border border-gray-200 text-gray-600 hover:border-orange-400 hover:text-orange-500"
                      }`}
                    >
                      {p}
                    </button>
                  )
                )}

              <button
                onClick={() => handlePageChange(filters.page + 1)}
                disabled={filters.page === totalPages}
                className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm text-gray-600 hover:border-orange-400 hover:text-orange-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;