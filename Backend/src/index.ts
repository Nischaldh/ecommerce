import "reflect-metadata";
import Koa from "koa";
import http from "http";
import env from "./lib/env.js";
import { AppDataSource } from "./config/data-source.js";
import router from "./router/routes.js";
import logger from "./middleware/logger.js";
import bodyParser from "koa-bodyparser";
import { errorHandlerMiddleware } from "./middleware/error-hanlder.js";
import cors from "@koa/cors";
import { initSocket } from "./lib/socket.js";

const app = new Koa();

const PORT = env.PORT;

const allowedOrigins = [env.FRONTEND_URL, env.ADMIN_URL];

app.use(
  cors({
    origin: (ctx) => {
      const requestOrigin = ctx.request.header.origin;

      if (!requestOrigin) return "*"; 

      if (allowedOrigins.includes(requestOrigin)) {
        return requestOrigin;
      }

      return ""; 
    },
    credentials: true,
  }),
);

// middleware
app.use(errorHandlerMiddleware);
app.use(bodyParser());
app.use(logger);

// main router
app.use(router.routes()).use(router.allowedMethods());

try {
  await AppDataSource.initialize();

  const httpServer = http.createServer(app.callback());
  initSocket(httpServer);
  httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
} catch (error) {
  console.log(error);
}
