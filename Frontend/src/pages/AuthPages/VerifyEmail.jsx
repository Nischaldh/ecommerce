
import FormInput from "@/components/FormInput";
import { useVerifyEmail } from "@/hooks/auth/useVerifyEmail";
import { Link } from "react-router-dom";


const VerifyEmail = () => {
  const {
    currentState,
    pendingEmail,
    emailRegister, emailHandleSubmit, emailErrors, emailSubmitting,
    otpRegister, otpHandleSubmit, otpErrors, otpSubmitting,
  } = useVerifyEmail();

  return (
    <div className="min-h-screen flex items-center justify-center -mt-20">

      {/* Step 1 — enter email */}
      {currentState === "Enter Email" && (
        <form
          onSubmit={emailHandleSubmit}
          className="flex flex-col items-center w-[90%] sm:max-w-96 bg-white p-8 gap-4 text-gray-800 shadow-sm"
        >
          <div className="inline-flex items-center gap-2 mb-2">
            <p className="text-3xl">Verify Email</p>
            <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
          </div>

          <p className="text-sm text-gray-500 text-center w-full">
            Enter your email address and we'll send you a verification OTP.
          </p>

          <FormInput
            type="email"
            placeholder="Email"
            error={emailErrors.email?.message}
            {...emailRegister("email")}
          />

          <div className="w-full flex justify-end text-sm">
            <Link to="/login" className="hover:underline text-gray-500">
              Back to Login
            </Link>
          </div>

          <button
            type="submit"
            disabled={emailSubmitting}
            className="bg-black text-white font-light px-8 py-2 mt-2 w-full disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {emailSubmitting ? "Sending..." : "Send OTP"}
          </button>
        </form>
      )}

      {/* Step 2 — enter OTP */}
      {currentState === "Verify OTP" && (
        <form
          onSubmit={otpHandleSubmit}
          className="flex flex-col items-center w-[90%] sm:max-w-96 bg-white p-8 gap-4 text-gray-800 shadow-sm"
        >
          <div className="inline-flex items-center gap-2 mb-2">
            <p className="text-3xl">Enter OTP</p>
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
            error={otpErrors.otp?.message}
            {...otpRegister("otp")}
          />

          <button
            type="submit"
            disabled={otpSubmitting}
            className="bg-black text-white font-light px-8 py-2 mt-2 w-full disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {otpSubmitting ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      )}
    </div>
  );
};

export default VerifyEmail;