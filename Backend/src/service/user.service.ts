import { AppDataSource } from "../config/data-source.js";
import { User } from "../entity/User.js";
import { comparePassword, hashPassword } from "../lib/bcrypt.js";
import { transporter } from "../lib/email.js";
import { BadRequestError, NotFoundError } from "../lib/erros.js";
import { generateOtp } from "../lib/otp.js";
import { successResponse } from "../types/global.types.js";
import { IUser, UpdateProfileInput } from "../types/user.schema.js";

const userRepository = AppDataSource.getRepository(User);

export const uploadProfilePicService = async (
  url: string,
  userId: string,
): Promise<successResponse> => {
  const user = await userRepository.findOne({
    where: { id: userId },
    select: ["id", "profilePic"],
  });
  if (!user) {
    throw new NotFoundError("User not found.");
  }

  user.profilePic = url;
  await userRepository.save(user);
  return {
    success: true,
    message: "Profile Updated Successfully.",
  };
};

export const updateProfileService = async (
  userId: string,
  input: UpdateProfileInput,
): Promise<successResponse> => {
  const user = await userRepository.findOne({
    where: { id: userId },
    select: ["id", "name", "email", "password", "role", "profilePic", "status"], // include password
  });

  if (!user) throw new NotFoundError("User not found");

  if (input.name) user.name = input.name;

  if (input.currentPassword && input.newPassword) {
    const isMatch = await comparePassword(input.currentPassword, user.password);
    if (!isMatch) throw new BadRequestError("Current password incorrect");

    user.password = await hashPassword(input.newPassword);
  }

  if (input.newEmail && input.newEmail !== user.email) {
    const otp = generateOtp();
    user.newEmail = input.newEmail;
    user.emailOtp = await hashPassword(otp);
    user.emailOtpExpires = new Date(Date.now() + 10 * 60 * 1000);

    await transporter.sendMail({
      to: input.newEmail,
      subject: "Verify your new email",
      text: `Your verification code is ${otp}`,
    });
  }

  await userRepository.save(user);

  return {
    success: true,
    message: input.newEmail
      ? "Profile updated. Verify your new email to complete the change."
      : "Profile updated successfully",
  };
};

export const verifyEmailChangeService = async (
  userId: string,
  otp: string,
): Promise<successResponse> => {
  const user = await userRepository.findOneBy({ id: userId });

  if (!user || !user.newEmail || !user.emailOtp || !user.emailOtpExpires) {
    throw new BadRequestError("No email change requested");
  }

  if (user.emailOtpExpires < new Date())
    throw new BadRequestError("OTP expired");

  const isValid = await comparePassword(otp, user.emailOtp);
  if (!isValid) throw new BadRequestError("Invalid OTP");

  user.email = user.newEmail;
  user.newEmail = null;
  user.emailOtp = null;
  user.emailOtpExpires = null;

  await userRepository.save(user);

  return { success: true, message: "Email updated successfully" };
};

export const getMeService = async(userId:string):Promise<{user:IUser;success:boolean}>=>{
  const user = await userRepository.findOne({where:{id:userId}});
  if(!user) throw new NotFoundError("User not found.");
  return{
    user,
    success:true
  }
}