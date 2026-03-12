import Router from "@koa/router";
import {
  createProduct,
  deleteProduct,
  editProduct,
  getAllProduct,
  getAProduct,
} from "../controller/product.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { sellerAuth } from "../middleware/seller.auth.js";
import { uploadMultipleImages } from "../middleware/upload.middleware.js";

const productRouter = new Router({ prefix: "/products" });

// public router
const publicProductRouter = new Router();
publicProductRouter.get("/", getAllProduct);
publicProductRouter.get("/:id", getAProduct);

// private router
const privateProductRouter = new Router();

privateProductRouter.use(authMiddleware);
privateProductRouter.use(sellerAuth);

privateProductRouter.post(
  "/",
  uploadMultipleImages.fields([
    { name: "primaryImage", maxCount: 1 },
    { name: "images", maxCount: 5 },
  ]),
  createProduct,
);
privateProductRouter.put(
  "/:id",
  uploadMultipleImages.fields([
    { name: "primaryImage", maxCount: 1 },
    { name: "images", maxCount: 5 },
  ]),
  editProduct,
);
privateProductRouter.delete("/:id", deleteProduct);

productRouter.use(
  publicProductRouter.routes(),
  publicProductRouter.allowedMethods(),
);
productRouter.use(
  privateProductRouter.routes(),
  privateProductRouter.allowedMethods(),
);

export default productRouter;
