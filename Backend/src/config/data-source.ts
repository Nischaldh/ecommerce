import "reflect-metadata"
import { DataSource } from "typeorm"
import env from "../lib/env.js"
import { Users } from "../entity/User.js"
import { Test } from "../entity/Test.js"


export const AppDataSource = new DataSource({
    type: "postgres",
    url:env.DATABASE_URL,
    synchronize: true,
    logging: false,
    entities: [Test],
    migrations: [],
    subscribers: [],
})
