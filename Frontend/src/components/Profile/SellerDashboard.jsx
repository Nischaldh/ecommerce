import { Search, X, BarChart2 } from "lucide-react";
import DashboardStats from "./DashboardStats";
import SellerOrderCommissionCard from "./SellerOrderCommissionCard";
import { useSellerDashboard } from "@/hooks/profile/useSellerDashboard";

const SellerDashboard = () => {
  const {
    stats, statsLoading,
    commissions, total, loading,
    totalPages, page,
    searchInput, setSearchInput,
    handlePageChange,
  } = useSellerDashboard();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-lg font-bold text-gray-900">Seller Dashboard</h2>
        <p className="text-sm text-gray-500 mt-0.5">
          Track your earnings and order commissions
        </p>
      </div>

      {/* Two column layout on lg */}
      <div className="flex flex-col lg:flex-row gap-6">

        {/* Left — orders + commissions */}
        <div className="flex-1 min-w-0 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-800">
              Order Commissions
              <span className="ml-2 text-sm font-normal text-gray-400">
                ({total})
              </span>
            </h3>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search by order ID or product name..."
              className="w-full pl-9 pr-9 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-orange-400 transition-colors"
            />
            {searchInput && (
              <button
                onClick={() => setSearchInput("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="size-4" />
              </button>
            )}
          </div>

          {/* Commission cards */}
          {loading ? (
            <div className="flex flex-col gap-3 animate-pulse">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-32 bg-gray-100 rounded-xl" />
              ))}
            </div>
          ) : commissions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-gray-400">
              <BarChart2 className="size-12 opacity-20 mb-3" />
              <p className="text-base font-semibold">No orders yet</p>
              <p className="text-sm mt-1">
                {searchInput
                  ? "No results for your search"
                  : "Your commission records will appear here"}
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {commissions.map((commission) => (
                <SellerOrderCommissionCard
                  key={commission.id}
                  commission={commission}
                />
              ))}
            </div>
          )}

          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <div className="flex items-center justify-center gap-1.5 py-2">
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm text-gray-600 hover:border-orange-400 hover:text-orange-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
                .reduce((acc, p, idx, arr) => {
                  if (idx > 0 && p - arr[idx - 1] > 1) acc.push("...");
                  acc.push(p);
                  return acc;
                }, [])
                .map((p, i) =>
                  p === "..." ? (
                    <span key={`e-${i}`} className="px-2 text-gray-400 text-sm">...</span>
                  ) : (
                    <button
                      key={p}
                      onClick={() => handlePageChange(p)}
                      className={`w-9 h-9 rounded-lg text-sm transition-colors ${
                        page === p
                          ? "bg-orange-500 text-white font-medium"
                          : "border border-gray-200 text-gray-600 hover:border-orange-400 hover:text-orange-500"
                      }`}
                    >
                      {p}
                    </button>
                  )
                )}

              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages}
                className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm text-gray-600 hover:border-orange-400 hover:text-orange-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </div>

        {/* Right — analytics */}
        <div className="w-full lg:w-72 shrink-0">
          <DashboardStats stats={stats} loading={statsLoading} />
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;