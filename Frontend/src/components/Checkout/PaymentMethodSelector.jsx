import { Truck, CreditCard } from "lucide-react";

const PaymentMethodSelector = ({ paymentMethod, setPaymentMethod }) => {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-semibold text-gray-800 text-sm">Payment Method</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* COD */}
        <button
          type="button"
          onClick={() => setPaymentMethod("COD")}
          className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left ${
            paymentMethod === "COD"
              ? "border-orange-500 bg-orange-50"
              : "border-gray-100 bg-white hover:border-orange-200"
          }`}
        >
          <div className={`size-10 rounded-full flex items-center justify-center shrink-0 ${
            paymentMethod === "COD" ? "bg-orange-500" : "bg-gray-100"
          }`}>
            <Truck className={`size-5 ${
              paymentMethod === "COD" ? "text-white" : "text-gray-500"
            }`} />
          </div>
          <div>
            <p className={`font-semibold text-sm ${
              paymentMethod === "COD" ? "text-orange-600" : "text-gray-900"
            }`}>
              Cash on Delivery
            </p>
            <p className="text-xs text-gray-500 mt-0.5">Pay when you receive</p>
          </div>
          {paymentMethod === "COD" && (
            <div className="ml-auto size-5 rounded-full bg-orange-500 flex items-center justify-center shrink-0">
              <svg className="size-3 text-white" fill="none" viewBox="0 0 10 8">
                <path d="M1 4l3 3 5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          )}
        </button>

        {/* Khalti */}
        <button
          type="button"
          onClick={() => setPaymentMethod("KHALTI")}
          className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left ${
            paymentMethod === "KHALTI"
              ? "border-purple-500 bg-purple-50"
              : "border-gray-100 bg-white hover:border-purple-200"
          }`}
        >
          <div className={`size-10 rounded-full flex items-center justify-center shrink-0 ${
            paymentMethod === "KHALTI" ? "bg-purple-600" : "bg-gray-100"
          }`}>
            <CreditCard className={`size-5 ${
              paymentMethod === "KHALTI" ? "text-white" : "text-gray-500"
            }`} />
          </div>
          <div>
            <p className={`font-semibold text-sm ${
              paymentMethod === "KHALTI" ? "text-purple-700" : "text-gray-900"
            }`}>
              Pay with Khalti
            </p>
            <p className="text-xs text-gray-500 mt-0.5">Secure online payment</p>
          </div>
          {paymentMethod === "KHALTI" && (
            <div className="ml-auto size-5 rounded-full bg-purple-600 flex items-center justify-center shrink-0">
              <svg className="size-3 text-white" fill="none" viewBox="0 0 10 8">
                <path d="M1 4l3 3 5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          )}
        </button>
      </div>

      {/* Khalti info */}
      {paymentMethod === "KHALTI" && (
        <div className="bg-purple-50 border border-purple-100 rounded-lg px-3 py-2">
          <p className="text-xs text-purple-700">
            You will be redirected to Khalti to complete your payment securely.
            Do not close the window during payment.
          </p>
        </div>
      )}

      {/* COD info */}
      {paymentMethod === "COD" && (
        <div className="bg-orange-50 border border-orange-100 rounded-lg px-3 py-2">
          <p className="text-xs text-orange-700">
            Please keep the exact amount ready when your order arrives.
          </p>
        </div>
      )}
    </div>
  );
};

export default PaymentMethodSelector;