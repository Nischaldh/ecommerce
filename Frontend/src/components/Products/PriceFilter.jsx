const PriceFilter = ({ priceInput, setPriceInput, handlePriceApply, handlePriceClear, filters }) => {
  const hasPrice = filters.minPrice || filters.maxPrice;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-700">Price Range</h3>
        {hasPrice && (
          <button
            onClick={handlePriceClear}
            className="text-xs text-red-500 hover:text-red-600"
          >
            Clear
          </button>
        )}
      </div>

      <div className="flex items-center gap-2">
        <div className="flex-1">
          <label className="text-xs text-gray-500 mb-1 block">Min (Rs.)</label>
          <input
            type="number"
            value={priceInput.minPrice}
            onChange={(e) =>
              setPriceInput((prev) => ({ ...prev, minPrice: e.target.value }))
            }
            placeholder="0"
            min={0}
            className="w-full px-2 py-1.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-orange-400 transition-colors"
          />
        </div>
        <span className="text-gray-400 text-sm mt-4">—</span>
        <div className="flex-1">
          <label className="text-xs text-gray-500 mb-1 block">Max (Rs.)</label>
          <input
            type="number"
            value={priceInput.maxPrice}
            onChange={(e) =>
              setPriceInput((prev) => ({ ...prev, maxPrice: e.target.value }))
            }
            placeholder="Any"
            min={0}
            className="w-full px-2 py-1.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-orange-400 transition-colors"
          />
        </div>
      </div>

      <button
        onClick={handlePriceApply}
        className="w-full py-1.5 bg-orange-500 text-white text-sm rounded-lg hover:bg-orange-600 transition-colors"
      >
        Apply
      </button>
    </div>
  );
};

export default PriceFilter;