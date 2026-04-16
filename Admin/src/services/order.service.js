import api from "../lib/api.js";

export const getOrdersService = async (params) => {
  try {
    const res = await api.get("/orders", { params });
    return res.data;
  } catch (err) {
    return { success: false, message: err.response?.data?.message || "Failed to fetch orders" };
  }
};

export const getOrderByIdService = async (id) => {
  try {
    const res = await api.get(`/orders/${id}`);
    return res.data;
  } catch (err) {
    return { success: false, message: err.response?.data?.message || "Failed to fetch order" };
  }
};