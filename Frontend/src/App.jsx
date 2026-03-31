import React from "react";
import NavBar from "./components/Navbar/NavBar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/AuthPages/Signup";
import Login from "./pages/AuthPages/Login";
import ForgotPassword from "./pages/AuthPages/ForgotPassword";
import VerifyEmail from "./pages/AuthPages/VerifyEmail";
import Products from "./pages/Products";
import Footer from "./components/Footer";
import ProductDetail from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import PublicRoute from "./components/Routing/PublicRoute";
import ProtectedRoute from "./components/Routing/ProtectedRoute";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import OrderDetail from "./pages/OrderDetail";
import Sellers from "./pages/Sellers";
import SellerDetail from "./pages/SellerDetail";

const App = () => {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <NavBar />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        {/* Auth Route */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              {" "}
              <Signup />
            </PublicRoute>
          }
        />

        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders/:id"
          element={
            <ProtectedRoute>
              <OrderDetail />
            </ProtectedRoute>
          }
        />
        <Route path="/sellers" element={<Sellers />} />
        <Route path="/seller/:id" element={<SellerDetail />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
