import api from "../lib/api.js";

export const getNotificationsService = async () => {
  try {
    const res = await api.get("/notifications");
    return res.data;
  } catch (err) {
    return { success: false, message: err.response?.data?.message || "Failed to fetch notifications" };
  }
};

export const markAllReadService = async () => {
  try {
    const res = await api.patch("/notifications");
    return res.data;
  } catch (err) {
    return { success: false, message: err.response?.data?.message || "Failed to mark read" };
  }
};

export const markOneReadService = async (id) => {
  try {
    const res = await api.patch(`/notifications/${id}`);
    return res.data;
  } catch (err) {
    return { success: false, message: err.response?.data?.message || "Failed to mark read" };
  }
};