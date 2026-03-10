import "dotenv/config";

type envSchema= {
  PORT: number;
  DATABASE_URL: string;
  JWT_SECRET: string;
  DUMMY_HASH: string;
  EMAIL:string;
  EMAIL_PASSWORD: string;
};

const env : envSchema= {
  PORT: parseInt(process.env.PORT || "4000"),
  DATABASE_URL: process.env.DATABASE_URL||"",
  JWT_SECRET: process.env.JWT_SECRET || "123456",
  DUMMY_HASH:
    process.env.DUMMY_HASH ||
    "$2a$10$SJJ.YGj2U07QoPOSjI6L/uZObuZPdRys54VpgMk9da2ml7DlM2evu",
    EMAIL: process.env.EMAIL || "",
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD || "",
};

export default env;
