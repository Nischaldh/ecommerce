import { CheckCircle, Unlock } from "lucide-react";
import StatusBadge from "../shared/StatusBadge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const CommissionTable = ({ commissions, actionLoading, onConfirm, onRelease }) => (
  <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-100">
            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Order</th>
            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Product</th>
            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Seller</th>
            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Item Amount</th>
            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Rate</th>
            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Commission</th>
            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Seller Gets</th>
            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Status</th>
            <th className="px-4 py-3" />
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {commissions.map((c) => (
            <tr key={c.id} className="hover:bg-gray-50/50 transition-colors">
              <td className="px-4 py-3 font-mono text-xs text-gray-600">
                #{c.order_id?.slice(0, 8).toUpperCase()}
              </td>
              <td className="px-4 py-3 text-sm text-gray-700 max-w-36">
                <p className="truncate">{c.orderItem?.productName ?? "—"}</p>
              </td>
              <td className="px-4 py-3 text-sm text-gray-700">
                {c.seller?.name ?? "—"}
              </td>
              <td className="px-4 py-3 text-sm text-gray-900">
                Rs. {Number(c.itemAmount).toLocaleString("en-NP")}
              </td>
              <td className="px-4 py-3 text-sm text-gray-500">
                {(Number(c.commissionRate) * 100).toFixed(1)}%
              </td>
              <td className="px-4 py-3 text-sm font-medium text-red-600">
                - Rs. {Number(c.commissionAmount).toLocaleString("en-NP")}
              </td>
              <td className="px-4 py-3 text-sm font-bold text-green-600">
                Rs. {Number(c.sellerAmount).toLocaleString("en-NP")}
              </td>
              <td className="px-4 py-3">
                <StatusBadge status={c.status} />
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-1 justify-end">
                  {c.status === "PENDING" && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={() => onConfirm(c.order_id)}
                          disabled={actionLoading === c.order_id}
                          className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-400 hover:text-blue-600 transition-colors disabled:opacity-50"
                        >
                          <CheckCircle className="size-4" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>Confirm commission</TooltipContent>
                    </Tooltip>
                  )}
                  {c.status === "CONFIRMED" && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={() => onRelease(c.order_id)}
                          disabled={actionLoading === c.order_id}
                          className="p-1.5 rounded-lg hover:bg-green-50 text-green-400 hover:text-green-600 transition-colors disabled:opacity-50"
                        >
                          <Unlock className="size-4" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>Release commission</TooltipContent>
                    </Tooltip>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default CommissionTable;