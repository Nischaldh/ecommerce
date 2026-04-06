import { AppDataSource } from "../config/data-source.js";
import { Notification } from "../entity/Notification.js";
import { emitToUser } from "../lib/socket.js";
import { CreateNotificationInput } from "../types/notification.schema.js";

const notificationRepository = AppDataSource.getRepository(Notification);

export const createNotificationService = async (
  input: CreateNotificationInput,
): Promise<void> => {
  const notification = notificationRepository.create({
    user_id: input.userId,
    type: input.type,
    title: input.title,
    message: input.message,
    order_id: input.orderId ?? null,
  });

  const saved = await notificationRepository.save(notification);

  emitToUser(input.userId, "notification", {
    id: saved.id,
    type: saved.type,
    title: saved.title,
    message: saved.message,
    order_id: saved.order_id,
    isRead: saved.isRead,
    createdAt: saved.createdAt,
  });
};

export const getNotificationsService = async (
  userId: string,
): Promise<{ notifications: Notification[]; unreadCount: number }> => {
  const [notifications, unreadCount] = await Promise.all([
    notificationRepository.find({
      where: { user_id: userId },
      order: { createdAt: "DESC" },
      take: 30,
    }),
    notificationRepository.count({
      where: { user_id: userId, isRead: false },
    }),
  ]);

  return { notifications, unreadCount };
};

export const markAllReadService = async (userId: string): Promise<void> => {
  await notificationRepository.update(
    { user_id: userId, isRead: false },
    { isRead: true },
  );
};

export const markOneReadService = async (
  notificationId: string,
  userId: string,
): Promise<void> => {
  await notificationRepository.update(
    { id: notificationId, user_id: userId },
    { isRead: true },
  );
};
