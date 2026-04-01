import FormInput from "../FormInput";

const ChangePassword = ({
  passwordRegister, passwordHandleSubmit, passwordErrors, passwordSubmitting,
}) => {
  return (
    <div className="flex flex-col gap-3">
      <div>
        <h3 className="font-semibold text-gray-800 text-sm">Change Password</h3>
        <p className="text-xs text-gray-500 mt-0.5">
          Leave blank if you don't want to change your password
        </p>
      </div>
      <form onSubmit={passwordHandleSubmit} className="flex flex-col gap-3">
        <FormInput
          type="password"
          placeholder="Current password"
          error={passwordErrors.currentPassword?.message}
          {...passwordRegister("currentPassword")}
        />
        <FormInput
          type="password"
          placeholder="New password"
          error={passwordErrors.newPassword?.message}
          {...passwordRegister("newPassword")}
        />
        <FormInput
          type="password"
          placeholder="Confirm new password"
          error={passwordErrors.confirmNewPassword?.message}
          {...passwordRegister("confirmNewPassword")}
        />
        <button
          type="submit"
          disabled={passwordSubmitting}
          className="self-start px-6 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-60"
        >
          {passwordSubmitting ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;