import FormInput from "../FormInput";

const UpdateNameEmail = ({
  user,
  emailOtpSent,
  setEmailOtpSent,
  nameRegister, nameHandleSubmit, nameErrors, nameSubmitting,
  emailRegister, emailHandleSubmit, emailErrors, emailSubmitting,
  otpRegister, otpHandleSubmit, otpErrors, otpSubmitting,
}) => {
  return (
    <div className="flex flex-col gap-6">

      {/* Update name */}
      <div className="flex flex-col gap-3">
        <h3 className="font-semibold text-gray-800 text-sm">Display Name</h3>
        <form onSubmit={nameHandleSubmit} className="flex gap-2">
          <div className="flex-1">
            <FormInput
              placeholder="Your name"
              defaultValue={user?.name}
              error={nameErrors.name?.message}
              {...nameRegister("name")}
            />
          </div>
          <button
            type="submit"
            disabled={nameSubmitting}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors disabled:opacity-60 shrink-0"
          >
            {nameSubmitting ? "Saving..." : "Save"}
          </button>
        </form>
      </div>

      <hr className="border-gray-100" />

      {/* Update email */}
      <div className="flex flex-col gap-3">
        <div>
          <h3 className="font-semibold text-gray-800 text-sm">Email Address</h3>
          <p className="text-xs text-gray-500 mt-0.5">Current: {user?.email}</p>
        </div>

        {!emailOtpSent ? (
          <form onSubmit={emailHandleSubmit} className="flex gap-2">
            <div className="flex-1">
              <FormInput
                type="email"
                placeholder="New email address"
                error={emailErrors.newEmail?.message}
                {...emailRegister("newEmail")}
              />
            </div>
            <button
              type="submit"
              disabled={emailSubmitting}
              className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors disabled:opacity-60 shrink-0"
            >
              {emailSubmitting ? "Sending..." : "Send OTP"}
            </button>
          </form>
        ) : (
          <div className="flex flex-col gap-3">
            <p className="text-xs text-gray-500">
              OTP sent to your new email. Enter it below to confirm.
            </p>
            <form onSubmit={otpHandleSubmit} className="flex gap-2">
              <div className="flex-1">
                <FormInput
                  placeholder="6-digit OTP"
                  maxLength={6}
                  error={otpErrors.otp?.message}
                  {...otpRegister("otp")}
                />
              </div>
              <button
                type="submit"
                disabled={otpSubmitting}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors disabled:opacity-60 shrink-0"
              >
                {otpSubmitting ? "Verifying..." : "Verify"}
              </button>
            </form>
            <button
              onClick={() => setEmailOtpSent(false)}
              className="text-xs text-gray-400 hover:text-gray-600 text-left"
            >
              ← Use a different email
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdateNameEmail;