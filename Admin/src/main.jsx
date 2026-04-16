import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AdminAuthProvider } from "./context/AdminAuthContext.jsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AdminAuthProvider>
        <Toaster position="top-right" reverseOrder={false} />
        <App />
      </AdminAuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
