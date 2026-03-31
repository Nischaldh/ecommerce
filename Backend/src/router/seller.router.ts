import Router from "@koa/router";
import { getSellerById, getSellerProducts, getSellers } from "../controller/seller.controller.js";

const sellerRouter = new Router({ prefix: "/sellers" });

sellerRouter.get("/", getSellers);
sellerRouter.get("/:id", getSellerById);
sellerRouter.get("/:id/products", getSellerProducts);

export default sellerRouter;
