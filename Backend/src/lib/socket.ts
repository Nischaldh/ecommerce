import { Server, Socket } from "socket.io";
import { Server as HttpServer } from "http";

import env from "./env.js";
import { verifyToken } from "./jwt.js";
import { verifyAdminToken } from "./adminAuth.js";
import { JwtPayload } from "../types/global.types.js";
import { AdminJwtPayload } from "../types/admin.schema.js";

let io: Server;

type SocketUser = JwtPayload | AdminJwtPayload;

export const initSocket = (httpServer: HttpServer): Server => {
  io = new Server(httpServer, {
    cors: {
      origin: env.FRONTEND_URL,
      credentials: true,
    },
  });

  io.use((socket: Socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      if (!token) return next(new Error("No token"));
      let payload: SocketUser | null = verifyToken(token);

      if (!payload) {
        try {
          payload = verifyAdminToken(token);
        } catch {
          return next(new Error("Invalid token"));
        }
      }

      if (!payload) return next(new Error("Invalid token"));
      (socket as any).user = payload;
      next();
    } catch {
      next(new Error("Invalid token"));
    }
  });

  io.on("connection", (socket: Socket) => {
    const user = (socket as any).user;

    socket.join(user.id);

    socket.on("disconnect", () => {
      console.log(`User ${user.id} disconnected`);
    });
  });

  return io;
};

export const getIO = (): Server => {
  if (!io) throw new Error("Socket not initialized");
  return io;
};

export const emitToUser = (userId: string, event: string, data: any) => {
  getIO().to(userId).emit(event, data);
};
