import "dotenv/config";

type envSchema = {
  PORT: number;
  DATABASE_URL: string;
  JWT_SECRET: string;
  DUMMY_HASH: string;
  EMAIL: string;
  EMAIL_PASSWORD: string;
  CLOUD_NAME: string;
  CLOUD_API_KEY: string;
  CLOUD_API_SECRET: string;
  FRONTEND_URL: string;
  SENDGRID_API_KEY: string;
  KHALTI_SECRET_KEY: string;
  KHATLI_BASE_URL?: string;
  ADMIN_JWT_SECRET: string;
};

const env: envSchema = {
  PORT: parseInt(process.env.PORT || "4000"),
  DATABASE_URL: process.env.DATABASE_URL || "",
  JWT_SECRET: process.env.JWT_SECRET || "123456",
  DUMMY_HASH:
    process.env.DUMMY_HASH ||
    "$2a$10$SJJ.YGj2U07QoPOSjI6L/uZObuZPdRys54VpgMk9da2ml7DlM2evu",
  EMAIL: process.env.EMAIL || "",
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD || "",
  CLOUD_NAME: process.env.CLOUDINARY_NAME || "",
  CLOUD_API_KEY: process.env.CLOUDINARY_API_KEY || "",
  CLOUD_API_SECRET: process.env.CLOUDINARY_SECRET_KEY || "",
  FRONTEND_URL: process.env.FRONTEND_URL || "",
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY || "",
  KHALTI_SECRET_KEY: process.env.KHALTI_SECRET_KEY || "",
  KHATLI_BASE_URL: process.env.KHALTI_BASE_URL || "https://dev.khalti.com/api/v2",
  ADMIN_JWT_SECRET: process.env.ADMIN_JWT_SECRET || "@DMIN",
};

export default env;
