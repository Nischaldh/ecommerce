import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/auth/useAuth";

const SellerRoute = ({ children }) => {
  const { isAuthenticated, loading, user } = useAuth();

  if (loading) return null;

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (user?.role !== "seller") return <Navigate to="/" replace />;

  return children;
};

export default SellerRoute;