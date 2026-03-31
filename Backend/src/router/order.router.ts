
import Router from "@koa/router";
import {
  cancelOrder,
  getMyOrders,
  getOrderById,
  getSellerOrders,
  placeOrder,
  updateDelivery,
  updateOrderAddress,
  updateOrderItemStatus,
} from "../controller/order.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { sellerAuth } from "../middleware/seller.auth.js";

const orderRouter = new Router({ prefix: "/orders" });

orderRouter.use(authMiddleware)
// buyer
orderRouter.post("/", placeOrder);
orderRouter.get("/", getMyOrders);
orderRouter.get("/:id", getOrderById);
orderRouter.patch("/:id/cancel", cancelOrder);
orderRouter.patch("/:id/address", updateOrderAddress);

orderRouter.use(sellerAuth)
// seller
orderRouter.get("/seller/items", getSellerOrders);
orderRouter.patch("/seller/items/:itemId/status", updateOrderItemStatus);
orderRouter.patch("/seller/items/:itemId/delivery",updateDelivery);


export default orderRouter;