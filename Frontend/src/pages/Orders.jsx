import { Search, Package, X } from "lucide-react";
import { useOrdersPage } from "@/hooks/orders/useOrdersPage";
import OrderCard from "@/components/Orders/OrderCard";
import OrderSkeleton from "@/components/Orders/OrderSkeleton";



const Orders = () => {
  const {
    orders,
    total,
    loading,
    filters,
    totalPages,
    statusTabs,
    searchInput,
    setSearchInput,
    cancellingId,
    handleStatusFilter,
    handlePageChange,
    handleCancel,
    canCancel,
  } = useOrdersPage();

  return (
    <div className="py-6 flex flex-col gap-6">

      {/* Page header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">My Orders</h1>
        <p className="text-sm text-gray-500 mt-1">
          {total} {total === 1 ? "order" : "orders"} total
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search by order ID or product name..."
          className="w-full pl-9 pr-9 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-orange-400 transition-colors"
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

      {/* Status tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {statusTabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => handleStatusFilter(tab.value)}
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filters.status === tab.value
                ? "bg-orange-500 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-orange-50 hover:text-orange-500"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Orders list */}
      {loading ? (
        <div className="flex flex-col gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <OrderSkeleton key={i} />
          ))}
        </div>
      ) : orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
          <Package className="size-14 opacity-20 mb-3" />
          <p className="text-lg font-semibold">No orders found</p>
          <p className="text-sm mt-1">
            {filters.status
              ? `No ${filters.status.toLowerCase()} orders`
              : "You haven't placed any orders yet"}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {orders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onCancel={handleCancel}
              cancellingId={cancellingId}
              canCancel={canCancel}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div className="flex items-center justify-center gap-1.5 py-4">
          <button
            onClick={() => handlePageChange(filters.page - 1)}
            disabled={filters.page === 1}
            className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm text-gray-600 hover:border-orange-400 hover:text-orange-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter((p) => p === 1 || p === totalPages || Math.abs(p - filters.page) <= 1)
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
                    filters.page === p
                      ? "bg-orange-500 text-white font-medium"
                      : "border border-gray-200 text-gray-600 hover:border-orange-400 hover:text-orange-500"
                  }`}
                >
                  {p}
                </button>
              )
            )}

          <button
            onClick={() => handlePageChange(filters.page + 1)}
            disabled={filters.page === totalPages}
            className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm text-gray-600 hover:border-orange-400 hover:text-orange-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Orders;