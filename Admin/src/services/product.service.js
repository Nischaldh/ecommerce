import api from "../lib/api.js";

export const getProductsService = async (params) => {
  try {
    const res = await api.get("/products", { params });
    return res.data;
  } catch (err) {
    return { success: false, message: err.response?.data?.message || "Failed to fetch products" };
  }
};

export const deleteProductService = async (id) => {
  try {
    const res = await api.delete(`/products/${id}`);
    return res.data;
  } catch (err) {
    return { success: false, message: err.response?.data?.message || "Failed to delete product" };
  }
};