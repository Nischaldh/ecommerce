import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  generateOtpService,
  getCurrentUserService,
  getUserFromToken,
  loginService,
  logoutService,
  resetPasswordService,
  signupService,
  verifyOtpService,
} from "../services/auth.service";
import { useDispatch } from "react-redux";
import { getCartService } from "@/services/cart.service";
import { setCart } from "@/store/slices/cartSlice";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const initAuth = async () => {
      const payload = getUserFromToken();
      if (payload) {
        setUser({ id: payload.id, email: payload.email, role: payload.role });
        setIsAuthenticated(true);

        const res = await getCurrentUserService();
        if (res.success) {
          setUser(res.user);
          const cartRes = await getCartService();
          if (cartRes.success && cartRes.cart) {
            dispatch(setCart(cartRes.cart));
          }
        } else {
          logoutService();
          setUser(null);
          setIsAuthenticated(false);
        }
      }
      setLoading(false);
    };
    initAuth();
  }, [dispatch]);

  const login = async (credentials) => {
    const res = await loginService(credentials);
    if (res.token) {
      localStorage.setItem("token", res.token);
      setUser(res.user);
      setIsAuthenticated(true);
      const cartRes = await getCartService();
      if (cartRes.success && cartRes.cart) {
        dispatch(setCart(cartRes.cart));
      }

      toast.success("Welcome back!");
    } else {
      toast.error(res.message || "Login failed");
    }
    return res;
  };

  const signup = async (data) => {
    const res = await signupService(data);
    if (res.success) {
      toast.success("OTP sent to your email!");
    } else {
      toast.error(res.message || "Signup failed");
    }
    return res;
  };

  // verify OTP
  const verifyOtp = async (data) => {
    const res = await verifyOtpService(data);
    if (res.success) {
      localStorage.setItem("token", res.token);
      setUser(res.data);
      setIsAuthenticated(true);
      const cartRes = await getCartService();
      if (cartRes.success && cartRes.cart) {
        dispatch(setCart(cartRes.cart));
      }

      toast.success("Email verified! Welcome aboard.");
    } else {
      toast.error(res.message || "OTP verification failed");
    }
    return res;
  };

  const generateOtp = async (email) => {
    const res = await generateOtpService(email);
    if (res.success) {
      toast.success("OTP sent to your email!");
    } else {
      toast.error(res.message || "Failed to send OTP");
    }
    return res;
  };

  const resetPassword = async (data) => {
    const res = await resetPasswordService(data);
    if (res.success) {
      toast.success("Password reset successfully!");
    } else {
      toast.error(res.message || "Password reset failed");
    }
    return res;
  };

  const getMe = async () => {
    const res = await getCurrentUserService();
    if (!res.success) {
      toast.error(res.message || "Error getting user Details");
    }
    setUser(res.user);
  };
  const logout = () => {
    logoutService();
    setUser(null);
    setIsAuthenticated(false);
    dispatch(setCart({ id: null, items: [] }));
    toast.success("Logged out successfully");
  };

  const updateUser = (updatedUser) => setUser(updatedUser);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        login,
        signup,
        verifyOtp,
        generateOtp,
        resetPassword,
        logout,
        updateUser,
        getMe,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
