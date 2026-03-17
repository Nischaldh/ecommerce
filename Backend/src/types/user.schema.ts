export interface IUser{
    id:string,
    name:string,
    email:string,
    role:string,
    profilePic:string|null,
    createdAt:Date,
    updatedAt:Date,
}

export interface IAuthResponse{
    user:IUser,
    token:string
}

export type OtpValidation={
    reqOtp:string,
    otp:string|null,
    otpExpires:Date|null,
}

export type UpdateProfileInput = {
  name?: string;
  currentPassword?: string;
  newPassword?: string;
  confirmNewPassword?:string,
  newEmail?: string;
}
