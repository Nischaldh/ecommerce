import { Minus, Plus } from "lucide-react";

const QuantityControl = ({ quantity, onIncrement, onDecrement, size = "md" }) => {
  const isSmall = size === "sm";

  return (
    <div className={`flex items-center border border-gray-200 rounded-lg overflow-hidden ${
      isSmall ? "h-7" : "h-9"
    }`}>
      <button
        onClick={onDecrement}
        disabled={quantity <= 1}
        className={`flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
          isSmall ? "w-7" : "w-9"
        }`}
      >
        <Minus className={isSmall ? "size-3" : "size-3.5"} />
      </button>
      <span className={`flex items-center justify-center font-medium text-gray-800 border-x border-gray-200 ${
        isSmall ? "w-8 text-xs" : "w-10 text-sm"
      }`}>
        {quantity}
      </span>
      <button
        onClick={onIncrement}
        className={`flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors ${
          isSmall ? "w-7" : "w-9"
        }`}
      >
        <Plus className={isSmall ? "size-3" : "size-3.5"} />
      </button>
    </div>
  );
};

export default QuantityControl