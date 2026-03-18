import Router from "@koa/router";
import { createReview, deleteReview, getReview, updateReview } from "../controller/review.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const reviewRouter = new Router({prefix:"/reviews"});

reviewRouter.get("/:reviewId",getReview);

reviewRouter.use(authMiddleware);
reviewRouter.post("/",createReview);
reviewRouter.patch("/:reviewId",updateReview);
reviewRouter.delete("/:reviewId",deleteReview);


export default reviewRouter;
