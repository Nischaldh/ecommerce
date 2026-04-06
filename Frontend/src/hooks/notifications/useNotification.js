import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import {
  markAllRead as markAllReadAction,
  markOneRead as markOneReadAction,
  setNotifications,
} from "../../store/slices/notificationSlice";
import { getNotificationsService, markAllReadService, markOneReadService } from "@/services/notification.service";


export const useNotifications = () => {
  const dispatch = useDispatch();
  const { notifications, unreadCount } = useSelector((s) => s.notifications);

  const fetchNotifications = useCallback(async () => {
    const res = await getNotificationsService();
    if (res.success) {
      dispatch(setNotifications({
        notifications: res.notifications,
        unreadCount: res.unreadCount,
      }));
    }
  }, [dispatch]);

  useEffect(() => {
    fetchNotifications();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const markAllRead = useCallback(async () => {
    await markAllReadService();
    dispatch(markAllReadAction());
  }, [dispatch]);

  const markOneRead = useCallback(async (id) => {
    await markOneReadService(id);
    dispatch(markOneReadAction(id));
  }, [dispatch]);

  return {
    notifications,
    unreadCount,
    fetchNotifications,
    markAllRead,
    markOneRead,
  };
};