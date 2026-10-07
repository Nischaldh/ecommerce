import env from "./env.js";
import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: env.EMAIL, pass: env.EMAIL_PASSWORD },
});

transporter.verify()
  .then(() => console.log("Gmail SMTP connected"))
  .catch((err) => console.error(" Gmail SMTP connection failed:", err));

export const sendEmail = async (to: string, subject: string, text: string) => {
  try {
    console.log("EMAIL PROVIDER: NODEMAILER GMAIL");

    const msg = {
      to,
      from: env.EMAIL,
      subject,
      text,
    };

    const result = await transporter.sendMail(msg);

    console.log("NODEMAILER SUCCESS:", result.messageId);

    return result;
  } catch (error: any) {
    console.error("NODEMAILER ERROR:", {
      message: error.message,
      code: error.code,
      command: error.command,
      response: error.response,
      responseCode: error.responseCode,
    });

    throw new Error("Failed to send OTP email. Please try again.");
  }
};
