import { CheckCircle, XCircle, BadgeCheck } from "lucide-react";
import StatusBadge from "../shared/StatusBadge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const RefundTable = ({ refunds, onApprove, onComplete, onReject }) => (
  <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-100">
            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Order</th>
            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Buyer</th>
            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Amount</th>
            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Reason</th>
            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Status</th>
            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Date</th>
            <th className="px-4 py-3" />
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {refunds.map((r) => (
            <tr key={r.id} className="hover:bg-gray-50/50 transition-colors">
              <td className="px-4 py-3 font-mono text-xs text-gray-600">
                #{r.order_id?.slice(0, 8).toUpperCase()}
              </td>
              <td className="px-4 py-3 text-sm text-gray-700">
                <p className="font-medium">{r.user?.name ?? "—"}</p>
                <p className="text-xs text-gray-400">{r.user?.email}</p>
              </td>
              <td className="px-4 py-3 font-bold text-gray-900">
                Rs. {Number(r.amount).toLocaleString("en-NP")}
              </td>
              <td className="px-4 py-3 text-xs text-gray-600 max-w-40">
                <p className="truncate">{r.reason}</p>
              </td>
              <td className="px-4 py-3"><StatusBadge status={r.status} /></td>
              <td className="px-4 py-3 text-xs text-gray-500">
                {new Date(r.createdAt).toLocaleDateString()}
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-1 justify-end">
                  {r.status === "REQUESTED" && (
                    <>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            onClick={() => onApprove(r.id)}
                            className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-400 hover:text-blue-600 transition-colors"
                          >
                            <CheckCircle className="size-4" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>Approve refund</TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            onClick={() => onReject(r.id)}
                            className="p-1.5 rounded-lg hover:bg-red-50 text-red-400 hover:text-red-600 transition-colors"
                          >
                            <XCircle className="size-4" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>Reject refund</TooltipContent>
                      </Tooltip>
                    </>
                  )}
                  {r.status === "APPROVED" && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={() => onComplete(r.id)}
                          className="p-1.5 rounded-lg hover:bg-green-50 text-green-400 hover:text-green-600 transition-colors"
                        >
                          <BadgeCheck className="size-4" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>Mark completed</TooltipContent>
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

export default RefundTable;