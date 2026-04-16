import { CheckCircle, XCircle } from "lucide-react";
import StatusBadge from "../shared/StatusBadge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const PayoutTable = ({ payouts, onComplete, onFail }) => (
  <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-100">
            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Seller</th>
            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Amount</th>
            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Method</th>
            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Status</th>
            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Reference</th>
            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Notes</th>
            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Date</th>
            <th className="px-4 py-3" />
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {payouts.map((p) => (
            <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
              <td className="px-4 py-3 text-sm font-medium text-gray-900">
                {p.sellerName ?? p.seller_id?.slice(0, 8)}
              </td>
              <td className="px-4 py-3 font-bold text-gray-900">
                Rs. {Number(p.amount).toLocaleString("en-NP")}
              </td>
              <td className="px-4 py-3">
                <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
                  {p.method}
                </span>
              </td>
              <td className="px-4 py-3"><StatusBadge status={p.status} /></td>
              <td className="px-4 py-3 text-xs text-gray-500 font-mono">
                {p.payoutReference ?? "—"}
              </td>
              <td className="px-4 py-3 text-xs text-gray-500 max-w-36">
                <p className="truncate">{p.notes ?? "—"}</p>
              </td>
              <td className="px-4 py-3 text-xs text-gray-500">
                {new Date(p.createdAt).toLocaleDateString()}
              </td>
              <td className="px-4 py-3">
                {p.status === "PROCESSING" && (
                  <div className="flex items-center gap-1 justify-end">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={() => onComplete(p.id)}
                          className="p-1.5 rounded-lg hover:bg-green-50 text-green-400 hover:text-green-600 transition-colors"
                        >
                          <CheckCircle className="size-4" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>Mark completed</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={() => onFail(p.id)}
                          className="p-1.5 rounded-lg hover:bg-red-50 text-red-400 hover:text-red-600 transition-colors"
                        >
                          <XCircle className="size-4" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>Mark failed</TooltipContent>
                    </Tooltip>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default PayoutTable;