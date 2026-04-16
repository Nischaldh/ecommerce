import api from "../lib/api.js";

export const getPayoutsService = async (params) => {
  try {
    const res = await api.get("/payouts", { params });
    return res.data;
  } catch (err) {
    return { success: false, message: err.response?.data?.message || "Failed to fetch payouts" };
  }
};

export const createPayoutService = async (data) => {
  try {
    const res = await api.post("/payouts", data);
    return res.data;
  } catch (err) {
    return { success: false, message: err.response?.data?.message || "Failed to create payout" };
  }
};

export const completePayoutService = async (id, payoutReference) => {
  try {
    const res = await api.patch(`/payouts/${id}/complete`, { payoutReference });
    return res.data;
  } catch (err) {
    return { success: false, message: err.response?.data?.message || "Failed to complete payout" };
  }
};

export const failPayoutService = async (id, notes) => {
  try {
    const res = await api.patch(`/payouts/${id}/fail`, { notes });
    return res.data;
  } catch (err) {
    return { success: false, message: err.response?.data?.message || "Failed to fail payout" };
  }
};

export const getSellerBalancesService = async (params) => {
  try {
    const res = await api.get("/balances", { params });
    return res.data;
  } catch (err) {
    return { success: false, message: err.response?.data?.message || "Failed to fetch balances" };
  }
};

export const getSellerPaymentInfoService = async (sellerId) => {
  try {
    const res = await api.get(`/sellers/${sellerId}/payment-info`);
    return res.data;
  } catch (err) {
    return { success: false, message: err.response?.data?.message || "Failed to fetch payment info" };
  }
};

export const verifySellerPaymentInfoService = async (sellerId) => {
  try {
    const res = await api.patch(`/sellers/${sellerId}/payment-info/verify`);
    return res.data;
  } catch (err) {
    return { success: false, message: err.response?.data?.message || "Failed to verify payment info" };
  }
};