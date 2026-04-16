import api from "../lib/api.js";

export const getDashboardService = async () => {
  try {
    const res = await api.get("/dashboard");
    return res.data;
  } catch (err) {
    return { success: false, message: err.response?.data?.message || "Failed to fetch dashboard" };
  }
};