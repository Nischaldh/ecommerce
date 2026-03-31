import { MapPin, Check } from "lucide-react";

const SavedAddresses = ({ addresses, selectedAddressId, onSelect }) => {
  if (addresses.length === 0) return null;

  return (
    <div className="flex flex-col gap-2">
      {addresses.map((address) => (
        <button
          key={address.id}
          onClick={() => onSelect(address.id)}
          className={`w-full text-left p-3 rounded-xl border-2 transition-colors ${
            selectedAddressId === address.id
              ? "border-orange-500 bg-orange-50"
              : "border-gray-100 hover:border-orange-200 bg-white"
          }`}
        >
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-start gap-2">
              <MapPin className={`size-4 mt-0.5 shrink-0 ${
                selectedAddressId === address.id ? "text-orange-500" : "text-gray-400"
              }`} />
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-medium text-sm text-gray-900">{address.fullName}</p>
                  {address.isDefault && (
                    <span className="text-[10px] bg-orange-100 text-orange-500 px-1.5 py-0.5 rounded font-medium">
                      Default
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-0.5">
                  {address.addressLine1}
                  {address.addressLine2 && `, ${address.addressLine2}`}
                </p>
                <p className="text-xs text-gray-500">
                  {address.city}, {address.state} {address.postalCode}
                </p>
                <p className="text-xs text-gray-500">{address.phone}</p>
              </div>
            </div>

            {selectedAddressId === address.id && (
              <div className="size-5 rounded-full bg-orange-500 flex items-center justify-center shrink-0">
                <Check className="size-3 text-white" />
              </div>
            )}
          </div>
        </button>
      ))}
    </div>
  );
};

export default SavedAddresses;