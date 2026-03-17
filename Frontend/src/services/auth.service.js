import api from "../lib/api.js";

export const loginService = async (credentials) => {
  try {
    const res = await api.post("/auth/login", credentials);
    return res.data;
  } catch (err) {
    return { success: false, message: err.response?.data?.message || "Login failed" };
  }
};

export const signupService = async (data) => {
  try {
    const res = await api.post("/auth/signup", data);
    return res.data;
  } catch (err) {
    return { success: false, message: err.response?.data?.message || "Signup failed" };
  }
};

export const verifyOtpService = async (data) => {
  try {
    const res = await api.post("/auth/user/verify", data);
    return res.data;
  } catch (err) {
    return { success: false, message: err.response?.data?.message || "OTP verification failed" };
  }
};

export const generateOtpService = async (email) => {
  try {
    const res = await api.post("/auth/otp/generate", { email });
    return res.data;
  } catch (err) {
    return { success: false, message: err.response?.data?.message || "Failed to send OTP" };
  }
};

export const resetPasswordService = async (data) => {
  try {
    const res = await api.post("/auth/password/reset", data);
    return res.data;
  } catch (err) {
    return { success: false, message: err.response?.data?.message || "Password reset failed" };
  }
};


export const logoutService = () => {
  localStorage.removeItem("token");
};


export const getUserFromToken = () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;
   
    const payload = JSON.parse(atob(token.split(".")[1]));
    if (payload.exp * 1000 < Date.now()) {
      localStorage.removeItem("token");
      return null;
    }
    return payload; 
  } catch {
    localStorage.removeItem("token");
    return null;
  }
};

export const getCurrentUserService = async () => {
  try {
    const res = await api.get("/users/me");
    return res.data;
  } catch (err) {
    return { success: false, message: err.response?.data?.message || "Failed to fetch user" };
  }
};