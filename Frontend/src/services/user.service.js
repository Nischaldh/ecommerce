import api from "../lib/api.js";

export const updateProfileService = async (data) => {
  try {
    const res = await api.put("/users/profile", data);
    return res.data;
  } catch (err) {
    return { success: false, message: err.response?.data?.message || "Failed to update profile" };
  }
};

export const uploadProfilePicService = async (formData) => {
  try {
    const res = await api.put("/users/profile/pic", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (err) {
    return { success: false, message: err.response?.data?.message || "Failed to upload picture" };
  }
};

export const verifyEmailChangeService = async (otp) => {
  try {
    const res = await api.post("/users/profile/verify-email", { otp });
    return res.data;
  } catch (err) {
    return { success: false, message: err.response?.data?.message || "Failed to verify email" };
  }
};