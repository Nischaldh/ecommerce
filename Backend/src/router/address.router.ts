import Router from "@koa/router";

import { authMiddleware } from "../middleware/auth.middleware.js";
import { createAddress, deleteAddress, getAddressById, getAddresses, setDefaultAddress, updateAddress } from "../controller/address.controller.js";

const addressRouter = new Router({ prefix: "/addresses" });

addressRouter.use(authMiddleware);

addressRouter.post("/", createAddress);
addressRouter.get("/", getAddresses);
addressRouter.get("/:id", getAddressById);
addressRouter.patch("/:id", updateAddress);
addressRouter.delete("/:id", deleteAddress);
addressRouter.patch("/:id/default", setDefaultAddress);

export default addressRouter;