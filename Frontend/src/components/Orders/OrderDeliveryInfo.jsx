import { MapPin, Pencil, X } from "lucide-react";
import FormInput from "../FormInput";

const OrderDeliveryInfo = ({
  order,
  canEditAddress,
  editingAddress,
  savingAddress,
  onStartEdit,
  onSave,
  onCancelEdit,
  register,
  errors,
}) => {
  const addr = order.shippingAddress;

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-gray-900 flex items-center gap-2">
          <MapPin className="size-4 text-orange-500" />
          Delivery Address
        </h2>
        {canEditAddress && !editingAddress && (
          <button
            onClick={onStartEdit}
            className="flex items-center gap-1 text-xs text-orange-500 hover:text-orange-600 transition-colors"
          >
            <Pencil className="size-3.5" />
            Edit
          </button>
        )}
      </div>

      {editingAddress ? (
        <form onSubmit={onSave} className="flex flex-col gap-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <FormInput
              placeholder="Full Name"
              error={errors.fullName?.message}
              {...register("fullName")}
            />
            <FormInput
              placeholder="Phone"
              error={errors.phone?.message}
              {...register("phone")}
            />
          </div>
          <FormInput
            placeholder="Address Line 1"
            error={errors.addressLine1?.message}
            {...register("addressLine1")}
          />
          <FormInput
            placeholder="Address Line 2 (optional)"
            error={errors.addressLine2?.message}
            {...register("addressLine2")}
          />
          <div className="grid grid-cols-2 gap-3">
            <FormInput
              placeholder="City"
              error={errors.city?.message}
              {...register("city")}
            />
            <FormInput
              placeholder="State"
              error={errors.state?.message}
              {...register("state")}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <FormInput
              placeholder="Postal Code"
              error={errors.postalCode?.message}
              {...register("postalCode")}
            />
            <FormInput
              placeholder="Country"
              error={errors.country?.message}
              {...register("country")}
            />
          </div>
          <div className="flex gap-2 mt-1">
            <button
              type="submit"
              disabled={savingAddress}
              className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors disabled:opacity-60"
            >
              {savingAddress ? "Saving..." : "Save Address"}
            </button>
            <button
              type="button"
              onClick={onCancelEdit}
              className="px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="flex flex-col gap-1 text-sm text-gray-600">
          <p className="font-semibold text-gray-900">{addr.fullName}</p>
          <p>{addr.phone}</p>
          <p>{addr.addressLine1}</p>
          {addr.addressLine2 && <p>{addr.addressLine2}</p>}
          <p>
            {addr.city}, {addr.state} {addr.postalCode}
          </p>
          <p>{addr.country}</p>
        </div>
      )}
    </div>
  );
};

export default OrderDeliveryInfo;