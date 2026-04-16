import { useAdminAuth } from "../../context/AdminAuthContext";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const { admin, loading } = useAdminAuth();
  if (loading) return null;
  if (admin) return <Navigate to="/" replace />;
  return children;
};

export default PublicRoute;