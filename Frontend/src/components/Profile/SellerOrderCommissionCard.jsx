import { dashboardStatusConfig, paymentStatusConfig } from "@/constants/constants";
import { useMemo } from "react";
import { Link } from "react-router-dom";

const NOW = Date.now();

const SellerOrderCommissionCard = ({ commission }) => {
  const status = dashboardStatusConfig[commission.status] || dashboardStatusConfig.PENDING;
  const payStatus = paymentStatusConfig[commission.paymentStatus] || paymentStatusConfig.UNPAID;
  


  const releaseDate = commission.releaseDate
    ? new Date(commission.releaseDate).toLocaleDateString("en-US", {
        year: "numeric", month: "short", day: "numeric",
      })
    : null;

  const isReleased = commission.status === "RELEASED";
  const daysUntilRelease = useMemo(() => {
    if (!commission.releaseDate) return null;

    return Math.max(
      0,
      Math.ceil(
        (new Date(commission.releaseDate) - NOW) /
          (1000 * 60 * 60 * 24)
      )
    );
  }, [commission.releaseDate]);

  return (
    <div className="bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-sm transition-shadow">
      <div className="flex flex-col sm:flex-row">

        {/* Left — order + items */}
        <div className="flex-1 p-4 flex flex-col gap-2 min-w-0 border-b sm:border-b-0 sm:border-r border-gray-100">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-xs text-gray-400">Order ID</p>
              <Link
                to={`/orders/${commission.order_id}`}
                className="text-xs font-mono font-semibold text-gray-700 hover:text-orange-500 transition-colors"
              >
                #{commission.order_id.slice(0, 8).toUpperCase()}
              </Link>
            </div>
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full shrink-0 ${status.color}`}>
              {status.label}
            </span>
          </div>

          <div className="flex flex-col gap-0.5">
            <p className="text-xs text-gray-400">Item</p>
            <p className="text-sm font-medium text-gray-900 truncate">
              {commission.productName}
            </p>
            <p className="text-xs text-gray-500">Qty: {commission.quantity}</p>
          </div>
        </div>

        {/* Right — financials */}
        <div className="w-full sm:w-52 shrink-0 p-4 flex flex-col gap-2.5 bg-gray-50/50">

          <div className="flex justify-between items-center">
            <p className="text-xs text-gray-500">Item Total</p>
            <p className="text-sm font-semibold text-gray-800">
              Rs. {Number(commission.itemAmount).toLocaleString("en-NP")}
            </p>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-xs text-gray-500">
              Commission ({(commission.commissionRate * 100).toFixed(1)}%)
            </p>
            <p className="text-xs text-red-500">
              - Rs. {Number(commission.commissionAmount).toLocaleString("en-NP")}
            </p>
          </div>

          <div className="flex justify-between items-center border-t border-gray-100 pt-2">
            <p className="text-xs font-semibold text-gray-700">You Receive</p>
            <p className="text-sm font-bold text-green-600">
              Rs. {Number(commission.sellerAmount).toLocaleString("en-NP")}
            </p>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-xs text-gray-500">Payment</p>
            <p className={`text-xs font-semibold ${payStatus.color}`}>
              {payStatus.label}
            </p>
          </div>

          {/* Release date */}
          {!isReleased && releaseDate && (
            <div className="flex justify-between items-center">
              <p className="text-xs text-gray-500">Available on</p>
              <div className="text-right">
                <p className="text-xs font-medium text-gray-700">{releaseDate}</p>
                {daysUntilRelease > 0 && (
                  <p className="text-[11px] text-gray-400">
                    {daysUntilRelease}d remaining
                  </p>
                )}
              </div>
            </div>
          )}

          {isReleased && (
            <div className="bg-green-50 rounded-lg px-2 py-1 text-center">
              <p className="text-xs text-green-600 font-medium">
                Added to your balance
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SellerOrderCommissionCard;