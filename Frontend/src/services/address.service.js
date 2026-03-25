import api from "../lib/api.js";

export const getAddressesService = async () => {
  try {
    const res = await api.get("/addresses");
    return res.data;
  } catch (err) {
    return { success: false, message: err.response?.data?.message || "Failed to fetch addresses" };
  }
};

export const getAddressByIdService = async (id) => {
  try {
    const res = await api.get(`/addresses/${id}`);
    return res.data;
  } catch (err) {
    return { success: false, message: err.response?.data?.message || "Failed to fetch address" };
  }
};

export const createAddressService = async (data) => {
  try {
    const res = await api.post("/addresses", data);
    return res.data;
  } catch (err) {
    return { success: false, message: err.response?.data?.message || "Failed to create address" };
  }
};

export const updateAddressService = async (id, data) => {
  try {
    const res = await api.patch(`/addresses/${id}`, data);
    return res.data;
  } catch (err) {
    return { success: false, message: err.response?.data?.message || "Failed to update address" };
  }
};

export const deleteAddressService = async (id) => {
  try {
    const res = await api.delete(`/addresses/${id}`);
    return res.data;
  } catch (err) {
    return { success: false, message: err.response?.data?.message || "Failed to delete address" };
  }
};

export const setDefaultAddressService = async (id) => {
  try {
    const res = await api.patch(`/addresses/${id}/default`);
    return res.data;
  } catch (err) {
    return { success: false, message: err.response?.data?.message || "Failed to set default address" };
  }
};