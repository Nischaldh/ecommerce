import CommissionTable from "@/components/Commissions/CommissionTable";
import PageHeader from "@/components/shared/PageHeader";
import Pagination from "@/components/shared/Pagination";
import TableSkeleton from "@/components/shared/TableSkeleton";
import { useCommissions } from "@/hooks/useCommission";
import { BarChart2 } from "lucide-react";



const Commissions = () => {
  const {
    commissions, total, loading,
    page, setPage, totalPages,
    statusFilter, setStatusFilter,
    actionLoading, statusTabs,
    handleConfirm, handleRelease,
  } = useCommissions();

  return (
    <div className="flex flex-col gap-5">
      <PageHeader
        title="Commissions"
        subtitle={`${total} commission records`}
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
        <TableSkeleton rows={8} cols={9} />
      ) : commissions.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
          <BarChart2 className="size-12 opacity-20 mb-3" />
          <p className="font-semibold">No commissions found</p>
        </div>
      ) : (
        <CommissionTable
          commissions={commissions}
          actionLoading={actionLoading}
          onConfirm={handleConfirm}
          onRelease={handleRelease}
        />
      )}

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
};

export default Commissions;