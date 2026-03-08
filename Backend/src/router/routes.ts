import Router from "@koa/router";
import authRouter from "./auth.router.js";

const router = new Router({prefix:"/api"});

router.use(authRouter.routes, authRouter.allowedMethods());

export default router;