import { ShoppingBag, Zap } from "lucide-react";

const CartSummary = ({
  selectedCount,
  selectedTotal,
  totalItems,
  onCheckoutSelected,
  onCheckoutAll,
  selectedIds,
}) => {
  const shipping = 0; 
  const hasSelection = selectedIds.length > 0;

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-5 flex flex-col gap-4 h-fit lg:sticky lg:top-6">
      <h2 className="font-bold text-gray-900 text-lg">Order Summary</h2>

      <div className="flex flex-col gap-3 text-sm">
        <div className="flex justify-between text-gray-600">
          <span>Selected items</span>
          <span className="font-medium text-gray-900">{selectedCount}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span className="font-medium text-gray-900">
            Rs. {selectedTotal.toLocaleString("en-NP")}
          </span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Shipping</span>
          <span className="font-medium text-green-600">
            {shipping === 0 ? "Free" : `Rs. ${shipping}`}
          </span>
        </div>

        <hr className="border-gray-100" />

        <div className="flex justify-between font-bold text-gray-900 text-base">
          <span>Total</span>
          <span className="text-orange-500">
            Rs. {(selectedTotal + shipping).toLocaleString("en-NP")}
          </span>
        </div>
      </div>

      {/* Checkout selected */}
      <button
        onClick={onCheckoutSelected}
        disabled={!hasSelection}
        className="w-full flex items-center justify-center gap-2 py-3 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Zap className="size-4" />
        {hasSelection
          ? `Checkout Selected (${selectedIds.length})`
          : "Select items to checkout"}
      </button>

      {/* Checkout all */}
      <button
        onClick={onCheckoutAll}
        disabled={totalItems === 0}
        className="w-full flex items-center justify-center gap-2 py-3 border-2 border-orange-500 text-orange-500 rounded-xl font-semibold hover:bg-orange-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ShoppingBag className="size-4" />
        Checkout All
      </button>

      <p className="text-xs text-gray-400 text-center">
        Taxes and fees calculated at checkout
      </p>
    </div>
  );
};

export default CartSummary;