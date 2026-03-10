import { userRole } from "./global.types.js";

export type loginSchema ={
    email:string;
    password:string;
}

export type signupSchema = loginSchema & {
    name:string;
    confirmPassword:string;
    role:userRole;
}