import api from "../lib/api.js";

export const loginService = async (email, password) => {
  try {
    const res = await api.post("/login", { email, password });
    return res.data;
  } catch (err) {
    return { success: false, message: err.response?.data?.message || "Login failed" };
  }
};

export const getMeService = async () => {
  try {
    const res = await api.get("/me");
    return res.data;
  } catch (err) {
    return { success: false, message: err.response?.data?.message || "Failed to fetch admin" };
  }
};

export const createAdminService = async (data) => {
  try {
    const res = await api.post("/", data);
    return res.data;
  } catch (err) {
    return { success: false, message: err.response?.data?.message || "Failed to create admin" };
  }
};

export const deactivateAdminService = async (id) => {
  try {
    const res = await api.patch(`/${id}/deactivate`);
    return res.data;
  } catch (err) {
    return { success: false, message: err.response?.data?.message || "Failed to deactivate admin" };
  }
};