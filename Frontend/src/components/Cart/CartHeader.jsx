import { useSelector } from "react-redux";

const CartHeader = ({ allSelected, onSelectAll }) => {
  const items = useSelector((state) => state.cart.items);

  return (
    <div className="flex items-center justify-between pb-4 border-b border-gray-100">
      <div className="flex items-center gap-3">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Your Cart</h1>
        <span className="bg-orange-100 text-orange-500 text-xs font-semibold px-2.5 py-1 rounded-full">
          {items.length} {items.length === 1 ? "item" : "items"}
        </span>
      </div>

      {items.length > 0 && (
        <button
          onClick={onSelectAll}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-orange-500 transition-colors"
        >
          <div className={`size-4 rounded border-2 flex items-center justify-center transition-colors ${
            allSelected
              ? "bg-orange-500 border-orange-500"
              : "border-gray-300 hover:border-orange-400"
          }`}>
            {allSelected && (
              <svg className="size-2.5 text-white" fill="none" viewBox="0 0 10 8">
                <path d="M1 4l3 3 5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>
          Select All
        </button>
      )}
    </div>
  );
};

export default CartHeader;