import api from "../lib/api.js";

export const initiatePaymentService = async (data) => {
  try {
    const res = await api.post("/payments/initiate", data);
    return res.data;
  } catch (err) {
    return { success: false, message: err.response?.data?.message || "Failed to initiate payment" };
  }
};

export const requestRefundService = async (data) => {
  try {
    const res = await api.post("/payments/refund", data);
    return res.data;
  } catch (err) {
    return { success: false, message: err.response?.data?.message || "Failed to request refund" };
  }
};

export const getMyRefundsService = async () => {
  try {
    const res = await api.get("/payments/refunds");
    return res.data;
  } catch (err) {
    return { success: false, message: err.response?.data?.message || "Failed to fetch refunds" };
  }
};

export const getMyBalanceService = async () => {
  try {
    const res = await api.get("/payments/balance");
    return res.data;
  } catch (err) {
    return { success: false, message: err.response?.data?.message || "Failed to fetch balance" };
  }
};

export const getMyPaymentInfoService = async () => {
  try {
    const res = await api.get("/payments/payment-info");
    return res.data;
  } catch (err) {
    return { success: false, message: err.response?.data?.message || "Failed to fetch payment info" };
  }
};

export const upsertPaymentInfoService = async (data) => {
  try {
    const res = await api.post("/payments/payment-info", data);
    return res.data;
  } catch (err) {
    return { success: false, message: err.response?.data?.message || "Failed to save payment info" };
  }
};

export const getSellerDashboardService = async () => {
  try {
    const res = await api.get("/payments/dashboard");
    return res.data;
  } catch (err) {
    return { success: false, message: err.response?.data?.message || "Failed to fetch dashboard" };
  }
};

export const getSellerCommissionsService = async (params) => {
  try {
    const res = await api.get("/payments/commissions", { params });
    return res.data;
  } catch (err) {
    return { success: false, message: err.response?.data?.message || "Failed to fetch commissions" };
  }
};
