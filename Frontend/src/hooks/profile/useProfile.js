import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../auth/useAuth";
import {
  updateProfileService,
  uploadProfilePicService,
  verifyEmailChangeService,
} from "../../services/user.service";

import toast from "react-hot-toast";
import { changePasswordSchema, updateEmailSchema, updateNameSchema, verifyEmailOtpSchema } from "@/validations/validations";

export const useProfile = () => {
  const { user, updateUser, getMe } = useAuth();
  const [uploadingPic, setUploadingPic] = useState(false);
  const [emailOtpSent, setEmailOtpSent] = useState(false);

  // name form
  const nameForm = useForm({
    resolver: yupResolver(updateNameSchema),
    defaultValues: { name: user?.name || "" },
  });

  // email form
  const emailForm = useForm({
    resolver: yupResolver(updateEmailSchema),
    defaultValues: { newEmail: "" },
  });

  // otp form
  const otpForm = useForm({
    resolver: yupResolver(verifyEmailOtpSchema),
  });

  // password form
  const passwordForm = useForm({
    resolver: yupResolver(changePasswordSchema),
  });

  const handleUploadPic = useCallback(async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingPic(true);
    const formData = new FormData();
    formData.append("profilePic", file);
    const res = await uploadProfilePicService(formData);
    if (res.success || res.message === "Profile Picture uploaded successfully.") {
      await getMe();
      toast.success("Profile picture updated!");
    } else {
      toast.error(res.message || "Failed to upload picture");
    }
    setUploadingPic(false);
  }, [getMe]);

  const onUpdateName = async (data) => {
    const res = await updateProfileService({ name: data.name });
    if (res.success) {
      updateUser({ ...user, name: data.name });
      toast.success("Name updated successfully!");
    } else {
      toast.error(res.message || "Failed to update name");
    }
  };

  const onRequestEmailChange = async (data) => {
    const res = await updateProfileService({ newEmail: data.newEmail });
    if (res.success) {
      setEmailOtpSent(true);
      toast.success("OTP sent to your new email!");
    } else {
      toast.error(res.message || "Failed to send OTP");
    }
  };

  const onVerifyEmailOtp = async (data) => {
    const res = await verifyEmailChangeService(data.otp);
    if (res.success) {
      await getMe();
      setEmailOtpSent(false);
      emailForm.reset();
      otpForm.reset();
      toast.success("Email updated successfully!");
    } else {
      toast.error(res.message || "Invalid OTP");
    }
  };

  const onChangePassword = async (data) => {
    const res = await updateProfileService({
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
      confirmNewPassword: data.confirmNewPassword,
    });
    if (res.success) {
      passwordForm.reset();
      toast.success("Password changed successfully!");
    } else {
      toast.error(res.message || "Failed to change password");
    }
  };

  return {
    user,
    uploadingPic,
    emailOtpSent,
    setEmailOtpSent,
    handleUploadPic,
    // name
    nameRegister: nameForm.register,
    nameHandleSubmit: nameForm.handleSubmit(onUpdateName),
    nameErrors: nameForm.formState.errors,
    nameSubmitting: nameForm.formState.isSubmitting,
    // email
    emailRegister: emailForm.register,
    emailHandleSubmit: emailForm.handleSubmit(onRequestEmailChange),
    emailErrors: emailForm.formState.errors,
    emailSubmitting: emailForm.formState.isSubmitting,
    // otp
    otpRegister: otpForm.register,
    otpHandleSubmit: otpForm.handleSubmit(onVerifyEmailOtp),
    otpErrors: otpForm.formState.errors,
    otpSubmitting: otpForm.formState.isSubmitting,
    // password
    passwordRegister: passwordForm.register,
    passwordHandleSubmit: passwordForm.handleSubmit(onChangePassword),
    passwordErrors: passwordForm.formState.errors,
    passwordSubmitting: passwordForm.formState.isSubmitting,
  };
};