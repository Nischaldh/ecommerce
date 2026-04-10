import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { useDebounce } from "../useDebounce";
import { statusTabs } from "@/constants/constants";
import { useOrders } from "./useOrder";
import { getEffectiveOrderStatus } from "@/lib/orderStatus";

export const useOrdersPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    orders,
    total,
    loading,
    filters,
    fetchOrders,
    cancelOrder,
    applyFilters,
    changePage,
  } = useOrders();

  const [searchInput, setSearchInput] = useState("");
  const [cancellingId, setCancellingId] = useState(null);
  const debouncedSearch = useDebounce(searchInput, 500);

  const pageSize = filters.pageSize || 10;
  const totalPages = Math.ceil(total / pageSize);

  useEffect(() => {
    const status = searchParams.get("status") || "";
    const page = Number(searchParams.get("page")) || 1;
    applyFilters({ status, page });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const params = {};
    if (filters.status) params.status = filters.status;
    if (filters.page > 1) params.page = filters.page;
    setSearchParams(params, { replace: true });
    fetchOrders();
  }, [filters]); // eslint-disable-line react-hooks/exhaustive-deps

  const filteredOrders = orders.filter((order) => {
    if (!debouncedSearch) return true;
    const search = debouncedSearch.toLowerCase();
    const matchesId = order.id.toLowerCase().includes(search);
    const matchesProduct = order.items?.some((item) =>
      item.productName?.toLowerCase().includes(search),
    );
    return matchesId || matchesProduct;
  });

  const handleStatusFilter = (status) => {
    applyFilters({ status, page: 1 });
  };

  const handlePageChange = (page) => {
    changePage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancel = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;
    setCancellingId(orderId);
    await cancelOrder(orderId);
    setCancellingId(null);
  };

  const canCancel = (order) => {
    if (order.status !== "PENDING") return false;

    const effective = getEffectiveOrderStatus(order);
    return effective !== "SHIPPED" && effective !== "COMPLETED";
  };

  const canRequestRefund = (order) => {
    if (!order) return false;
    if (order.paymentStatus !== "PAID") return false;
    if (order.status === "CANCELLED") return false;
    if (order.refundStatus) return false;

    
    const paid = new Date(order.updatedAt);
    const daysSince = (Date.now() - paid.getTime()) / (1000 * 60 * 60 * 24);
    return daysSince <= 14;
  };

  const getRefundLabel = (status) => {
    const map = {
      REQUESTED: {
        label: "Refund Requested",
        color: "text-yellow-600 bg-yellow-50 border-yellow-200",
      },
      APPROVED: {
        label: "Refund Approved",
        color: "text-blue-600 bg-blue-50 border-blue-200",
      },
      COMPLETED: {
        label: "Refund Completed",
        color: "text-green-600 bg-green-50 border-green-200",
      },
      REJECTED: {
        label: "Refund Rejected",
        color: "text-red-600 bg-red-50 border-red-200",
      },
    };
    return map[status] ?? null;
  };

  return {
    orders: filteredOrders,
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
    canRequestRefund,
    getRefundLabel,
  };
};
