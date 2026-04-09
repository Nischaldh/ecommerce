import jwt from "jsonwebtoken";
import { JwtPayload } from "../types/global.types.js";
import env from "./env.js";

export const generateToken = (user:JwtPayload)=>{
    return jwt.sign({
        id:user.id,
        email:user.email,
        role:user.role
    },
    env.JWT_SECRET,
    {
        expiresIn:"7d"
    }
);
};

export const verifyToken = (token:string)=>{
    try {
        return jwt.verify(token, env.JWT_SECRET);
    } catch (error) {
        return null;
    }
}