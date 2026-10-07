import env from "./env.js";

export const sendEmail = async (to: string, subject: string, text: string) => {
  try {
    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": env.BREVO_API_KEY,
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        sender: { name: "MyApp", email: env.EMAIL },
        to: [{ email: to }],
        subject,
        textContent: text,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("BREVO ERROR:", res.status, data);
      throw new Error(data?.message || "Brevo request failed");
    }

    console.log("BREVO SUCCESS:", data.messageId);
    return data;
  } catch (error) {
    console.error("EMAIL ERROR:", error);
    throw new Error("Failed to send OTP email. Please try again.");
  }
};

// if youre using nodemailer, you can use the following code to send email using brevo
// import env from "./env.js";
// import nodemailer from "nodemailer";

// export const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: { user: env.EMAIL, pass: env.EMAIL_PASSWORD },
// });

// export const sendEmail = async (to: string, subject: string, text: string) => {
//   try {
//       const msg = {
//       to,
//       from: env.EMAIL,
//       subject,
//       text,
//     };
//     const result = await transporter.sendMail(msg)
//     return result;
//   } catch (error: any) {
//     console.error("SendGrid error:", error.response?.body || error.message);
//     throw new Error("Failed to send OTP email. Please try again.");
//   }
// };

