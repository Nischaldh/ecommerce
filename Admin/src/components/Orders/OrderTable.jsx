import StatusBadge from "../shared/StatusBadge";
import { Eye, CheckCircle, Unlock } from "lucide-react";
import {
  Tooltip, TooltipContent, TooltipTrigger,
} from "@/components/ui/tooltip";

const OrderTable = ({ orders, actionLoading, onView, onConfirm, onRelease }) => (
  <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-100">
            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Order ID</th>
            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Buyer</th>
            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Total</th>
            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Status</th>
            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Payment</th>
            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Date</th>
            <th className="px-4 py-3" />
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {orders.map((order) => (
            <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
              <td className="px-4 py-3 font-mono text-xs text-gray-600">
                #{order.id.slice(0, 8).toUpperCase()}
              </td>
              <td className="px-4 py-3 text-sm text-gray-700">{order.user?.name ?? "—"}</td>
              <td className="px-4 py-3 font-medium text-gray-900">
                Rs. {Number(order.totalAmount).toLocaleString("en-NP")}
              </td>
              <td className="px-4 py-3"><StatusBadge status={order.status} /></td>
              <td className="px-4 py-3"><StatusBadge status={order.paymentStatus} /></td>
              <td className="px-4 py-3 text-xs text-gray-500">
                {new Date(order.createdAt).toLocaleDateString()}
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-1 justify-end">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => onView(order.id)}
                        className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <Eye className="size-4" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>View order</TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => onConfirm(order.id)}
                        disabled={actionLoading === order.id}
                        className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-400 hover:text-blue-600 transition-colors disabled:opacity-50"
                      >
                        <CheckCircle className="size-4" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>Confirm commissions</TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => onRelease(order.id)}
                        disabled={actionLoading === order.id}
                        className="p-1.5 rounded-lg hover:bg-green-50 text-green-400 hover:text-green-600 transition-colors disabled:opacity-50"
                      >
                        <Unlock className="size-4" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>Release commissions</TooltipContent>
                  </Tooltip>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default OrderTable;