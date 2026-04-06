import sgMail from "@sendgrid/mail";
import env from "./env.js";
import nodemailer from "nodemailer";

sgMail.setApiKey(env.SENDGRID_API_KEY);

export const sendEmail = async (to: string, subject: string, text: string) => {
  try {
    const msg = {
      to,
      from: env.EMAIL,
      subject,
      text,
    };
    const result = await sgMail.send(msg);
    return result;
  } catch (error: any) {
    console.error("SendGrid error:", error.response?.body || error.message);
    throw new Error("Failed to send OTP email. Please try again.");
  }
};

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: env.EMAIL, pass: env.EMAIL_PASSWORD },
});
