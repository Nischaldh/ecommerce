import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";
import { forgotPasswordSchema, resetPasswordSchema } from "@/validations/auth.validation";


export const useForgotPassword = () => {
  const navigate = useNavigate();
  const { generateOtp, resetPassword } = useAuth();
  const [currentState, setCurrentState] = useState("Forgot Password");
  const [pendingEmail, setPendingEmail] = useState("");

  const forgotForm = useForm({
    resolver: yupResolver(forgotPasswordSchema),
  });

  const resetForm = useForm({
    resolver: yupResolver(resetPasswordSchema),
  });

  const onForgotPassword = async (data) => {
    const res = await generateOtp(data.email);
    if (res.success) {
      setPendingEmail(data.email);
      setCurrentState("Reset Password");
    }
  };

  const onResetPassword = async (data) => {
   
    const res = await resetPassword({
      email: pendingEmail,
      otp: data.otp,
      newPassword: data.newPassword,
      confirmPassword:data.confirmPassword

    });
    if (res.success) navigate("/login");
  };

  return {
    currentState,
    pendingEmail,
    // forgot form
    forgotRegister: forgotForm.register,
    forgotHandleSubmit: forgotForm.handleSubmit(onForgotPassword),
    forgotErrors: forgotForm.formState.errors,
    forgotSubmitting: forgotForm.formState.isSubmitting,
    // reset form
    resetRegister: resetForm.register,
    resetHandleSubmit: resetForm.handleSubmit(onResetPassword),
    resetErrors: resetForm.formState.errors,
    resetSubmitting: resetForm.formState.isSubmitting,
  };
};