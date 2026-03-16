import type { Context } from "koa";
import { userRole } from "../types/global.types.js";
import {
    emailValidation,
  loginValidation,
  otpValidatoin,
  resetPasswordValidation,
  signupValidation,
} from "../validations/auth.validation.js";
import { loginSchema, signupSchema } from "../types/auth.schema.js";
import {
  generateOtpService,
  loginService,
  resetPasswordService,
  signUpService,
  verifyUserService,
} from "../service/auth.service.js";

/*
signup flow
1. validate request
2. signup servie: saves users to db
3. Generate otp
4. send otp to email
5. verify otp
6. if otp verifed, change status to verified and login
 response: IUser type with Token.
 */
export const signUp = async (ctx: Context) => {
  // validate request
  const validatedData: signupSchema = await signupValidation.validate(
    ctx.request.body,
  );
  const response = await signUpService(validatedData);
  if (!response.success) {
    throw new Error("Something went wrong");
  }
  ctx.status = 201;
  ctx.body = { message: "OTP Sent to email successful." };
};

export const generateOtp = async (ctx: Context) => {
  const validatedData = await emailValidation.validate(ctx.request.body);
  const result = await generateOtpService(validatedData);
  if (!result.success) {
    console.log("Error in generateOtp.");
    throw new Error("Something went wrong.");
  }
  ctx.status = 200;
  ctx.body = {
    success: true,
    message: "Otp sent successfully.",
  };
};


export const resetPassword = async (ctx: Context) => {

  const validatedData = await resetPasswordValidation.validate(ctx.request.body);

  const result = await resetPasswordService(validatedData);

  if (!result.success) {
    throw new Error("Something went wrong.");
  }

  ctx.status = 200;

  ctx.body = {
    success: true,
    message: "Password reset successfully.",
  };
};

export const verifyUser = async (ctx: Context) => {

  const validatedData = await otpValidatoin.validate(ctx.request.body);

  const result = await verifyUserService(validatedData);


  ctx.status = 200;

  ctx.body = {
    success: true,
    message: "User verified successfully.",
    data:result.user,
    token:result.token
  };
};

export const logIn = async (ctx: Context) => {
  // validate request
  const validatedData: loginSchema = await loginValidation.validate(
    ctx.request.body,
  );
  const response = await loginService(validatedData);
  ctx.status = 200;
  ctx.body = {
    message: "Login Successful",
    user: response.user,
    token: response.token,
  };
};
