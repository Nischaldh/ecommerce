import { Link } from "react-router-dom";
import { useSignup } from "../../hooks/auth/useSignup";
import FormInput from "../../components/FormInput";

const Signup = () => {
  const {
    currentState,
    pendingEmail,
    signupRegister, signupHandleSubmit, signupErrors, signupSubmitting,
    otpRegister, otpHandleSubmit, otpErrors, otpSubmitting,
  } = useSignup();

  return (
    <div className="min-h-screen flex items-center justify-center -mt-20">

      {/* Sign Up form */}
      {currentState === "Sign Up" && (
        <form
          onSubmit={signupHandleSubmit}
          className="flex flex-col items-center w-[90%] sm:max-w-96  p-8 gap-4 text-gray-800"
        >
          <div className="inline-flex items-center gap-2 mb-2">
            <p className="text-3xl">Sign Up</p>
            <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
          </div>

          <FormInput
            type="text"
            placeholder="Name"
            error={signupErrors.name?.message}
            {...signupRegister("name")}
          />
          <FormInput
            type="email"
            placeholder="Email"
            error={signupErrors.email?.message}
            {...signupRegister("email")}
          />
          <FormInput
            type="password"
            placeholder="Password"
            error={signupErrors.password?.message}
            {...signupRegister("password")}
          />
          <FormInput
            type="password"
            placeholder="Confirm Password"
            error={signupErrors.confirmPassword?.message}
            {...signupRegister("confirmPassword")}
          />

          <div className="w-full flex flex-col gap-1">
            <select
              className={`w-full px-3 py-2 border outline-none ${
                signupErrors.role ? "border-red-500" : "border-gray-800"
              }`}
              {...signupRegister("role")}
            >
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
            </select>
            {signupErrors.role && (
              <p className="text-red-500 text-xs">{signupErrors.role.message}</p>
            )}
          </div>

          <div className="w-full flex justify-end text-sm">
            <Link to="/login" className="hover:underline">
              Already have an account?
            </Link>
          </div>

          <button
            type="submit"
            disabled={signupSubmitting}
            className="bg-black text-white font-light px-8 py-2 mt-2 w-full disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {signupSubmitting ? "Please wait..." : "Create Account"}
          </button>
        </form>
      )}

      {/* OTP verification form */}
      {currentState === "Verify OTP" && (
        <form
          onSubmit={otpHandleSubmit}
          className="flex flex-col items-center w-[90%] sm:max-w-96 bg-white p-8 gap-4 text-gray-800 shadow-sm"
        >
          <div className="inline-flex items-center gap-2 mb-2">
            <p className="text-3xl">Verify Email</p>
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
            className="w-full px-3 py-2 border border-gray-800 outline-none tracking-widest text-center text-lg"
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

export default Signup;