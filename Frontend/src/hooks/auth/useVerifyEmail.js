import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";
import { forgotPasswordSchema, otpSchema } from "@/validations/auth.validation";

export const useVerifyEmail = () => {
  const navigate = useNavigate();
  const { generateOtp, verifyOtp } = useAuth();
  const [currentState, setCurrentState] = useState("Enter Email");
  const [pendingEmail, setPendingEmail] = useState("");

  const emailForm = useForm({
    resolver: yupResolver(forgotPasswordSchema), 
  });

  const otpForm = useForm({
    resolver: yupResolver(otpSchema),
  });

  const onSendOtp = async (data) => {
    const res = await generateOtp(data.email);
    if (res.success) {
      setPendingEmail(data.email);
      setCurrentState("Verify OTP");
    }
  };

  const onVerifyOtp = async (data) => {
    const res = await verifyOtp({ email: pendingEmail, otp: data.otp });
    if (res.success) navigate("/");
  };

  return {
    currentState,
    pendingEmail,
    // email form
    emailRegister: emailForm.register,
    emailHandleSubmit: emailForm.handleSubmit(onSendOtp),
    emailErrors: emailForm.formState.errors,
    emailSubmitting: emailForm.formState.isSubmitting,
    // otp form
    otpRegister: otpForm.register,
    otpHandleSubmit: otpForm.handleSubmit(onVerifyOtp),
    otpErrors: otpForm.formState.errors,
    otpSubmitting: otpForm.formState.isSubmitting,
  };
};