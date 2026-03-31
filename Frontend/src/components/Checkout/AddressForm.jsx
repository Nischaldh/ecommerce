import FormInput from "../FormInput";

const AddressForm = ({ register, errors, saveAddress, setSaveAddress, showSaveOption }) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <FormInput
          placeholder="Full Name"
          error={errors.fullName?.message}
          {...register("fullName")}
        />
        <FormInput
          placeholder="Phone Number"
          error={errors.phone?.message}
          {...register("phone")}
        />
      </div>

      <FormInput
        placeholder="Address Line 1"
        error={errors.addressLine1?.message}
        {...register("addressLine1")}
      />
      <FormInput
        placeholder="Address Line 2 (optional)"
        error={errors.addressLine2?.message}
        {...register("addressLine2")}
      />

      <div className="grid grid-cols-2 gap-3">
        <FormInput
          placeholder="City"
          error={errors.city?.message}
          {...register("city")}
        />
        <FormInput
          placeholder="State"
          error={errors.state?.message}
          {...register("state")}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <FormInput
          placeholder="Postal Code"
          error={errors.postalCode?.message}
          {...register("postalCode")}
        />
        <FormInput
          placeholder="Country"
          error={errors.country?.message}
          {...register("country")}
        />
      </div>

      {/* Save address option — only shown when entering new address */}
      {showSaveOption && (
        <label className="flex items-center gap-2 cursor-pointer mt-1">
          <input
            type="checkbox"
            checked={saveAddress}
            onChange={(e) => setSaveAddress(e.target.checked)}
            className="size-4 rounded border-gray-300 accent-orange-500"
          />
          <span className="text-sm text-gray-600">Save this address for future orders</span>
        </label>
      )}
    </div>
  );
};

export default AddressForm;