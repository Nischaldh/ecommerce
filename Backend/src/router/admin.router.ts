import Router from "@koa/router";
import { adminAuthMiddleware, superAdminOnly } from "../middleware/admin.auth.js";
import { createAdmin, deactivateAdmin, getMe, loginAdmin } from "../controller/admin/admin.auth.controller.js";
import { completePayout, confirmCommissions, createPayout, failPayout, getPayouts, getSellerBalances, getSellerPaymentInfo, releaseCommissions, verifySellerPaymentInfo } from "../controller/admin/admin.payment.controller.js";
import { approveRefund, completeRefund, getAllRefunds, rejectRefund } from "../controller/admin/admin.refund.controller.js";


const adminRouter = new Router({ prefix: "/admin" });

// ── public ──
adminRouter.post("/login", loginAdmin);

// ── protected
adminRouter.use(adminAuthMiddleware);

adminRouter.get("/me", getMe);

// refunds
adminRouter.get("/refunds", getAllRefunds);
adminRouter.patch("/refunds/:id/approve", approveRefund);
adminRouter.patch("/refunds/:id/complete", completeRefund);
adminRouter.patch("/refunds/:id/reject", rejectRefund);


// payment management
adminRouter.get("/sellers/:sellerId/payment-info", getSellerPaymentInfo);
adminRouter.get("/balances", getSellerBalances);
adminRouter.get("/payouts", getPayouts);
adminRouter.post("/payouts", createPayout);
adminRouter.patch("/payouts/:id/complete", completePayout);
adminRouter.patch("/payouts/:id/fail", failPayout);
adminRouter.patch("/orders/:orderId/commissions/confirm", confirmCommissions);
adminRouter.patch("/orders/:orderId/commissions/release", releaseCommissions);
adminRouter.patch(
  "/sellers/:sellerId/payment-info/verify",
  verifySellerPaymentInfo
);

// ── super admin only ──
adminRouter.post("/admins", superAdminOnly, createAdmin);
adminRouter.patch("/admins/:id/deactivate", superAdminOnly, deactivateAdmin);

export default adminRouter;