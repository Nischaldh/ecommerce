import { Link } from "react-router-dom";
import { X, ChevronRight } from "lucide-react";
import { statusConfig } from "@/constants/constants";


const OrderCard = ({ order, onCancel, cancellingId, canCancel }) => {
  const firstItem = order.items?.[0];
  const extraItems = (order.items?.length || 0) - 1;
  const status = statusConfig[order.status] || statusConfig.PENDING;
  const isCancelling = cancellingId === order.id;

  const formattedDate = new Date(order.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-sm transition-shadow">

      {/* Order header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-100">
        <div className="flex items-center gap-3 min-w-0">
          <div>
            <p className="text-xs text-gray-400">Order ID</p>
            <p className="text-xs font-mono font-medium text-gray-700 truncate max-w-35 sm:max-w-none">
              #{order.id.slice(0, 8).toUpperCase()}
            </p>
          </div>
          <div className="hidden sm:block h-8 w-px bg-gray-200" />
          <div className="hidden sm:block">
            <p className="text-xs text-gray-400">Placed on</p>
            <p className="text-xs font-medium text-gray-700">{formattedDate}</p>
          </div>
        </div>

        {/* Status badge */}
        <span className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${status.color}`}>
          <span className={`size-1.5 rounded-full ${status.dot}`} />
          {status.label}
        </span>
      </div>

      {/* Items preview */}
      <div className="p-4 flex items-center gap-4">

        {/* Primary image */}
        <Link to={`/orders/${order.id}`} className="shrink-0">
          <div className="size-16 sm:size-20 rounded-lg overflow-hidden bg-gray-100">
            {firstItem && (
              <img
                src={order.items[0]?.primaryImage || "/placeholder.png"}
                alt={firstItem.productName}
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </Link>

        {/* Item info */}
        <div className="flex-1 min-w-0">
          <Link to={`/orders/${order.id}`}>
            <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate hover:text-orange-500 transition-colors">
              {firstItem?.productName || "Order"}
            </h3>
          </Link>
          {extraItems > 0 && (
            <p className="text-xs text-gray-500 mt-0.5">
              +{extraItems} more {extraItems === 1 ? "item" : "items"}
            </p>
          )}
          <p className="text-xs text-gray-400 mt-1 sm:hidden">{formattedDate}</p>
        </div>

        {/* Price + actions */}
        <div className="flex flex-col items-end gap-2 shrink-0">
          <p className="font-bold text-orange-500 text-sm sm:text-base">
            Rs. {Number(order.totalAmount).toLocaleString("en-NP")}
          </p>

          <div className="flex items-center gap-2">
            {/* Cancel button */}
            {canCancel(order) && (
              <button
                onClick={() => onCancel(order.id)}
                disabled={isCancelling}
                className="flex items-center gap-1 px-2.5 py-1 text-xs border border-red-200 text-red-500 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-50"
              >
                <X className="size-3" />
                {isCancelling ? "..." : "Cancel"}
              </button>
            )}

            {/* View details */}
            <Link
              to={`/orders/${order.id}`}
              className="flex items-center gap-0.5 text-xs text-gray-500 hover:text-orange-500 transition-colors"
            >
              Details
              <ChevronRight className="size-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;