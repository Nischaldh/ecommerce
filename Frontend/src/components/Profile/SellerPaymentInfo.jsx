
import { CreditCard, CheckCircle, AlertCircle } from "lucide-react";

import FormInput from "../FormInput";
import { usePaymentInfo } from "@/hooks/profile/usePaymentInfo";

const SellerPaymentInfo = () => {
  const {
    paymentInfo,
    loading,
    payoutPreference,
    register,
    handleSubmit,
    errors,
    isSubmitting,
  } = usePaymentInfo();

  if (loading) {
    return (
      <div className="flex flex-col gap-4 animate-pulse">
        <div className="h-5 bg-gray-200 rounded w-40" />
        <div className="h-12 bg-gray-100 rounded-xl" />
        <div className="h-12 bg-gray-100 rounded-xl" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h3 className="font-semibold text-gray-800 text-sm flex items-center gap-2">
          <CreditCard className="size-4 text-orange-500" />
          Payout Information
        </h3>
        <p className="text-xs text-gray-500 mt-1">
          Add your Khalti details so the admin can process your payouts.
        </p>
      </div>

      {/* Verification status */}
      {paymentInfo && (
        <div className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium ${
          paymentInfo.isVerified
            ? "bg-green-50 text-green-700 border border-green-100"
            : "bg-yellow-50 text-yellow-700 border border-yellow-100"
        }`}>
          {paymentInfo.isVerified ? (
            <>
              <CheckCircle className="size-3.5 shrink-0" />
              Payment info verified by admin — payouts enabled
            </>
          ) : (
            <>
              <AlertCircle className="size-3.5 shrink-0" />
              Pending admin verification — payouts will be enabled after review
            </>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        {/* Payout preference */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-gray-700">
            Payout Method
          </label>
          <select
            {...register("payoutPreference")}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-orange-400 transition-colors"
          >
            <option value="KHALTI">Khalti</option>
          </select>
        </div>

        {/* Khalti fields */}
        {payoutPreference === "KHALTI" && (
          <>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-gray-700">
                Khalti Phone Number
                <span className="text-red-500 ml-0.5">*</span>
              </label>
              <FormInput
                placeholder="e.g. 98XXXXXXXX"
                error={errors.khaltiId?.message}
                {...register("khaltiId")}
              />
              <p className="text-xs text-gray-400">
                The phone number registered on your Khalti account
              </p>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-gray-700">
                Account Holder Name
              </label>
              <FormInput
                placeholder="Name on your Khalti account"
                error={errors.khaltiName?.message}
                {...register("khaltiName")}
              />
            </div>
          </>
        )}

        {paymentInfo?.khaltiId && (
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-3 py-2.5 flex flex-col gap-1">
            <p className="text-xs text-gray-500 font-medium">Current saved info</p>
            <p className="text-sm text-gray-800">
              {paymentInfo.khaltiId}
              {paymentInfo.khaltiName && (
                <span className="text-gray-500 ml-2">— {paymentInfo.khaltiName}</span>
              )}
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="self-start px-6 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors disabled:opacity-60"
        >
          {isSubmitting ? "Saving..." : paymentInfo ? "Update Payment Info" : "Save Payment Info"}
        </button>
      </form>
    </div>
  );
};

export default SellerPaymentInfo;