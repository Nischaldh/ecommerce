import { useSellerOrders } from "@/hooks/profile/useSellerOrders";
import SellerOrderItem from "./SellerOrderItem";

const SellerOrders = () => {
  const {
    sellerItems, sellerTotal, loading,
    updatingId,
    handleStatusUpdate, handleDeliveryUpdate,
    getNextStatuses, itemStatusConfig,
  } = useSellerOrders();

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-lg font-bold text-gray-900">My Orders</h2>
        <p className="text-sm text-gray-500 mt-0.5">{sellerTotal} order items to manage</p>
      </div>

      {loading ? (
        <div className="flex flex-col gap-3 animate-pulse">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-24 bg-gray-100 rounded-xl" />
          ))}
        </div>
      ) : sellerItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-gray-400">
          <p className="text-lg font-semibold">No orders yet</p>
          <p className="text-sm mt-1">Orders from buyers will appear here</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {sellerItems.map((item) => (
            <SellerOrderItem
              key={item.id}
              item={item}
              updatingId={updatingId}
              onStatusUpdate={handleStatusUpdate}
              onDeliveryUpdate={handleDeliveryUpdate}
              getNextStatuses={getNextStatuses}
              itemStatusConfig={itemStatusConfig}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SellerOrders;