import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Commissions from "./pages/Commissions";
import Payouts from "./pages/Payouts";
import Refunds from "./pages/Refunds";
import Admins from "./pages/Admins";
import Login from "./pages/Login";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import PublicRoute from "./components/Routing/PublicRoute";
import AdminLayout from "./components/Layouts/AdminLayout";
import { TooltipProvider } from "./components/ui/tooltip";


const App = () => {
  return (
    <TooltipProvider>

    <Routes>
      <Route path="/login" element={
        <PublicRoute><Login /></PublicRoute>
      } />

      <Route path="/" element={
        <ProtectedRoute><AdminLayout /></ProtectedRoute>
      }>
        <Route index element={<Dashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="products" element={<Products />} />
        <Route path="orders" element={<Orders />} />
        <Route path="commissions" element={<Commissions />} />
        <Route path="payouts" element={<Payouts />} />
        <Route path="refunds" element={<Refunds />} />
        <Route path="admins" element={<Admins />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
     </TooltipProvider>
  );
};

export default App;