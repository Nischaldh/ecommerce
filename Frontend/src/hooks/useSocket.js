import { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { useDispatch } from "react-redux";
import { useAuth } from "./auth/useAuth";
import { addNotification } from "../store/slices/notificationSlice";
import toast from "react-hot-toast";
import { env } from "@/lib/env";

const SOCKET_URL = env.BACKEND_URL.replace("/api", "");

export const useSocket = () => {
  const { isAuthenticated } = useAuth();
  const dispatch = useDispatch();
  const socketRef = useRef(null);

  useEffect(() => {
    if (!isAuthenticated) return;

    const token = localStorage.getItem("token");
    if (!token) return;

    socketRef.current = io(SOCKET_URL, {
      auth: { token },
      transports: ["websocket"],
    });

    socketRef.current.on("connect", () => {
      console.log("Socket connected");
    });

    socketRef.current.on("notification", (data) => {
      dispatch(addNotification(data));
      
      
      toast(data.title, {
        icon: "🔔",
        duration: 4000,
      });
    });

    socketRef.current.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, [isAuthenticated, dispatch]);
};