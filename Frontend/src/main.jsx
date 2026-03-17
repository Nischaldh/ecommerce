import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { AuthProvider } from "./context/AuthContext.jsx";
import { Toaster } from "react-hot-toast";
import { store } from "./store/index.js";

import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <AuthProvider>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              success: {
                style: {
                  background: "#22c55e",
                  color: "#fff",
                },
              },
              error: {
                style: {
                  background: "#ef4444",
                  color: "#fff",
                },
              },
            }}
          />
          <App />
        </AuthProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);