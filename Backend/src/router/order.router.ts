
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

// seller
orderRouter.get("/seller/items", sellerAuth, getSellerOrders);
orderRouter.patch("/seller/items/:itemId/status", sellerAuth, updateOrderItemStatus);
orderRouter.patch("/seller/items/:itemId/delivery", sellerAuth, updateDelivery);

// buyer
orderRouter.post("/", placeOrder);
orderRouter.get("/", getMyOrders);
orderRouter.get("/:id", getOrderById);
orderRouter.patch("/:id/cancel", cancelOrder);
orderRouter.patch("/:id/address", updateOrderAddress);

export default orderRouter;