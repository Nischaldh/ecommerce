import { Truck } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import FormInput from "../FormInput";

const SellerOrderItem = ({
  item,
  updatingId,
  onStatusUpdate,
  onDeliveryUpdate,
  getNextStatuses,
  itemStatusConfig,
}) => {
  const [showDelivery, setShowDelivery] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      trackingNumber: item.trackingNumber || "",
      carrier: item.carrier || "",
      estimatedDelivery: item.estimatedDelivery
        ? new Date(item.estimatedDelivery).toISOString().split("T")[0]
        : "",
      notes: item.notes || "",
    },
  });

  const statusInfo = itemStatusConfig[item.status] || itemStatusConfig.PENDING;
  const nextStatuses = getNextStatuses(item.status);
  const isUpdating = updatingId === item.id;

  const onSubmitDelivery = async (data) => {
    const cleanData = Object.fromEntries(
      Object.entries(data).filter(
        ([, v]) => v !== "" && v !== null && v !== undefined,
      ),
    );
    const res = await onDeliveryUpdate(item.id, cleanData);
    if (res?.success) {
      setShowDelivery(false);
    }
  };

  return (
    <div className="flex flex-col gap-3 bg-white border border-gray-100 rounded-xl p-4">
      {/* Item row */}
      <div className="flex gap-3 items-start">
        <div className="size-14 rounded-lg overflow-hidden bg-gray-100 shrink-0">
          <img
            src={item.primaryImage}
            alt={item.productName}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-gray-900 text-sm truncate">
            {item.productName}
          </h4>
          <p className="text-xs text-gray-500 mt-0.5">
            Qty: {item.quantity} · Rs.{" "}
            {Number(item.subtotal).toLocaleString("en-NP")}
          </p>
          <p className="text-xs text-gray-400 mt-0.5 font-mono">
            Order #{item.order_id.slice(0, 8).toUpperCase()}
          </p>
        </div>

        <span className={`text-xs font-semibold ${statusInfo.color} shrink-0`}>
          ● {statusInfo.label}
        </span>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Status transitions */}
        {nextStatuses.map((status) => (
          <button
            key={status}
            onClick={() => onStatusUpdate(item.id, status)}
            disabled={isUpdating}
            className="px-3 py-1.5 bg-orange-500 text-white rounded-lg text-xs font-medium hover:bg-orange-600 transition-colors disabled:opacity-60"
          >
            {isUpdating ? "Updating..." : `Mark as ${status}`}
          </button>
        ))}

        {/* Delivery info toggle */}
        {item.status !== "PENDING" && item.status !== "CANCELLED" && (
          <button
            onClick={() => setShowDelivery(!showDelivery)}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-blue-200 text-blue-500 rounded-lg text-xs hover:bg-blue-50 transition-colors"
          >
            <Truck className="size-3.5" />
            {showDelivery ? "Hide" : "Delivery Info"}
          </button>
        )}
      </div>

      {/* Delivery form */}
      {showDelivery && (
        <form
          onSubmit={handleSubmit(onSubmitDelivery)}
          className="flex flex-col gap-3 bg-blue-50 rounded-xl p-3 mt-1"
        >
          <p className="text-xs font-semibold text-blue-700">
            Delivery Details
          </p>
          <div className="grid grid-cols-2 gap-2">
            <FormInput
              placeholder="Carrier"
              {...register("carrier")}
            />
            <FormInput
              placeholder="Tracking Number"
              {...register("trackingNumber")}
            />
          </div>
          <FormInput type="date" {...register("estimatedDelivery")} />
          <FormInput placeholder="Notes (optional)" {...register("notes")} />
          <button
            type="submit"
            disabled={isSubmitting}
            className="self-start px-4 py-1.5 bg-blue-500 text-white rounded-lg text-xs font-medium hover:bg-blue-600 transition-colors disabled:opacity-60"
          >
            {isSubmitting ? "Saving..." : "Save Delivery Info"}
          </button>
        </form>
      )}
    </div>
  );
};

export default SellerOrderItem;
