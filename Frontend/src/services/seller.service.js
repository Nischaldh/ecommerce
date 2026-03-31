import api from "../lib/api.js";

export const getSellersService = async (params) => {
  try {
    const res = await api.get("/sellers", { params });
    return res.data;
  } catch (err) {
    return { success: false, message: err.response?.data?.message || "Failed to fetch sellers" };
  }
};

export const getSellerByIdService = async (id) => {
  try {
    const res = await api.get(`/sellers/${id}`);
    return res.data;
  } catch (err) {
    return { success: false, message: err.response?.data?.message || "Failed to fetch seller" };
  }
};

export const getSellerProductsService = async (id, params) => {
  try {
    const res = await api.get(`/sellers/${id}/products`, { params });
    return res.data;
  } catch (err) {
    return { success: false, message: err.response?.data?.message || "Failed to fetch seller products" };
  }
};