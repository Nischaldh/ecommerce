import "reflect-metadata"
import { DataSource } from "typeorm"
import env from "../lib/env.js"
import { User } from "../entity/User.js"
import { Product } from "../entity/Product.js"
import { ProductImage } from "../entity/ProductImage.js"
import { Cart } from "../entity/Cart.js"
import { CartItem } from "../entity/CartItem.js"
import { Order } from "../entity/Order.js"
import { OrderItem } from "../entity/OrderItems.js"
import { Delivery } from "../entity/Delivery.js"
import { UserAddress } from "../entity/UserAddresses.js"
import { Review } from "../entity/Review.js"
import { Notification } from "../entity/Notification.js"
import { Admin } from "../entity/Admin.js"
import { SellerBalance } from "../entity/SellerBalance.js"
import { Payout } from "../entity/Payout.js"
import { Commission } from "../entity/Commission.js"
import { PaymentTransaction } from "../entity/PaymentTransaction.js"
import { SellerPaymentInfo } from "../entity/SellerPaymentInfo.js"
import { Refund } from "../entity/Refund.js"


export const AppDataSource = new DataSource({
    type: "postgres",
    url:env.DATABASE_URL,
    synchronize: true,
    logging: false,
    entities: [User, Product, ProductImage,Cart,CartItem,Order,OrderItem,Delivery,UserAddress,Review,Notification,Admin,SellerBalance,Payout,Commission,PaymentTransaction,SellerPaymentInfo,Refund],
    migrations: [],
    subscribers: [],
})
