import "reflect-metadata"
import { DataSource } from "typeorm"
import env from "../lib/env.js"
import { User } from "../entity/User.js"
import { Product } from "../entity/Product.js"
import { ProductImage } from "../entity/ProductImage.js"


export const AppDataSource = new DataSource({
    type: "postgres",
    url:env.DATABASE_URL,
    synchronize: true,
    logging: false,
    entities: [User, Product, ProductImage],
    migrations: [],
    subscribers: [],
})
