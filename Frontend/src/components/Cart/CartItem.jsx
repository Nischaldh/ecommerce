import { Link } from "react-router-dom";
import {X} from "lucide-react";
import QuantityControl from "./QuantityControl";

const CartItem = ({
  item,
  quantity,
  isSelected,
  onToggleSelect,
  onIncrement,
  onDecrement,
  onRemove,
}) => {
  return (
    <div className={`flex gap-3 p-3 sm:p-4 rounded-xl border transition-colors ${
      isSelected ? "border-orange-200 bg-orange-50/30" : "border-gray-100 bg-white"
    }`}>

      {/* Checkbox — hidden on mobile, shown on sm+ */}
      <div className="hidden sm:flex items-center shrink-0">
        <button
          onClick={() => onToggleSelect(item.id)}
          className={`size-4 rounded border-2 flex items-center justify-center transition-colors ${
            isSelected
              ? "bg-orange-500 border-orange-500"
              : "border-gray-300 hover:border-orange-400"
          }`}
        >
          {isSelected && (
            <svg className="size-2.5 text-white" fill="none" viewBox="0 0 10 8">
              <path d="M1 4l3 3 5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </button>
      </div>

      {/* Image */}
      <Link
        to={`/products/${item.product.id}`}
        className="shrink-0"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="size-20 sm:size-24 rounded-lg overflow-hidden bg-gray-100">
          <img
            src={item.product.primaryImage}
            alt={item.product.name}
            className="w-full h-full object-cover"
          />
        </div>
      </Link>

      {/* Details + controls */}
      <div className="flex flex-1 flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 min-w-0">

        {/* Name + desc + seller */}
        <div className="flex-1 min-w-0 flex flex-col gap-0.5">
          {/* Mobile checkbox inline with name */}
          <div className="flex items-center gap-2 sm:hidden">
            <button
              onClick={() => onToggleSelect(item.id)}
              className={`size-4 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${
                isSelected
                  ? "bg-orange-500 border-orange-500"
                  : "border-gray-300"
              }`}
            >
              {isSelected && (
                <svg className="size-2.5 text-white" fill="none" viewBox="0 0 10 8">
                  <path d="M1 4l3 3 5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
            <Link to={`/products/${item.product.id}`}>
              <h3 className="font-semibold text-gray-900 text-sm line-clamp-1">
                {item.product.name}
              </h3>
            </Link>
          </div>

          {/* Desktop name */}
          <Link to={`/products/${item.product.id}`} className="hidden sm:block">
            <h3 className="font-semibold text-gray-900 text-sm sm:text-base line-clamp-1 hover:text-orange-500 transition-colors">
              {item.product.name}
            </h3>
          </Link>


          {/* Mobile — quantity + price in one row */}
          <div className="flex items-center justify-between mt-2 sm:hidden">
            <QuantityControl
              quantity={quantity}
              onIncrement={() => onIncrement(item.id)}
              onDecrement={() => onDecrement(item.id)}
              size="sm"
            />
            <p className="font-bold text-orange-500 text-sm">
              Rs. {(item.product.price * quantity).toLocaleString("en-NP")}
            </p>
          </div>
        </div>

        {/* Desktop — quantity */}
        <div className="hidden sm:flex items-center shrink-0">
          <QuantityControl
            quantity={quantity}
            onIncrement={() => onIncrement(item.id)}
            onDecrement={() => onDecrement(item.id)}
            size="md"
          />
        </div>

        {/* Desktop — price */}
        <div className="hidden sm:flex flex-col items-end shrink-0 min-w-20">
          <p className="font-bold text-orange-500 text-base">
            Rs. {(item.product.price * quantity).toLocaleString("en-NP")}
          </p>
          {quantity > 1 && (
            <p className="text-xs text-gray-400">
              Rs. {Number(item.product.price).toLocaleString("en-NP")} each
            </p>
          )}
        </div>

        {/* Remove button */}
        <button
          onClick={() => onRemove(item.id)}
          className="hidden sm:flex items-center justify-center size-7 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors shrink-0"
        >
          <X className="size-4" />
        </button>
      </div>

      {/* Mobile remove — top right */}
      <button
        onClick={() => onRemove(item.id)}
        className="sm:hidden flex items-center justify-center size-6 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors shrink-0 self-start mt-0.5"
      >
        <X className="size-3.5" />
      </button>
    </div>
  );
};

export default CartItem;