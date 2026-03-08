import Router from "@koa/router";
import { logIn, signIn } from "../controller/auth.controller.js";


const authRouter = new Router({prefix:"/auth"});

authRouter.post("/login", logIn);
authRouter.post("/signin", signIn);

export default authRouter;