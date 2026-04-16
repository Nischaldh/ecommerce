import api from "../lib/api.js";

export const getRefundsService = async (params) => {
  try {
    const res = await api.get("/refunds", { params });
    return res.data;
  } catch (err) {
    return { success: false, message: err.response?.data?.message || "Failed to fetch refunds" };
  }
};

export const approveRefundService = async (id, adminNotes) => {
  try {
    const res = await api.patch(`/refunds/${id}/approve`, { adminNotes });
    return res.data;
  } catch (err) {
    return { success: false, message: err.response?.data?.message || "Failed to approve refund" };
  }
};

export const completeRefundService = async (id, refundReference) => {
  try {
    const res = await api.patch(`/refunds/${id}/complete`, { refundReference });
    return res.data;
  } catch (err) {
    return { success: false, message: err.response?.data?.message || "Failed to complete refund" };
  }
};

export const rejectRefundService = async (id, adminNotes) => {
  try {
    const res = await api.patch(`/refunds/${id}/reject`, { adminNotes });
    return res.data;
  } catch (err) {
    return { success: false, message: err.response?.data?.message || "Failed to reject refund" };
  }
};