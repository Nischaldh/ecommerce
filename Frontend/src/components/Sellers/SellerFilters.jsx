import PriceFilter from "../Products/PriceFilter";

const SellerFilters = ({
  sortOptions,
  productFilters,
  priceInput,
  setPriceInput,
  handleSortChange,
  handlePriceApply,
  handlePriceClear,
}) => {
  return (
    <aside className="hidden md:flex flex-col gap-4 w-48 shrink-0">
      <div className="flex flex-col gap-1">
        <h3 className="font-semibold text-gray-800 px-3 mb-1">Sort By</h3>
        {sortOptions.map((opt) => (
          <button
            key={opt.value}
            onClick={() => handleSortChange(opt.value)}
            className={`text-left px-3 py-2 rounded-lg text-sm transition-colors ${
              productFilters.sort === opt.value
                ? "bg-orange-500 text-white font-medium"
                : "text-gray-600 hover:bg-orange-50 hover:text-orange-500"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <hr className="border-gray-100" />

      <PriceFilter
        priceInput={priceInput}
        setPriceInput={setPriceInput}
        handlePriceApply={handlePriceApply}
        handlePriceClear={handlePriceClear}
        filters={productFilters}
      />
    </aside>
  );
};

export default SellerFilters;