import Router from "@koa/router";
import authRouter from "./auth.router.js";
import userRouter from "./user.router.js";
import productRouter from "./product.router.js";

const router = new Router({prefix:"/api"});

router.use(authRouter.routes(), authRouter.allowedMethods());

router.use(userRouter.routes(),userRouter.allowedMethods());

router.use(productRouter.routes(),productRouter.allowedMethods());

export default router;