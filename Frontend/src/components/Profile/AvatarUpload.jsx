import { Camera } from "lucide-react";
import { useRef } from "react";

const AvatarUpload = ({ user, uploadingPic, onUpload }) => {
  const inputRef = useRef(null);

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative">
        <div className="size-24 rounded-full bg-orange-100 overflow-hidden flex items-center justify-center ring-4 ring-orange-50">
          {user?.profilePic ? (
            <img src={user.profilePic} alt={user.name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-orange-500 text-3xl font-bold">
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </span>
          )}
        </div>
        <button
          onClick={() => inputRef.current?.click()}
          disabled={uploadingPic}
          className="absolute bottom-0 right-0 size-8 bg-orange-500 text-white rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors disabled:opacity-60"
        >
          <Camera className="size-4" />
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={onUpload}
        />
      </div>
      <div className="text-center">
        <p className="font-semibold text-gray-900">{user?.name}</p>
        <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
      </div>
      {uploadingPic && (
        <p className="text-xs text-orange-500 animate-pulse">Uploading...</p>
      )}
    </div>
  );
};

export default AvatarUpload;