import api from "../lib/api.js";

export const getUsersService = async (params) => {
  try {
    const res = await api.get("/users", { params });
    return res.data;
  } catch (err) {
    return { success: false, message: err.response?.data?.message || "Failed to fetch users" };
  }
};

export const getUserByIdService = async (id) => {
  try {
    const res = await api.get(`/users/${id}`);
    return res.data;
  } catch (err) {
    return { success: false, message: err.response?.data?.message || "Failed to fetch user" };
  }
};

export const suspendUserService = async (id) => {
  try {
    const res = await api.patch(`/users/${id}/suspend`);
    return res.data;
  } catch (err) {
    return { success: false, message: err.response?.data?.message || "Failed to suspend user" };
  }
};

export const unsuspendUserService = async (id) => {
  try {
    const res = await api.patch(`/users/${id}/unsuspend`);
    return res.data;
  } catch (err) {
    return { success: false, message: err.response?.data?.message || "Failed to unsuspend user" };
  }
};

export const deleteUserService = async (id) => {
  try {
    const res = await api.delete(`/users/${id}`);
    return res.data;
  } catch (err) {
    return { success: false, message: err.response?.data?.message || "Failed to delete user" };
  }
};