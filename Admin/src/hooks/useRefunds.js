/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import {
  getRefundsService,
  approveRefundService,
  completeRefundService,
  rejectRefundService,
} from "../services/refund.service";

const statusTabs = [
  { label: "All",       value: "" },
  { label: "Requested", value: "REQUESTED" },
  { label: "Approved",  value: "APPROVED" },
  { label: "Completed", value: "COMPLETED" },
  { label: "Rejected",  value: "REJECTED" },
];

export const useRefunds = () => {
  const [refunds, setRefunds]     = useState([]);
  const [total, setTotal]         = useState(0);
  const [loading, setLoading]     = useState(true);
  const [page, setPage]           = useState(1);
  const [statusFilter, setStatusFilter] = useState("REQUESTED");
  const [submitting, setSubmitting] = useState(null);

  // modals
  const [approveModal, setApproveModal] = useState(null);
  const [completeModal, setCompleteModal] = useState(null);
  const [rejectModal, setRejectModal]   = useState(null);
  const [adminNotes, setAdminNotes]     = useState("");
  const [refundReference, setRefundReference] = useState("");

  const totalPages = Math.ceil(total / 20);

  const fetch = useCallback(async (params) => {
    setLoading(true);
    const res = await getRefundsService(params);
    if (res.success) { setRefunds(res.refunds); setTotal(res.total); }
    else toast.error(res.message || "Failed to load refunds");
    setLoading(false);
  }, []);

  useEffect(() => {
    fetch({ page, status: statusFilter || undefined });
  }, [page, statusFilter, fetch]);

  const handleApprove = useCallback(async () => {
    setSubmitting(approveModal);
    const res = await approveRefundService(approveModal, adminNotes);
    if (res.success) {
      setRefunds((prev) =>
        prev.map((r) => r.id === approveModal ? { ...r, status: "APPROVED" } : r),
      );
      setApproveModal(null);
      setAdminNotes("");
      toast.success("Refund approved");
    } else {
      toast.error(res.message);
    }
    setSubmitting(null);
  }, [approveModal, adminNotes]);

  const handleComplete = useCallback(async () => {
    setSubmitting(completeModal);
    const res = await completeRefundService(completeModal, refundReference || undefined);
    if (res.success) {
      setRefunds((prev) =>
        prev.map((r) => r.id === completeModal ? { ...r, status: "COMPLETED" } : r),
      );
      setCompleteModal(null);
      setRefundReference("");
      toast.success("Refund completed");
    } else {
      toast.error(res.message);
    }
    setSubmitting(null);
  }, [completeModal, refundReference]);

  const handleReject = useCallback(async () => {
    if (!adminNotes.trim()) { toast.error("Please provide a reason for rejection"); return; }
    setSubmitting(rejectModal);
    const res = await rejectRefundService(rejectModal, adminNotes);
    if (res.success) {
      setRefunds((prev) =>
        prev.map((r) => r.id === rejectModal ? { ...r, status: "REJECTED" } : r),
      );
      setRejectModal(null);
      setAdminNotes("");
      toast.success("Refund rejected");
    } else {
      toast.error(res.message);
    }
    setSubmitting(null);
  }, [rejectModal, adminNotes]);

  return {
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
  };
};