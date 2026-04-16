import Router from "@koa/router";
import {
  adminAuthMiddleware,
  superAdminOnly,
} from "../middleware/admin.auth.js";
import {
  createAdmin,
  deactivateAdmin,
  getMe,
  loginAdmin,
} from "../controller/admin/admin.auth.controller.js";
import {
  completePayout,
  confirmCommissions,
  createPayout,
  failPayout,
  getPayouts,
  getSellerBalances,
  getSellerPaymentInfo,
  releaseCommissions,
  verifySellerPaymentInfo,
} from "../controller/admin/admin.payment.controller.js";
import {
  approveRefund,
  completeRefund,
  getAllRefunds,
  rejectRefund,
} from "../controller/admin/admin.refund.controller.js";
import { getDashboard } from "../controller/admin/admin.dashboard.controller.js";
import {
  deleteUser,
  getUserById,
  getUsers,
  suspendUser,
  unsuspendUser,
} from "../controller/admin/admin.user.controller.js";
import { deleteProduct, getProducts } from "../controller/admin/admin.product.controller.js";

import {
  getCommissions,
  getOrderById,
  getOrders,
} from "../controller/admin/admin.order.controller.js";


const adminRouter = new Router({ prefix: "/admins" });

// ── public ──
adminRouter.post("/login", loginAdmin);

// ── protected
adminRouter.use(adminAuthMiddleware);
adminRouter.get("/me", getMe);
adminRouter.get("/dashboard", getDashboard);

// users
adminRouter.get("/users", getUsers);
adminRouter.get("/users/:id", getUserById);
adminRouter.patch("/users/:id/suspend", suspendUser);
adminRouter.patch("/users/:id/unsuspend", unsuspendUser);
adminRouter.delete("/users/:id", deleteUser);

// products
adminRouter.get("/products", getProducts);
adminRouter.delete("/products/:id", deleteProduct);

// orders + commissions
adminRouter.get("/orders", getOrders);
adminRouter.get("/orders/:id", getOrderById);
adminRouter.get("/commissions", getCommissions);
adminRouter.patch("/orders/:orderId/commissions/confirm", confirmCommissions);
adminRouter.patch("/orders/:orderId/commissions/release", releaseCommissions);

// refunds
adminRouter.get("/refunds", getAllRefunds);
adminRouter.patch("/refunds/:id/approve", approveRefund);
adminRouter.patch("/refunds/:id/complete", completeRefund);
adminRouter.patch("/refunds/:id/reject", rejectRefund);

// payment management
adminRouter.get("/balances", getSellerBalances);
adminRouter.get("/payouts", getPayouts);
adminRouter.post("/payouts", createPayout);
adminRouter.patch("/payouts/:id/complete", completePayout);
adminRouter.patch("/payouts/:id/fail", failPayout);
adminRouter.get("/sellers/:sellerId/payment-info", getSellerPaymentInfo);
adminRouter.patch(
  "/sellers/:sellerId/payment-info/verify",
  verifySellerPaymentInfo,
);

// ── super admin only ──
adminRouter.post("/", superAdminOnly, createAdmin);
adminRouter.patch("/:id/deactivate", superAdminOnly, deactivateAdmin);

export default adminRouter;
