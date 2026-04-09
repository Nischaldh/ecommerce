import jwt from "jsonwebtoken";
import env from "./env.js";
import { AdminJwtPayload } from "../types/admin.schema.js";


export const signAdminToken = (payload: AdminJwtPayload): string => {
  return jwt.sign(payload, env.ADMIN_JWT_SECRET, { expiresIn: "8h" });
};

export const verifyAdminToken = (token: string): AdminJwtPayload => {
  return jwt.verify(token, env.ADMIN_JWT_SECRET) as AdminJwtPayload;
};