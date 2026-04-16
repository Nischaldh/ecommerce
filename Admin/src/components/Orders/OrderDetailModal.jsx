import StatusBadge from "../shared/StatusBadge";
import { X } from "lucide-react";

const OrderDetailModal = ({ data, onClose }) => {
  if (!data) return null;
  const { order, commissions } = data;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto shadow-xl">

        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white">
          <div>
            <h2 className="font-bold text-gray-900">Order #{order.id.slice(0, 8).toUpperCase()}</h2>
            <p className="text-xs text-gray-400 mt-0.5">
              {new Date(order.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>
          <button onClick={onClose} className="size-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-400">
            <X className="size-5" />
          </button>
        </div>

        <div className="p-6 flex flex-col gap-5">
          {/* Summary */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs text-gray-500">Total</p>
              <p className="font-bold text-gray-900 mt-1">Rs. {Number(order.totalAmount).toLocaleString("en-NP")}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs text-gray-500">Status</p>
              <div className="mt-1"><StatusBadge status={order.status} /></div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs text-gray-500">Payment</p>
              <div className="mt-1"><StatusBadge status={order.paymentStatus} /></div>
            </div>
          </div>

          {/* Items */}
          <div>
            <h3 className="font-semibold text-gray-800 text-sm mb-3">Items ({order.items?.length})</h3>
            <div className="flex flex-col gap-2">
              {order.items?.map((item) => (
                <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="size-10 rounded-lg overflow-hidden bg-gray-200 shrink-0">
                    <img src={item.primaryImage} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{item.productName}</p>
                    <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-900">Rs. {Number(item.subtotal).toLocaleString("en-NP")}</p>
                    <StatusBadge status={item.status} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Commissions */}
          {commissions?.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-800 text-sm mb-3">Commissions</h3>
              <div className="flex flex-col gap-2">
                {commissions.map((c) => (
                  <div key={c.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg text-sm">
                    <div>
                      <p className="font-medium text-gray-900">{c.orderItem?.productName ?? "Item"}</p>
                      <p className="text-xs text-gray-500">
                        Rate: {(c.commissionRate * 100).toFixed(1)}% · Fee: Rs. {Number(c.commissionAmount).toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">Rs. {Number(c.sellerAmount).toLocaleString()}</p>
                      <StatusBadge status={c.status} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetailModal;