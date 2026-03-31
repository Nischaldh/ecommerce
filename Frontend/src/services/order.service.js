import api from "../lib/api.js";

export const placeOrderService = async (data) => {
  try {
    const res = await api.post("/orders", data);
    return res.data;
  } catch (err) {
    return { success: false, message: err.response?.data?.message || "Failed to place order" };
  }
};

export const getMyOrdersService = async (params) => {
  try {
    const res = await api.get("/orders",{params});
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

export const cancelOrderService = async (id) => {
  try {
    const res = await api.patch(`/orders/${id}/cancel`);
    return res.data;
  } catch (err) {
    return { success: false, message: err.response?.data?.message || "Failed to cancel order" };
  }
};

export const getSellerOrderItemsService = async () => {
  try {
    const res = await api.get("/orders/seller/items");
    return res.data;
  } catch (err) {
    return { success: false, message: err.response?.data?.message || "Failed to fetch seller orders" };
  }
};

export const updateOrderItemStatusService = async (itemId, status) => {
  try {
    const res = await api.patch(`/orders/seller/items/${itemId}/status`, { status });
    return res.data;
  } catch (err) {
    return { success: false, message: err.response?.data?.message || "Failed to update status" };
  }
};

export const updateDeliveryService = async (itemId, data) => {
  try {
    const res = await api.patch(`/orders/seller/items/${itemId}/delivery`, data);
    return res.data;
  } catch (err) {
    return { success: false, message: err.response?.data?.message || "Failed to update delivery" };
  }
};