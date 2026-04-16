import { Navigate } from "react-router-dom";

import toast from "react-hot-toast";
import { useEffect } from "react";
import { useAdminAuth } from "../../context/AdminAuthContext";

const ProtectedRoute = ({ children }) => {
  const { admin, loading } = useAdminAuth();
  useEffect(() => {
    if (!loading && !admin) {
      toast.error("Please Login First");
    }
  }, [loading, admin]);

  if (loading) return null;

  if (!admin) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
