import Router from "@koa/router";
import { getMyBalance, getMyPaymentInfo, getSellerCommissions, getSellerDashboard, initiatePayment, upsertMyPaymentInfo, verifyKhalti } from "../controller/payment.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { sellerAuth } from "../middleware/seller.auth.js";
import { getMyRefunds, requestRefund } from "../controller/refund.controller.js";


const paymentRouter = new Router({prefix:'/payments'});

paymentRouter.get("/khalti/verify", verifyKhalti);

paymentRouter.use(authMiddleware);


paymentRouter.post("/initiate",initiatePayment)
paymentRouter.post("/refund", requestRefund);
paymentRouter.get("/refunds", getMyRefunds);

paymentRouter.use(sellerAuth);

paymentRouter.get('/balance',getMyBalance);
paymentRouter.get("/payment-info", getMyPaymentInfo);
paymentRouter.post("/payment-info", upsertMyPaymentInfo);
paymentRouter.get("/dashboard", getSellerDashboard);
paymentRouter.get("/commissions", getSellerCommissions);

export default paymentRouter;