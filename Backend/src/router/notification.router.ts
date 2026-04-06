import Router from "@koa/router";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { getNotifications, markAllRead, markOneRead } from "../controller/notification.controller.js";


const notificationRouter = new Router({ prefix: "/notifications" });

notificationRouter.use(authMiddleware);
notificationRouter.get("/", getNotifications);
notificationRouter.patch("/", markAllRead);
notificationRouter.patch("/:id", markOneRead);

export default notificationRouter; 