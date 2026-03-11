import type { Context } from "koa"
import { BadRequestError } from "../lib/erros.js";
import { uploadToCloudinary } from "../lib/cloudinaryUpload.js";
import { updateProfileService, uploadProfilePicService, verifyEmailChangeService } from "../service/user.service.js";
import { updateProfileValidation, verifyEmailOtpValidation } from "../validations/user.validation.js";


export const uploadProfilePic = async(ctx:Context)=>{
    const file = ctx.file;
    const user = ctx.state.user;
    if(!file){
        throw new BadRequestError("No file uploaded");
    }
    const response = await uploadToCloudinary(file.buffer, "users");

    const result = await uploadProfilePicService(response.url,user.id);
    if(!result.success){
        throw new Error("Something went wrong while uploading profile picture");
    }
    user.profilePic = response.url;
    ctx.status = 200;
    ctx.body = {
        message: "Profile Picture uploaded successfully."
    }
}

export const updateProfile = async (ctx: Context) => {
  const validatedData = await updateProfileValidation.validate(ctx.request.body);

  const userId = ctx.state.user.userId; 

  const response = await updateProfileService(userId, validatedData);

  ctx.status = 200;
  ctx.body = response;
};

export const verifyEmailChange = async (ctx: Context) => {
  const validatedData = await verifyEmailOtpValidation.validate(ctx.request.body);

  const userId = ctx.state.user.userId;

  const response = await verifyEmailChangeService(userId, validatedData.otp);

  ctx.status = 200;
  ctx.body = response;
};
