import { useAdminLogin } from "@/hooks/auth/useLogin";
import { Eye, EyeOff, ShieldCheck } from "lucide-react";
import { useState } from "react";



const Login = () => {
  const { form, errors, loading, handleChange, handleSubmit } = useAdminLogin();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 w-full max-w-md p-8 flex flex-col gap-6">

        {/* Header */}
        <div className="flex flex-col items-center gap-3">
          <div className="size-14 rounded-2xl bg-orange-500 flex items-center justify-center">
            <ShieldCheck className="size-7 text-white" />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Admin Portal</h1>
            <p className="text-sm text-gray-500 mt-1">Sign in to manage the platform</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              value={form.email}
              onChange={handleChange("email")}
              placeholder="admin@example.com"
              className={`w-full px-3 py-2.5 border rounded-xl text-sm ${
                errors.email
                  ? "border-red-400"
                  : "border-gray-200 focus:border-orange-400"
              }`}
            />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleChange("password")}
                placeholder="Enter your password"
                className={`w-full px-3 py-2.5 pr-10 border rounded-xl text-sm ${
                  errors.password
                    ? "border-red-400"
                    : "border-gray-200 focus:border-orange-400"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-red-500">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-orange-500 text-white rounded-xl"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;