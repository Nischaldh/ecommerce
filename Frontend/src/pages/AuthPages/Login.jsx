// pages/Login.jsx
import { Link } from "react-router-dom";
import { useLogin } from "../../hooks/auth/useLogin";
import FormInput from "../../components/FormInput";

const Login = () => {
  const { register, handleSubmit, errors, isSubmitting } = useLogin();

  return (
    <div className="min-h-screen flex items-center justify-center -mt-20">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center w-[90%] sm:max-w-96  p-8 gap-4 text-gray-800 "
      >
        <div className="inline-flex items-center gap-2 mb-2">
          <p className="text-3xl">Login</p>
          <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
        </div>

        <FormInput
          type="email"
          placeholder="Email"
          error={errors.email?.message}
          {...register("email")}
        />

        <FormInput
          type="password"
          placeholder="Password"
          error={errors.password?.message}
          {...register("password")}
        />

        <div className="w-full flex justify-between text-sm">
          <Link to="/forgot-password" className="hover:underline text-gray-500">
            Forgot Password?
          </Link>
          <Link to="/signup" className="hover:underline">
            Create Account
          </Link>
        </div>
        <div className="flex w-full justify-between text-sm">
          <Link to="/verify-email" className="hover:underline text-gray-500">
            Verify your email
          </Link>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-black text-white font-light px-8 py-2 mt-2 w-full disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
};

export default Login;
