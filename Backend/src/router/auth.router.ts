import Router from "@koa/router";
import { generateOtp, logIn, resetPassword, signUp, verifyUser } from "../controller/auth.controller.js";


const authRouter = new Router({prefix:"/auth"});

authRouter.post("/login", logIn);
authRouter.post("/signup", signUp);
authRouter.post("/otp/generate",generateOtp);
authRouter.post("/user/verify",verifyUser);
authRouter.post("/password/reset",resetPassword);

export default authRouter;