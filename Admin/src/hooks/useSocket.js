import { useAdminAuth } from "@/context/AdminAuthContext";
import { env } from "@/lib/env";
import { useEffect, useRef, useState } from "react";

import toast from "react-hot-toast";
import { io } from "socket.io-client";



const SOCKET_URL = env.BACKEND_URL.replace("/api", "");

export const useAdminSocket = () => {
  const { admin, loading } = useAdminAuth();
  const socketRef = useRef(null);
  const [socket, setSocket] = useState(null);

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (loading || !admin) return;

    const token = localStorage.getItem("adminToken");
    if (!token) return;

    socketRef.current = io(SOCKET_URL, {
      auth: { token },
      transports: ["websocket"],
    });

    setSocket(socketRef.current);

    socketRef.current.on("connect", () => {
      console.log("Admin socket connected:", socketRef.current.id);
    });

    socketRef.current.on("notification", (data) => {
      console.log("Admin notification:", data);

      // store locally
      setNotifications((prev) => [data, ...prev]);

      // toast
      toast(data.title || "New notification", {
        icon: "🔔",
        duration: 4000,
      });
    });

    socketRef.current.on("disconnect", () => {
      console.log("Admin socket disconnected");
    });

    socketRef.current.on("connect_error", (err) => {
      console.log("Socket error:", err.message);
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, [admin, loading]);

  return {
    socket,
    notifications,
  };
};