/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { CheckCircle, XCircle, Loader } from "lucide-react";

const PaymentVerify = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("verifying"); // verifying | success | failed

  const pidx = searchParams.get("pidx");
  const khaltiStatus = searchParams.get("status");

  useEffect(() => {
    
    const payment = searchParams.get("payment");
    if (payment === "success") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setStatus("success");
      setTimeout(() => navigate("/orders"), 3000);
    } else if (payment === "failed") {
      setStatus("failed");
    } else {
      setStatus(khaltiStatus === "Completed" ? "success" : "failed");
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4 text-center max-w-sm">
        {status === "verifying" && (
          <>
            <Loader className="size-16 text-orange-500 animate-spin" />
            <h2 className="text-xl font-bold text-gray-900">Verifying Payment</h2>
            <p className="text-sm text-gray-500">Please wait while we confirm your payment...</p>
          </>
        )}

        {status === "success" && (
          <>
            <CheckCircle className="size-16 text-green-500" />
            <h2 className="text-xl font-bold text-gray-900">Payment Successful!</h2>
            <p className="text-sm text-gray-500">
              Your payment was confirmed. Redirecting to your orders...
            </p>
          </>
        )}

        {status === "failed" && (
          <>
            <XCircle className="size-16 text-red-500" />
            <h2 className="text-xl font-bold text-gray-900">Payment Failed</h2>
            <p className="text-sm text-gray-500">
              Your payment could not be completed. No charges were made.
            </p>
            <div className="flex gap-3 mt-2">
              <button
                onClick={() => navigate(-1)}
                className="px-5 py-2 border border-gray-200 text-gray-600 rounded-xl text-sm hover:bg-gray-50 transition-colors"
              >
                Go Back
              </button>
              <button
                onClick={() => navigate("/orders")}
                className="px-5 py-2 bg-orange-500 text-white rounded-xl text-sm hover:bg-orange-600 transition-colors"
              >
                View Orders
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentVerify;