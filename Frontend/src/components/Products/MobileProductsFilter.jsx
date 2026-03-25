import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { categories, sortOptions } from "@/constants/constants";
import { SlidersHorizontal, Check, X } from "lucide-react";
import PriceFilter from "./PriceFilter";

export const MobileProductsFilter = ({
  filters,
  handleCategorySelect,
  handleSortChange,
  handleClearFilters,
  hasActiveFilters,
  priceInput,
  setPriceInput, 
  handlePriceApply, 
  handlePriceClear,
}) => {
  const activeCount = [filters.category, filters.sort, filters.name].filter(
    Boolean,
  ).length;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="relative flex items-center gap-1.5 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:border-orange-400 hover:text-orange-500 transition-colors md:hidden">
          <SlidersHorizontal className="size-4" />
          <span>Filters</span>
          {activeCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-orange-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-medium">
              {activeCount}
            </span>
          )}
        </button>
      </SheetTrigger>

      <SheetContent
        side="bottom"
        className="h-[85vh] rounded-t-2xl p-0 flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b shrink-0">
          <h2 className="font-semibold text-gray-900">Filters & Sort</h2>
          <div className="flex items-center gap-3">
            {hasActiveFilters && (
              <SheetClose asChild>
                <button
                  onClick={handleClearFilters}
                  className="flex items-center gap-1 text-sm text-red-500 hover:text-red-600"
                >
                  <X className="size-3.5" />
                  Clear all
                </button>
              </SheetClose>
            )}
          </div>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-6">
          {/* Sort */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">
              Sort By
            </h3>
            <div className="flex flex-col gap-1">
              {sortOptions.map((opt) => (
                <SheetClose asChild key={opt.value}>
                  <button
                    onClick={() =>
                      handleSortChange(
                        filters.sort === opt.value ? "" : opt.value,
                      )
                    }
                    className={`flex items-center justify-between px-4 py-2.5 rounded-lg text-sm transition-colors ${
                      filters.sort === opt.value
                        ? "bg-orange-50 text-orange-500 font-medium"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {opt.label}
                    {filters.sort === opt.value && (
                      <Check className="size-4 text-orange-500" />
                    )}
                  </button>
                </SheetClose>
              ))}
            </div>
          </div>

          {/* Divider */}
          <hr />

          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">
              Category
            </h3>
            <div className="grid grid-cols-2 gap-1.5">
              {categories.map((cat) => (
                <SheetClose asChild key={cat.id}>
                  <button
                    onClick={() => handleCategorySelect(cat.value)}
                    className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                      filters.category === cat.value
                        ? "bg-orange-500 text-white font-medium"
                        : "border border-gray-200 text-gray-600 hover:border-orange-400 hover:text-orange-500"
                    }`}
                  >
                    <span className="truncate">{cat.name}</span>
                    {filters.category === cat.value && (
                      <Check className="size-3.5 shrink-0 ml-1" />
                    )}
                  </button>
                </SheetClose>
              ))}
            </div>
          </div>
          <hr />
          <PriceFilter
            priceInput={priceInput}
            setPriceInput={setPriceInput}
            handlePriceApply={handlePriceApply}
            handlePriceClear={handlePriceClear}
            filters={filters}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};
