import { env } from "node:process";
import nodemailer from "nodemailer";


export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: env.EMAIL,
    pass: env.EMAIL_PASSWORD,
  },
});