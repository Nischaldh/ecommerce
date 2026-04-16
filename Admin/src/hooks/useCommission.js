/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import {
  getCommissionsService,
  confirmCommissionsService,
  releaseCommissionsService,
} from "../services/commission.service";
import { statusTabs } from "@/constants/constants";



export const useCommissions = () => {
  const [commissions, setCommissions] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const [actionLoading, setActionLoading] = useState(null);

  const totalPages = Math.ceil(total / 20);

  const fetch = useCallback(async (params) => {
    setLoading(true);
    const res = await getCommissionsService(params);
    if (res.success) {
      setCommissions(res.commissions);
      setTotal(res.total);
    } else {
      toast.error(res.message || "Failed to load commissions");
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetch({
      page,
      status: statusFilter || undefined,
    });
  }, [page, statusFilter, fetch]);

  const handleConfirm = useCallback(async (orderId) => {
    setActionLoading(orderId);
    const res = await confirmCommissionsService(orderId);
    if (res.success) {
      toast.success(`Confirmed ${res.confirmed} commission${res.confirmed !== 1 ? "s" : ""}`);
      // update local status
      setCommissions((prev) =>
        prev.map((c) =>
          c.order_id === orderId && c.status === "PENDING"
            ? { ...c, status: "CONFIRMED" }
            : c,
        ),
      );
    } else {
      toast.error(res.message);
    }
    setActionLoading(null);
  }, []);

  const handleRelease = useCallback(async (orderId) => {
    setActionLoading(orderId);
    const res = await releaseCommissionsService(orderId);
    if (res.success) {
      toast.success(`Released ${res.released} commission${res.released !== 1 ? "s" : ""}`);
      setCommissions((prev) =>
        prev.map((c) =>
          c.order_id === orderId && c.status === "CONFIRMED"
            ? { ...c, status: "RELEASED" }
            : c,
        ),
      );
    } else {
      toast.error(res.message);
    }
    setActionLoading(null);
  }, []);

  return {
    commissions, total, loading,
    page, setPage, totalPages,
    statusFilter, setStatusFilter,
    actionLoading,
    statusTabs,
    handleConfirm, handleRelease,
  };
};