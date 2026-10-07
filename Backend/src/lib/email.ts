import env from "./env.js";
import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,

  auth: {
    user: env.EMAIL,
    pass: env.EMAIL_PASSWORD,
  },

  connectionTimeout: 10_000,
  greetingTimeout: 10_000,
  socketTimeout: 15_000,
});

transporter
  .verify()
  .then(() => console.log("Gmail SMTP connected"))
  .catch((err) =>
    console.error("Gmail SMTP connection failed:", {
      message: err.message,
      code: err.code,
      command: err.command,
      response: err.response,
    })
  );

export const sendEmail = async (
  to: string,
  subject: string,
  text: string
) => {
  try {
    console.log("EMAIL PROVIDER: NODEMAILER GMAIL");

    const result = await transporter.sendMail({
      from: env.EMAIL,
      to,
      subject,
      text,
    });

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
