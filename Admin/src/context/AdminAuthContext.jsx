import { createContext, useContext, useEffect, useState } from "react";
import { getMeService } from "../services/auth.service";
import { loginService } from "../services/auth.service";
import toast from "react-hot-toast";

const AdminAuthContext = createContext(null);

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem("adminToken");
      if (!token) { setLoading(false); return; }

      const res = await getMeService();
      if (res.success) {
        setAdmin(res.admin);
      } else {
        // token invalid or expired
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminUser");
      }
      setLoading(false);
    };
    init();
  }, []);

  const login = async (email, password) => {
    const res = await loginService(email, password);
    if (res.success) {
      localStorage.setItem("adminToken", res.token);
      localStorage.setItem("adminUser", JSON.stringify(res.admin));
      setAdmin(res.admin);
      toast.success(`Welcome back, ${res.admin.name}`);
    } else {
      toast.error(res.message || "Login failed");
    }
    return res;
  };

  const logout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    setAdmin(null);
    toast.success("Logged out");
  };

  const isSuperAdmin = admin?.role === "super_admin";

  return (
    <AdminAuthContext.Provider value={{ admin, loading, login, logout, isSuperAdmin }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAdminAuth = () => {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error("useAdminAuth must be used inside AdminAuthProvider");
  return ctx;
};