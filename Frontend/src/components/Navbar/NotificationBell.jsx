import { Bell } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

import { timeAgo } from "@/lib/formatedDate";
import { useNotifications } from "@/hooks/notifications/useNotification";
import { useAuth } from "@/hooks/auth/useAuth";

const NotificationBell = () => {
  const { user } = useAuth();
  const { notifications, unreadCount, markAllRead, markOneRead } = useNotifications();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const getNotificationLink = (n) => {
    if (!n.order_id) return null;
    if (user?.role === "seller") return `/profile?tab=orders`;
    return `/orders/${n.order_id}`;
  };

  return (
    <div className="relative top-0.5" ref={ref}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="relative p-1 text-gray-600 hover:text-orange-500 transition-colors"
      >
        <Bell className="size-6" />
        {unreadCount > 0 && (
          <span className="absolute -bottom-0.5 -right-0.5 bg-orange-500 text-white text-[10px] font-bold min-w-4 h-4 rounded-full flex items-center justify-center px-0.5">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <>
          {/* Mobile backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/20 sm:hidden"
            onClick={() => setOpen(false)}
          />

          {/* Dropdown — fixed on mobile, absolute on desktop */}
          <div
            className="
            fixed left-4 right-4 top-16 z-50
            sm:absolute sm:left-auto sm:right-0 sm:top-full sm:mt-2 sm:w-80
            bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden
          "
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
              <h3 className="font-semibold text-gray-900 text-sm">
                Notifications
              </h3>
              {unreadCount > 0 && (
                <button
                  onClick={markAllRead}
                  className="text-xs text-orange-500 hover:text-orange-600 transition-colors"
                >
                  Mark all read
                </button>
              )}
            </div>

            {/* List */}
            <div className="max-h-[60vh] sm:max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 text-gray-400">
                  <Bell className="size-8 opacity-20 mb-2" />
                  <p className="text-sm">No notifications yet</p>
                </div>
              ) : (
                notifications.map((n) => {
                  const link = getNotificationLink(n);
                  return (
                    <div
                      key={n.id}
                      onClick={() => markOneRead(n.id)}
                      className={`px-4 py-3 border-b border-gray-50 transition-colors ${
                        !n.isRead ? "bg-orange-50/50" : ""
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <p
                            className={`text-sm font-medium ${
                              !n.isRead ? "text-gray-900" : "text-gray-600"
                            }`}
                          >
                            {n.title}
                          </p>
                          <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">
                            {n.message}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <p className="text-[11px] text-gray-400">
                              {timeAgo(n.createdAt)}
                            </p>
                            {link && (
                              <Link
                                to={link}
                                onClick={() => setOpen(false)}
                                className="text-[11px] text-orange-500 hover:underline"
                              >
                                View order
                              </Link>
                            )}
                          </div>
                        </div>
                        {!n.isRead && (
                          <div className="size-2 rounded-full bg-orange-500 shrink-0 mt-1" />
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationBell;
