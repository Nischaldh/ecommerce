import api from "../lib/api.js";

export const getAllProductsService = async (params) => {
  try {
    const res = await api.get("/products", { params });
    return res.data;
  } catch (err) {
    return { success: false, message: err.response?.data?.message || "Failed to fetch products" };
  }
};

export const getProductByIdService = async (id) => {
  try {
    const res = await api.get(`/products/${id}`);
    return res.data;
  } catch (err) {
    return { success: false, message: err.response?.data?.message || "Failed to fetch product" };
  }
};

export const createProductService = async (formData) => {
  try {
    const res = await api.post("/products", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (err) {
    return { success: false, message: err.response?.data?.message || "Failed to create product" };
  }
};

export const updateProductService = async (id, formData) => {
  try {
    const res = await api.put(`/products/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (err) {
    return { success: false, message: err.response?.data?.message || "Failed to update product" };
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