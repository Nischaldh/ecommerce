import api from "../lib/api.js";

export const getCommissionsService = async (params) => {
  try {
    const res = await api.get("/commissions", { params });
    return res.data;
  } catch (err) {
    return { success: false, message: err.response?.data?.message || "Failed to fetch commissions" };
  }
};

export const confirmCommissionsService = async (orderId) => {
  try {
    const res = await api.patch(`/orders/${orderId}/commissions/confirm`);
    return res.data;
  } catch (err) {
    return { success: false, message: err.response?.data?.message || "Failed to confirm commissions" };
  }
};

export const releaseCommissionsService = async (orderId) => {
  try {
    const res = await api.patch(`/orders/${orderId}/commissions/release`);
    return res.data;
  } catch (err) {
    return { success: false, message: err.response?.data?.message || "Failed to release commissions" };
  }
};