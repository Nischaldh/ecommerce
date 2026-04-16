import { CreditCard, Plus } from "lucide-react";
import { usePayouts } from "../hooks/usePayouts";
import PageHeader from "../components/shared/PageHeader";
import PayoutTable from "../components/Payouts/PayoutTable";
import SellerBalances from "../components/Payouts/SellerBalances";
import CreatePayoutModal from "../components/Payouts/CreatePayoutModal";
import TableSkeleton from "../components/shared/TableSkeleton";
import Pagination from "../components/shared/Pagination";

const Payouts = () => {
  const {
    payouts, balances, total, loading, balancesLoading,
    page, setPage, totalPages,
    statusFilter, setStatusFilter, statusTabs,
    createModal, setCreateModal,
    createForm, createErrors, creating,
    sellerPaymentInfo,
    completeModal, setCompleteModal,
    referenceInput, setReferenceInput,
    failModal, setFailModal,
    notesInput, setNotesInput,
    submitting,
    handleCreate, handleCreateFormChange, handleVerifyPaymentInfo,
    handleComplete, handleFail,
  } = usePayouts();

  return (
    <div className="flex flex-col gap-5">
      <PageHeader
        title="Payouts"
        subtitle={`${total} payout records`}
        action={
          <button
            onClick={() => setCreateModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors"
          >
            <Plus className="size-4" />
            Create Payout
          </button>
        }
      />

      <SellerBalances
        balances={balances}
        loading={balancesLoading}
        onVerify={handleVerifyPaymentInfo}
      />

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
        <TableSkeleton rows={6} cols={8} />
      ) : payouts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
          <CreditCard className="size-12 opacity-20 mb-3" />
          <p className="font-semibold">No payouts found</p>
        </div>
      ) : (
        <PayoutTable
          payouts={payouts}
          onComplete={(id) => { setCompleteModal(id); setReferenceInput(""); }}
          onFail={(id) => { setFailModal(id); setNotesInput(""); }}
        />
      )}

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />

      {/* Create payout modal */}
      {createModal && (
        <CreatePayoutModal
          onClose={() => setCreateModal(false)}
          balances={balances}
          createForm={createForm}
          createErrors={createErrors}
          creating={creating}
          sellerPaymentInfo={sellerPaymentInfo}
          onChange={handleCreateFormChange}
          onSubmit={handleCreate}
          onVerify={handleVerifyPaymentInfo}
        />
      )}

      {/* Complete modal */}
      {completeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setCompleteModal(null)} />
          <div className="relative bg-white rounded-2xl w-full max-w-sm p-6 flex flex-col gap-4 shadow-xl">
            <h2 className="font-bold text-gray-900">Mark Payout Complete</h2>
            <p className="text-sm text-gray-500">Enter the transaction reference from Khalti or your bank.</p>
            <input
              type="text"
              value={referenceInput}
              onChange={(e) => setReferenceInput(e.target.value)}
              placeholder="Reference number (optional)"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-orange-400"
            />
            <div className="flex gap-3">
              <button onClick={() => setCompleteModal(null)} className="flex-1 py-2 border border-gray-200 text-gray-600 rounded-xl text-sm">Cancel</button>
              <button onClick={handleComplete} disabled={submitting} className="flex-1 py-2 bg-green-500 text-white rounded-xl text-sm font-medium hover:bg-green-600 disabled:opacity-60">
                {submitting ? "Saving..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Fail modal */}
      {failModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setFailModal(null)} />
          <div className="relative bg-white rounded-2xl w-full max-w-sm p-6 flex flex-col gap-4 shadow-xl">
            <h2 className="font-bold text-gray-900">Mark Payout Failed</h2>
            <p className="text-sm text-gray-500">Explain why the payout failed. Balance will be reversed.</p>
            <textarea
              value={notesInput}
              onChange={(e) => setNotesInput(e.target.value)}
              placeholder="Reason for failure..."
              rows={3}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-orange-400 resize-none"
            />
            <div className="flex gap-3">
              <button onClick={() => setFailModal(null)} className="flex-1 py-2 border border-gray-200 text-gray-600 rounded-xl text-sm">Cancel</button>
              <button onClick={handleFail} disabled={submitting} className="flex-1 py-2 bg-red-500 text-white rounded-xl text-sm font-medium hover:bg-red-600 disabled:opacity-60">
                {submitting ? "Saving..." : "Mark Failed"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payouts;