import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";
import { signupSchema, otpSchema } from "../../validations/auth.validation";

export const useSignup = () => {
  const navigate = useNavigate();
  const { signup, verifyOtp } = useAuth();
  const [currentState, setCurrentState] = useState("Sign Up");
  const [pendingEmail, setPendingEmail] = useState("");

  const signupForm = useForm({
    resolver: yupResolver(signupSchema),
    defaultValues: { role: "buyer" },
  });

  const otpForm = useForm({
    resolver: yupResolver(otpSchema),
  });

  const onSignup = async (data) => {
    const res = await signup(data);
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
    // signup form
    signupRegister: signupForm.register,
    signupHandleSubmit: signupForm.handleSubmit(onSignup),
    signupErrors: signupForm.formState.errors,
    signupSubmitting: signupForm.formState.isSubmitting,
    // otp form
    otpRegister: otpForm.register,
    otpHandleSubmit: otpForm.handleSubmit(onVerifyOtp),
    otpErrors: otpForm.formState.errors,
    otpSubmitting: otpForm.formState.isSubmitting,
  };
};