// pages/Cart.jsx
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useCartPage } from "@/hooks/cart/useCartPage";
import CartHeader from "@/components/Cart/CartHeader";
import CartItem from "@/components/Cart/CartItem";
import CartSummary from "@/components/Cart/CartSummary";
import CartSkeleton from "@/components/Cart/CardSkeleton";

const Cart = () => {
  const {
    items,
    loading,
    quantities,
    selectedIds,
    allSelected,
    selectedTotal,
    selectedCount,
    handleIncrement,
    handleDecrement,
    handleRemove,
    handleToggleSelect,
    handleSelectAll,
    handleCheckoutSelected,
    handleCheckoutAll,
  } = useCartPage();

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

  if (loading) {
    return (
      <div className="py-6">
        <CartSkeleton />
      </div>
    );
  }

  // empty cart
  if (!loading && items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4 text-gray-400">
        <ShoppingCart className="size-16 opacity-20" />
        <p className="text-xl font-semibold">Your cart is empty</p>
        <p className="text-sm">Browse products and add something you like</p>
        <Link
          to="/products"
          className="mt-2 px-6 py-2.5 bg-orange-500 text-white rounded-xl text-sm font-medium hover:bg-orange-600 transition-colors"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="py-6 flex flex-col lg:flex-row gap-6 items-start">

      {/* ── Cart section ── */}
      <div className="flex flex-col gap-4 flex-1 min-w-0 w-full">
        <CartHeader
          allSelected={allSelected}
          onSelectAll={handleSelectAll}
        />

        {/* Column headers — desktop only */}
        <div className="hidden sm:grid grid-cols-[auto_1fr_120px_100px_32px] gap-4 px-4 text-xs font-medium text-gray-400 uppercase tracking-wide">
          <div className="w-4" />
          <span>Item</span>
          <span className="text-center">Quantity</span>
          <span className="text-right">Price</span>
          <div />
        </div>

        {/* Cart items */}
        <div className="flex flex-col gap-3">
          {items.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              quantity={quantities[item.id] ?? item.quantity}
              isSelected={selectedIds.includes(item.id)}
              onToggleSelect={handleToggleSelect}
              onIncrement={handleIncrement}
              onDecrement={handleDecrement}
              onRemove={handleRemove}
            />
          ))}
        </div>
      </div>

      {/* ── Summary section ── */}
      <div className="w-full lg:w-80 shrink-0">
        <CartSummary
          selectedCount={selectedCount}
          selectedTotal={selectedTotal}
          totalItems={totalItems}
          selectedIds={selectedIds}
          onCheckoutSelected={handleCheckoutSelected}
          onCheckoutAll={handleCheckoutAll}
        />
      </div>
    </div>
  );
};

export default Cart;