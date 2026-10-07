import env from "./env.js";
import nodemailer from "nodemailer";


export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: env.EMAIL, pass: env.EMAIL_PASSWORD },
});

export const sendEmail = async (to: string, subject: string, text: string) => {
  try {
    const msg = {
      to,
      from: env.EMAIL,
      subject,
      text,
    };
    const result = await transporter.sendMail(msg)
    return result;
  } catch (error: any) {
    console.error("SendGrid error:", error.response?.body || error.message);
    throw new Error(`Failed to send OTP email. Please try again. ${error.message}`);
  }
};



