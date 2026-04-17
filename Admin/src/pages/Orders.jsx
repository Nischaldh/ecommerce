import { ShoppingBag } from "lucide-react";

import PageHeader from "../components/shared/PageHeader";
import SearchBar from "../components/shared/SearchBar";
import OrderTable from "../components/Orders/OrderTable";
import OrderDetailModal from "../components/Orders/OrderDetailModal";
import TableSkeleton from "../components/shared/TableSkeleton";
import Pagination from "../components/shared/Pagination";
import { useOrders } from "@/hooks/useOrder";

const statusTabs = [
  { label: "All", value: "" },
  { label: "Pending", value: "PENDING" },
  { label: "Completed", value: "COMPLETED" },
  { label: "Cancelled", value: "CANCELLED" },
];

const Orders = () => {
  const {
    orders, total, loading, page, totalPages,
    search, setSearch, statusFilter, setStatusFilter,
    selectedOrder, setSelectedOrder, setPage,
    openDetail,
  } = useOrders();

  return (
    <div className="flex flex-col gap-5">
      <PageHeader title="Orders" subtitle={`${total} total orders`} />

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <SearchBar value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="Search by order ID or buyer..." />
        </div>
        <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
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
      </div>

      {loading ? (
        <TableSkeleton rows={8} cols={7} />
      ) : orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
          <ShoppingBag className="size-12 opacity-20 mb-3" />
          <p className="font-semibold">No orders found</p>
        </div>
      ) : (
        <OrderTable
          orders={orders}
          onView={openDetail}
      
        />
      )}

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />

      {selectedOrder && (
        <OrderDetailModal
          data={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
};

export default Orders;