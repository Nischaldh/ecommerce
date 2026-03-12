import { AppDataSource } from "../config/data-source.js";
import { User } from "../entity/User.js";
import { comparePassword, hashPassword } from "../lib/bcrypt.js";
import { transporter } from "../lib/email.js";
import env from "../lib/env.js";
import { BadRequestError, NotFoundError } from "../lib/erros.js";
import { generateToken } from "../lib/jwt.js";
import { generateOtp } from "../lib/otp.js";
import { loginSchema, signupSchema } from "../types/auth.schema.js";
import {
  successResponse,
  userRole,
  userStatus,
} from "../types/global.types.js";
import { IAuthResponse, IUser, OtpValidation } from "../types/user.schema.js";

const userRepository = AppDataSource.getRepository(User);

export const loginService = async (
  validatedData: loginSchema,
): Promise<IAuthResponse> => {
  const { email, password } = validatedData;
  const response = await userRepository.findOne({
    where: { email },
    select: [
      "id",
      "name",
      "email",
      "password",
      "role",
      "status",
      "profilePic",
      "createdAt",
      "updatedAt",
    ],
  });
  if (response?.status === "not_verified") {
    throw new BadRequestError("Please verify your email to log in.");
  }

  const hashedPassword = response ? response.password : env.DUMMY_HASH;
  console.log("Hased password", hashedPassword);
  const passwordMatched = await comparePassword(password, hashedPassword);

  if (!passwordMatched || !response) {
    throw new BadRequestError("Invalid email or password");
  }
  const user: IUser = {
    id: response.id,
    email: response.email,
    name: response.name,
    role: response.role as userRole,
    profilePic: response.profilePic,
    createdAt: response.createdAt,
    updatedAt: response.updatedAt,
  };
  const token = generateToken({
    id: user!.id,
    email: user!.email,
    role: user!.role as userRole,
  });
  console.log("Login Service - User:", user); // Debug log
  return { user, token };
};

/*
signup service
check user exists with email
save users to db
response success.

*/

export const signUpService = async (
  validatedData: signupSchema,
): Promise<successResponse> => {
  const { name, email, password, role } = validatedData;
  const user = await userRepository.findOne({ where: { email } });
  if (user) {
    throw new BadRequestError("User with this email already exists.");
  }
  const hashedPassword = await hashPassword(password);
  const newUser = userRepository.create({
    name,
    email,
    password: hashedPassword,
    role,
  });
  await userRepository.save(newUser);
  await generateOtpService({ email });
  return {
    success: true,
    message: "User registered successfully. Please verify your email.",
  };
};

export const generateOtpService = async (validatedData: {
  email: string;
}): Promise<successResponse> => {
  const { email } = validatedData;
  const user = await userRepository.findOneBy({ email });
  if (!user) throw new NotFoundError("User not Found");
  const otp: string = generateOtp();
  const hashotp = await hashPassword(otp);
  user.otp = hashotp;
  user.otpExpires = new Date(Date.now() + 10 * 60 * 1000);

  await userRepository.save(user);
  const result = await transporter.sendMail({
    to: email,
    subject: "Verification OTP",
    text: `Your OTP is ${otp}. It will expire in 10 minutes.`,
  });
  if (!result.accepted.length) {
    throw new Error("Failed to send OTP email. Please try again.");
  }
  return {
    success: true,
    message: "OTP sent to email if user exists",
  };
};

export const verifyOtpService = async (
  email: string,
  reqOtp: string,
): Promise<{ success: boolean; user: User }> => {
  const user = await userRepository.findOne({
    where: { email },
    select: ["id", "email", "otp", "otpExpires", "status"],
  });

  if (!user) throw new NotFoundError("User not found");

  if (!user.otp || !user.otpExpires)
    throw new BadRequestError("OTP not generated for this user.");

  if (user.otpExpires < new Date())
    throw new BadRequestError("OTP has expired. Please generate a new one.");

  const isValidOtp = await comparePassword(reqOtp, user.otp);

  if (!isValidOtp) throw new BadRequestError("Invalid OTP.");

  return { success: true, user };
};

export const resetPasswordService = async (validatedData: {
  email: string;
  newPassword: string;
  otp: string;
}): Promise<successResponse> => {
  const { email, newPassword, otp } = validatedData;

  const { user } = await verifyOtpService(email, otp);

  const hashedPassword = await hashPassword(newPassword);

  user.password = hashedPassword;
  user.otp = null;
  user.otpExpires = null;

  await userRepository.save(user);

  return { success: true, message: "Password reset successfully." };
};

export const verifyUserService = async (validatedData: {
  email: string;
  otp: string;
}): Promise<IAuthResponse> => {
  const { email, otp } = validatedData;

  const { user } = await verifyOtpService(email, otp);

  user.status = userStatus.VERIFIED;
  user.otp = null;
  user.otpExpires = null;

  const response = await userRepository.save(user);
  const newUser: IUser = {
    id: response.id,
    email: response.email,
    name: response.name,
    role: response.role as userRole,
    profilePic: response.profilePic,
    createdAt: response.createdAt,
    updatedAt: response.updatedAt,
  };
  console.log(newUser);
  const token = generateToken({
    id: user!.id,
    email: user!.email,
    role: user!.role as userRole,
  });
  return { user: newUser, token };
};
