import { statusConfig } from "@/constants/constants";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";


const OrderDetailHeader = ({ order }) => {
  const status = statusConfig[order.status] || statusConfig.PENDING;
  const formattedDate = new Date(order.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="flex flex-col gap-4">
      <Link
        to="/orders"
        className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-orange-500 transition-colors w-fit"
      >
        <ArrowLeft className="size-4" />
        Back to Orders
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            Order Details
          </h1>
          <p className="text-xs text-gray-400 font-mono mt-1">
            #{order.id.toUpperCase()}
          </p>
          <p className="text-xs text-gray-400 mt-0.5">{formattedDate}</p>
        </div>

        <span className={`self-start sm:self-auto flex items-center gap-1.5 text-sm font-semibold px-3 py-1.5 rounded-full border ${status.color}`}>
          <span className={`size-2 rounded-full ${status.dot}`} />
          {status.label}
        </span>
      </div>
    </div>
  );
};

export default OrderDetailHeader;