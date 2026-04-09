import { useState } from "react";
import { X } from "lucide-react";
import { requestRefundService } from "@/services/payment.service";
import toast from "react-hot-toast";

const RefundModal = ({ orderId, onClose, onSuccess }) => {
  const [reason, setReason] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (reason.trim().length < 10) {
      toast.error("Please provide more detail (at least 10 characters)");
      return;
    }
    setSubmitting(true);
    const res = await requestRefundService({ orderId, reason: reason.trim() });
    if (res.success) {
      toast.success("Refund request submitted successfully!");
      onSuccess?.();
      onClose();
    } else {
      toast.error(res.message || "Failed to submit refund request");
    }
    setSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-2xl w-full max-w-md p-6 flex flex-col gap-4 shadow-xl">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-gray-900 text-lg">Request Refund</h2>
          <button
            onClick={onClose}
            className="size-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="bg-orange-50 border border-orange-100 rounded-lg px-3 py-2">
          <p className="text-xs text-orange-700">
            Refunds are available within 14 days of payment. Your request will be reviewed by our team.
          </p>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">
            Reason for refund
          </label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows={4}
            placeholder="Please describe why you are requesting a refund..."
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-orange-400 resize-none transition-colors"
          />
          <p className="text-xs text-gray-400">{reason.length} / min 10 characters</p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 border border-gray-200 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={submitting || reason.trim().length < 10}
            className="flex-1 py-2.5 bg-red-500 text-white rounded-xl text-sm font-medium hover:bg-red-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? "Submitting..." : "Request Refund"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RefundModal;