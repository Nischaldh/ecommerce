import Router from "@koa/router";
import { updateProfile, uploadProfilePic, verifyEmailChange } from "../controller/user.controller.js";
import { uploadSingleImage } from "../middleware/upload.middleware.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const userRouter = new Router({ prefix: "/users" });

/**
 * Todo
 1. add authentication 
 */
userRouter.use(authMiddleware);

userRouter.put(
  "/profile/pic",
  uploadSingleImage.single("profilePic"),
  uploadProfilePic,
);
userRouter.put("/profile", updateProfile);
userRouter.post("/profile/verify-email", verifyEmailChange);

export default userRouter;
