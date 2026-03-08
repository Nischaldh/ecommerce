import "reflect-metadata";
import Koa from "koa";
import type {Context} from "koa";
import Router from "@koa/router";
import env from "./lib/env.js";
import { AppDataSource } from "./config/data-source.js";
import { Test } from "./entity/Test.js";
import router from "./router/routes.js";
import logger from "./middleware/logger.js";
import bodyParser from "koa-bodyparser";
import { errorHandlerMiddleware } from "./middleware/error-hanlder.js";
import cors from "@koa/cors";

const app = new Koa();


const PORT = env.PORT;

app.use(cors({
  origin: "*",
  credentials:true
}))


// middleware
app.use(bodyParser);
app.use(errorHandlerMiddleware);
app.use(logger);


// main router
app.use(router.routes()).use(router.allowedMethods());

try {
  await AppDataSource.initialize();
  app.listen(PORT, () => {
    console.log(`Server running in Port ${env.PORT}`);
  });
} catch (error) {
  console.log(error);
}