import { RotateCcw } from "lucide-react";
import { useRefunds } from "../hooks/useRefunds";
import PageHeader from "../components/shared/PageHeader";
import RefundTable from "../components/Refunds/RefundTable";
import TableSkeleton from "../components/shared/TableSkeleton";
import Pagination from "../components/shared/Pagination";

const Refunds = () => {
  const {
    refunds, total, loading,
    page, setPage, totalPages,
    statusFilter, setStatusFilter, statusTabs,
    submitting,
    approveModal, setApproveModal,
    completeModal, setCompleteModal,
    rejectModal, setRejectModal,
    adminNotes, setAdminNotes,
    refundReference, setRefundReference,
    handleApprove, handleComplete, handleReject,
  } = useRefunds();

  return (
    <div className="flex flex-col gap-5">
      <PageHeader title="Refunds" subtitle={`${total} refund requests`} />

      {/* Status tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-lg p-1 w-fit">
        {statusTabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => { setStatusFilter(tab.value); setPage(1); }}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              statusFilter === tab.value
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {loading ? (
        <TableSkeleton rows={6} cols={7} />
      ) : refunds.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
          <RotateCcw className="size-12 opacity-20 mb-3" />
          <p className="font-semibold">No refunds found</p>
        </div>
      ) : (
        <RefundTable
          refunds={refunds}
          onApprove={(id) => { setApproveModal(id); setAdminNotes(""); }}
          onComplete={(id) => { setCompleteModal(id); setRefundReference(""); }}
          onReject={(id) => { setRejectModal(id); setAdminNotes(""); }}
        />
      )}

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />

      {/* Approve modal */}
      {approveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setApproveModal(null)} />
          <div className="relative bg-white rounded-2xl w-full max-w-sm p-6 flex flex-col gap-4 shadow-xl">
            <h2 className="font-bold text-gray-900">Approve Refund</h2>
            <p className="text-sm text-gray-500">
              This will reverse seller commissions and mark the order as refunded. Add optional notes.
            </p>
            <textarea
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
              placeholder="Admin notes (optional)"
              rows={3}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-orange-400 resize-none"
            />
            <div className="flex gap-3">
              <button onClick={() => setApproveModal(null)} className="flex-1 py-2 border border-gray-200 text-gray-600 rounded-xl text-sm">Cancel</button>
              <button onClick={handleApprove} disabled={!!submitting} className="flex-1 py-2 bg-blue-500 text-white rounded-xl text-sm font-medium hover:bg-blue-600 disabled:opacity-60">
                {submitting ? "Processing..." : "Approve"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Complete modal */}
      {completeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setCompleteModal(null)} />
          <div className="relative bg-white rounded-2xl w-full max-w-sm p-6 flex flex-col gap-4 shadow-xl">
            <h2 className="font-bold text-gray-900">Mark Refund Completed</h2>
            <p className="text-sm text-gray-500">
              Confirm that money has been returned to the buyer. Add the transaction reference if available.
            </p>
            <input
              type="text"
              value={refundReference}
              onChange={(e) => setRefundReference(e.target.value)}
              placeholder="Transaction reference (optional)"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-orange-400"
            />
            <div className="flex gap-3">
              <button onClick={() => setCompleteModal(null)} className="flex-1 py-2 border border-gray-200 text-gray-600 rounded-xl text-sm">Cancel</button>
              <button onClick={handleComplete} disabled={!!submitting} className="flex-1 py-2 bg-green-500 text-white rounded-xl text-sm font-medium hover:bg-green-600 disabled:opacity-60">
                {submitting ? "Saving..." : "Mark Completed"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reject modal */}
      {rejectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setRejectModal(null)} />
          <div className="relative bg-white rounded-2xl w-full max-w-sm p-6 flex flex-col gap-4 shadow-xl">
            <h2 className="font-bold text-gray-900">Reject Refund</h2>
            <p className="text-sm text-gray-500">
              Explain why this refund is being rejected. The buyer will see this reason.
            </p>
            <textarea
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
              placeholder="Reason for rejection (required)"
              rows={3}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-orange-400 resize-none"
            />
            <div className="flex gap-3">
              <button onClick={() => setRejectModal(null)} className="flex-1 py-2 border border-gray-200 text-gray-600 rounded-xl text-sm">Cancel</button>
              <button onClick={handleReject} disabled={!!submitting} className="flex-1 py-2 bg-red-500 text-white rounded-xl text-sm font-medium hover:bg-red-600 disabled:opacity-60">
                {submitting ? "Saving..." : "Reject"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Refunds;