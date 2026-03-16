import Router from "@koa/router";
import { addToCart, getCart, removeCartItem, updateCartItem } from "../controller/cart.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";


const cartRouter = new Router({prefix:"/cart"});

cartRouter.use(authMiddleware);

cartRouter.get("/",getCart);
cartRouter.post("/",addToCart);
cartRouter.patch('/item/:id',updateCartItem)
cartRouter.delete("/item/:id",removeCartItem);


export default cartRouter;
