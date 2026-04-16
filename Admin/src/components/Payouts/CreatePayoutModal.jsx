import { X, CheckCircle, AlertCircle } from "lucide-react";

const CreatePayoutModal = ({
  onClose, balances, createForm, createErrors, creating,
  sellerPaymentInfo, onChange, onSubmit, onVerify,
}) => {
  const selectedBalance = balances.find((b) => b.seller_id === createForm.sellerId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-2xl w-full max-w-md p-6 flex flex-col gap-4 shadow-xl">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-gray-900 text-lg">Create Payout</h2>
          <button onClick={onClose} className="size-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-400">
            <X className="size-5" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="flex flex-col gap-4">

          {/* Seller select */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">Seller</label>
            <select
              value={createForm.sellerId}
              onChange={onChange("sellerId")}
              className={`w-full px-3 py-2 border rounded-lg text-sm outline-none focus:border-orange-400 ${
                createErrors.sellerId ? "border-red-400" : "border-gray-200"
              }`}
            >
              <option value="">Select seller</option>
              {balances.map((b) => (
                <option key={b.seller_id} value={b.seller_id}>
                  {b.sellerName} — Available: Rs. {Number(b.availableAmount).toLocaleString()}
                </option>
              ))}
            </select>
            {createErrors.sellerId && <p className="text-xs text-red-500">{createErrors.sellerId}</p>}
          </div>

          {/* Payment info status */}
          {createForm.sellerId && (
            <div className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs ${
              sellerPaymentInfo?.isVerified
                ? "bg-green-50 text-green-700 border border-green-100"
                : "bg-yellow-50 text-yellow-700 border border-yellow-100"
            }`}>
              {sellerPaymentInfo?.isVerified ? (
                <>
                  <CheckCircle className="size-3.5 shrink-0" />
                  Verified — Khalti: {sellerPaymentInfo.khaltiId}
                </>
              ) : sellerPaymentInfo ? (
                <div className="flex items-center justify-between w-full">
                  <span className="flex items-center gap-1.5">
                    <AlertCircle className="size-3.5 shrink-0" />
                    Not verified — {sellerPaymentInfo.khaltiId ?? "No Khalti ID"}
                  </span>
                  {sellerPaymentInfo.khaltiId && (
                    <button
                      type="button"
                      onClick={() => onVerify(createForm.sellerId)}
                      className="text-xs underline"
                    >
                      Verify now
                    </button>
                  )}
                </div>
              ) : (
                <>
                  <AlertCircle className="size-3.5 shrink-0" />
                  No payment info added by seller
                </>
              )}
            </div>
          )}

          {/* Amount */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">Amount (Rs.)</label>
            {selectedBalance && (
              <p className="text-xs text-gray-500">
                Available: Rs. {Number(selectedBalance.availableAmount).toLocaleString()}
              </p>
            )}
            <input
              type="number"
              value={createForm.amount}
              onChange={onChange("amount")}
              placeholder="Enter amount"
              min={1}
              className={`w-full px-3 py-2 border rounded-lg text-sm outline-none focus:border-orange-400 ${
                createErrors.amount ? "border-red-400" : "border-gray-200"
              }`}
            />
            {createErrors.amount && <p className="text-xs text-red-500">{createErrors.amount}</p>}
          </div>

          {/* Method */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">Method</label>
            <select
              value={createForm.method}
              onChange={onChange("method")}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-orange-400"
            >
              <option value="KHALTI">Khalti</option>
            </select>
          </div>

          {/* Notes */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">Notes (optional)</label>
            <input
              type="text"
              value={createForm.notes}
              onChange={onChange("notes")}
              placeholder="e.g. Monthly payout"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-orange-400"
            />
          </div>

          <div className="flex gap-3 mt-1">
            <button type="button" onClick={onClose} className="flex-1 py-2 border border-gray-200 text-gray-600 rounded-xl text-sm hover:bg-gray-50">
              Cancel
            </button>
            <button type="submit" disabled={creating} className="flex-1 py-2 bg-orange-500 text-white rounded-xl text-sm font-medium hover:bg-orange-600 disabled:opacity-60">
              {creating ? "Creating..." : "Create Payout"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePayoutModal;