/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import {
  getPayoutsService,
  createPayoutService,
  completePayoutService,
  failPayoutService,
  getSellerBalancesService,
  verifySellerPaymentInfoService,
  getSellerPaymentInfoService,
} from "../services/payout.service";

const statusTabs = [
  { label: "All",        value: "" },
  { label: "Processing", value: "PROCESSING" },
  { label: "Completed",  value: "COMPLETED" },
  { label: "Failed",     value: "FAILED" },
];

export const usePayouts = () => {
  const [payouts, setPayouts]         = useState([]);
  const [balances, setBalances]       = useState([]);
  const [total, setTotal]             = useState(0);
  const [loading, setLoading]         = useState(true);
  const [balancesLoading, setBalancesLoading] = useState(true);
  const [page, setPage]               = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const [actionLoading ] = useState(null);

  // create payout modal
  const [createModal, setCreateModal] = useState(false);
  const [createForm, setCreateForm]   = useState({ sellerId: "", amount: "", method: "KHALTI", notes: "" });
  const [createErrors, setCreateErrors] = useState({});
  const [creating, setCreating]       = useState(false);
  const [sellerPaymentInfo, setSellerPaymentInfo] = useState(null);

  // complete/fail modals
  const [completeModal, setCompleteModal] = useState(null); // payoutId
  const [failModal, setFailModal]         = useState(null); // payoutId
  const [referenceInput, setReferenceInput] = useState("");
  const [notesInput, setNotesInput]         = useState("");
  const [submitting, setSubmitting]         = useState(false);

  const totalPages = Math.ceil(total / 20);

  const fetchPayouts = useCallback(async (params) => {
    setLoading(true);
    const res = await getPayoutsService(params);
    if (res.success) { setPayouts(res.payouts); setTotal(res.total); }
    else toast.error(res.message || "Failed to load payouts");
    setLoading(false);
  }, []);

  const fetchBalances = useCallback(async () => {
    setBalancesLoading(true);
    const res = await getSellerBalancesService();
    if (res.success) setBalances(res.balances);
    setBalancesLoading(false);
  }, []);

  useEffect(() => {
    fetchPayouts({ page, status: statusFilter || undefined });
  }, [page, statusFilter, fetchPayouts]);

  useEffect(() => {
    fetchBalances();
  }, [fetchBalances]);

  // load seller payment info when seller selected
  useEffect(() => {
    if (!createForm.sellerId) { setSellerPaymentInfo(null); return; }
    const load = async () => {
      const res = await getSellerPaymentInfoService(createForm.sellerId);
      if (res.success) setSellerPaymentInfo(res.paymentInfo);
    };
    load();
  }, [createForm.sellerId]);

  const handleCreate = useCallback(async (e) => {
    e.preventDefault();
    const validateCreate = () => {
      const errs = {};
      if (!createForm.sellerId) errs.sellerId = "Select a seller";
      if (!createForm.amount || isNaN(createForm.amount) || Number(createForm.amount) <= 0)
        errs.amount = "Enter a valid amount";
      return errs;
    };
    const errs = validateCreate();
    if (Object.keys(errs).length > 0) { setCreateErrors(errs); return; }

    setCreating(true);
    const res = await createPayoutService({
      sellerId: createForm.sellerId,
      amount: Number(createForm.amount),
      method: createForm.method,
      notes: createForm.notes || undefined,
    });
    if (res.success) {
      setPayouts((prev) => [res.payout, ...prev]);
      setCreateModal(false);
      setCreateForm({ sellerId: "", amount: "", method: "KHALTI", notes: "" });
      toast.success("Payout created");
    } else {
      toast.error(res.message);
    }
    setCreating(false);
  }, [createForm]);

  const handleComplete = useCallback(async () => {
    setSubmitting(true);
    const res = await completePayoutService(completeModal, referenceInput || undefined);
    if (res.success) {
      setPayouts((prev) =>
        prev.map((p) => p.id === completeModal ? { ...p, status: "COMPLETED", payoutReference: referenceInput } : p),
      );
      setCompleteModal(null);
      setReferenceInput("");
      toast.success("Payout marked as completed");
    } else {
      toast.error(res.message);
    }
    setSubmitting(false);
  }, [completeModal, referenceInput]);

  const handleFail = useCallback(async () => {
    if (!notesInput.trim()) { toast.error("Please provide a reason"); return; }
    setSubmitting(true);
    const res = await failPayoutService(failModal, notesInput);
    if (res.success) {
      setPayouts((prev) =>
        prev.map((p) => p.id === failModal ? { ...p, status: "FAILED" } : p),
      );
      setFailModal(null);
      setNotesInput("");
      toast.success("Payout marked as failed");
    } else {
      toast.error(res.message);
    }
    setSubmitting(false);
  }, [failModal, notesInput]);

  const handleVerifyPaymentInfo = useCallback(async (sellerId) => {
    const res = await verifySellerPaymentInfoService(sellerId);
    if (res.success) {
      setSellerPaymentInfo(res.paymentInfo);
      toast.success("Payment info verified");
    } else {
      toast.error(res.message);
    }
  }, []);

  const handleCreateFormChange = (field) => (e) => {
    setCreateForm((prev) => ({ ...prev, [field]: e.target.value }));
    setCreateErrors((prev) => ({ ...prev, [field]: "" }));
  };

  return {
    payouts, balances, total, loading, balancesLoading,
    page, setPage, totalPages,
    statusFilter, setStatusFilter, statusTabs,
    actionLoading,
    // create
    createModal, setCreateModal,
    createForm, createErrors, creating,
    sellerPaymentInfo,
    handleCreate, handleCreateFormChange, handleVerifyPaymentInfo,
    // complete
    completeModal, setCompleteModal,
    referenceInput, setReferenceInput,
    // fail
    failModal, setFailModal,
    notesInput, setNotesInput,
    submitting,
    handleComplete, handleFail,
  };
};