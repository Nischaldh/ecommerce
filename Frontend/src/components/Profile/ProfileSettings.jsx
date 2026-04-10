import { useProfile } from "@/hooks/profile/useProfile";
import AvatarUpload from "./AvatarUpload";
import UpdateNameEmail from "./UpdateNameEmail";
import ChangePassword from "./ChangePassword";
import SellerPaymentInfo from "./SellerPaymentInfo";


const ProfileSettings = () => {
  const {
    user, uploadingPic, emailOtpSent, setEmailOtpSent,
    handleUploadPic,
    nameRegister, nameHandleSubmit, nameErrors, nameSubmitting,
    emailRegister, emailHandleSubmit, emailErrors, emailSubmitting,
    otpRegister, otpHandleSubmit, otpErrors, otpSubmitting,
    passwordRegister, passwordHandleSubmit, passwordErrors, passwordSubmitting,
  } = useProfile();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-lg font-bold text-gray-900">Profile Settings</h2>
        <p className="text-sm text-gray-500 mt-0.5">Update your account details</p>
      </div>

      {/* Avatar */}
      <div className="flex justify-center py-2">
        <AvatarUpload
          user={user}
          uploadingPic={uploadingPic}
          onUpload={handleUploadPic}
        />
      </div>

      <hr className="border-gray-100" />

      {/* Name + Email */}
      <UpdateNameEmail
        user={user}
        emailOtpSent={emailOtpSent}
        setEmailOtpSent={setEmailOtpSent}
        nameRegister={nameRegister}
        nameHandleSubmit={nameHandleSubmit}
        nameErrors={nameErrors}
        nameSubmitting={nameSubmitting}
        emailRegister={emailRegister}
        emailHandleSubmit={emailHandleSubmit}
        emailErrors={emailErrors}
        emailSubmitting={emailSubmitting}
        otpRegister={otpRegister}
        otpHandleSubmit={otpHandleSubmit}
        otpErrors={otpErrors}
        otpSubmitting={otpSubmitting}
      />

      <hr className="border-gray-100" />

      {/* Password */}
      <ChangePassword
        passwordRegister={passwordRegister}
        passwordHandleSubmit={passwordHandleSubmit}
        passwordErrors={passwordErrors}
        passwordSubmitting={passwordSubmitting}
      />
            {user?.role === "seller" && (
        <>
          <hr className="border-gray-100" />
          <SellerPaymentInfo />
        </>
      )}

    </div>
  );
};

export default ProfileSettings;