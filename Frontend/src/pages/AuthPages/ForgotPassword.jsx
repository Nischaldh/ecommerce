import { Link } from "react-router-dom";

import { useForgotPassword } from "@/hooks/auth/useForgotPassword";
import FormInput from "@/components/FormInput";

const ForgotPassword = () => {
  const {
    currentState,
    pendingEmail,
    forgotRegister, forgotHandleSubmit, forgotErrors, forgotSubmitting,
    resetRegister, resetHandleSubmit, resetErrors, resetSubmitting,
  } = useForgotPassword();

  return (
    <div className="min-h-screen flex items-center justify-center -mt-20">

      {/* Forgot password — email only */}
      {currentState === "Forgot Password" && (
        <form
          onSubmit={forgotHandleSubmit}
          className="flex flex-col items-center w-[90%] sm:max-w-96 p-8 gap-4 text-gray-800 "
        >
          <div className="inline-flex items-center gap-2 mb-2">
            <p className="text-3xl">Forgot Password</p>
            <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
          </div>

          <p className="text-sm text-gray-500 text-center w-full">
            Enter your email and we'll send you an OTP to reset your password.
          </p>

          <FormInput
            type="email"
            placeholder="Email"
            error={forgotErrors.email?.message}
            {...forgotRegister("email")}
          />

          <div className="w-full flex justify-end text-sm">
            <Link to="/login" className="hover:underline text-gray-500">
              Back to Login
            </Link>
          </div>

          <button
            type="submit"
            disabled={forgotSubmitting}
            className="bg-black text-white font-light px-8 py-2 mt-2 w-full disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {forgotSubmitting ? "Sending..." : "Send OTP"}
          </button>
        </form>
      )}

      {/* Reset password — OTP + new password */}
      {currentState === "Reset Password" && (
        <form
          onSubmit={resetHandleSubmit}
          className="flex flex-col items-center w-[90%] sm:max-w-96 bg-white p-8 gap-4 text-gray-800 shadow-sm"
        >
          <div className="inline-flex items-center gap-2 mb-2">
            <p className="text-3xl">Reset Password</p>
            <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
          </div>

          <p className="text-sm text-gray-500 text-center">
            OTP sent to{" "}
            <span className="font-semibold text-gray-800">{pendingEmail}</span>
          </p>

          <FormInput
            type="text"
            placeholder="Enter OTP"
            maxLength={6}
            error={resetErrors.otp?.message}
            className="w-full px-3 py-2 border border-gray-800 outline-none tracking-widest text-center text-lg"
            {...resetRegister("otp")}
          />
          <FormInput
            type="password"
            placeholder="New Password"
            error={resetErrors.newPassword?.message}
            {...resetRegister("newPassword")}
          />
          <FormInput
            type="password"
            placeholder="Confirm New Password"
            error={resetErrors.confirmPassword?.message}
            {...resetRegister("confirmPassword")}
          />

          <div className="w-full flex justify-end text-sm">
            <Link to="/login" className="hover:underline text-gray-500">
              Back to Login
            </Link>
          </div>

          <button
            type="submit"
            disabled={resetSubmitting}
            className="bg-black text-white font-light px-8 py-2 mt-2 w-full disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {resetSubmitting ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;