import { X } from "lucide-react";

const OrderDetailSummary = ({ order, canCancel, cancelling, onCancel }) => {
  const shipping = 0;

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4 flex flex-col gap-4">
      <h2 className="font-bold text-gray-900">Payment Summary</h2>

      <div className="flex flex-col gap-2 text-sm">
        <div className="flex justify-between text-gray-600">
          <span>Items ({order.items?.length})</span>
          <span>Rs. {Number(order.totalAmount).toLocaleString("en-NP")}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Shipping</span>
          <span className="text-green-600">Free</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Payment Status</span>
          <span className={`font-medium ${
            order.paymentStatus === "PAID" ? "text-green-600" : "text-yellow-600"
          }`}>
            {order.paymentStatus}
          </span>
        </div>

        <hr className="border-gray-100 my-1" />

        <div className="flex justify-between font-bold text-gray-900 text-base">
          <span>Total</span>
          <span className="text-orange-500">
            Rs. {Number(order.totalAmount + shipping).toLocaleString("en-NP")}
          </span>
        </div>
      </div>

      {canCancel && (
        <button
          onClick={onCancel}
          disabled={cancelling}
          className="w-full flex items-center justify-center gap-2 py-2.5 border-2 border-red-400 text-red-500 rounded-xl font-semibold hover:bg-red-50 transition-colors disabled:opacity-60 disabled:cursor-not-allowed text-sm"
        >
          <X className="size-4" />
          {cancelling ? "Cancelling..." : "Cancel Order"}
        </button>
      )}

      {order.status === "CANCELLED" && (
        <div className="bg-red-50 border border-red-100 rounded-lg px-3 py-2 text-xs text-red-600 text-center">
          This order has been cancelled
        </div>
      )}

      {order.status === "COMPLETED" && (
        <div className="bg-green-50 border border-green-100 rounded-lg px-3 py-2 text-xs text-green-600 text-center">
          Order delivered successfully
        </div>
      )}
    </div>
  );
};

export default OrderDetailSummary;