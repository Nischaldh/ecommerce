import { AdminRole } from "./global.types.js";

export interface AdminJwtPayload {
  id: string;
  email: string;
  role: AdminRole;
}