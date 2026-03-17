const FormInput = ({  error, ...props }) => {
  return (
    <div className="w-full flex flex-col gap-1">
      <input
        className={`w-full px-3 py-2 border outline-none ${
          error ? "border-red-500" : "border-gray-800"
        }`}
        {...props}
      />
      {error && (
        <p className="text-red-500 text-xs">{error}</p>
      )}
    </div>
  );
};

export default FormInput;
