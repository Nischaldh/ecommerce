import Router from "@koa/router";
import authRouter from "./auth.router.js";
import userRouter from "./user.router.js";
import productRouter from "./product.router.js";
import cartRouter  from "./cart.router.js";
import orderRouter from "./order.router.js";
import reviewRouter from "./review.router.js";

const router = new Router({prefix:"/api"});

router.use(authRouter.routes(), authRouter.allowedMethods());

router.use(userRouter.routes(),userRouter.allowedMethods());

router.use(productRouter.routes(),productRouter.allowedMethods());

router.use(cartRouter.routes(), cartRouter.allowedMethods());

router.use(orderRouter.routes(),orderRouter.allowedMethods());

router.use(reviewRouter.routes(),reviewRouter.allowedMethods());

export default router;