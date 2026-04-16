/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import { getOrdersService, getOrderByIdService } from "../services/order.service";
import { confirmCommissionsService, releaseCommissionsService } from "../services/commission.service";
import { useDebounce } from "./useDebounce";

export const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(null);

  const debouncedSearch = useDebounce(search, 500);
  const totalPages = Math.ceil(total / 20);

  const fetch = useCallback(async (params) => {
    setLoading(true);
    const res = await getOrdersService(params);
    if (res.success) { setOrders(res.orders); setTotal(res.total); }
    else toast.error(res.message || "Failed to load orders");
    setLoading(false);
  }, []);

  useEffect(() => {
    fetch({
      page,
      search: debouncedSearch || undefined,
      status: statusFilter || undefined,
    });
  }, [page, debouncedSearch, statusFilter, fetch]);

  const openDetail = useCallback(async (id) => {
    setDetailLoading(true);
    const res = await getOrderByIdService(id);
    if (res.success) setSelectedOrder(res);
    else toast.error(res.message || "Failed to load order");
    setDetailLoading(false);
  }, []);

  const handleConfirmCommissions = useCallback(async (orderId) => {
    setActionLoading(orderId);
    const res = await confirmCommissionsService(orderId);
    if (res.success) toast.success(`Confirmed ${res.confirmed} commissions`);
    else toast.error(res.message);
    setActionLoading(null);
  }, []);

  const handleReleaseCommissions = useCallback(async (orderId) => {
    setActionLoading(orderId);
    const res = await releaseCommissionsService(orderId);
    if (res.success) toast.success(`Released ${res.released} commissions`);
    else toast.error(res.message);
    setActionLoading(null);
  }, []);

  return {
    orders, total, loading, page, totalPages,
    search, setSearch, statusFilter, setStatusFilter,
    selectedOrder, setSelectedOrder, detailLoading, actionLoading, setPage,
    openDetail, handleConfirmCommissions, handleReleaseCommissions,
  };
};