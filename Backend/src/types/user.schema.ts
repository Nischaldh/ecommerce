export interface IUser{
    id:string,
    name:string,
    email:string,
    role:string,
    profilePic:string,
    createdAt:Date,
    updatedAt:Date,
}

export interface IAuthResponse{
    user:IUser,
    token:string
}

export interface OtpValidation{
    reqOtp:string,
    otp:string|null,
    otpExpires:Date|null,
}