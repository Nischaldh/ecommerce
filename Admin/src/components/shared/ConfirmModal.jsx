const ConfirmModal = ({ open, title, message, confirmLabel = "Confirm", danger = false, onConfirm, onClose }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-2xl w-full max-w-sm p-6 flex flex-col gap-4 shadow-xl">
        <h2 className="font-bold text-gray-900 text-lg">{title}</h2>
        <p className="text-sm text-gray-600">{message}</p>
        <div className="flex gap-3 mt-1">
          <button
            onClick={onClose}
            className="flex-1 py-2 border border-gray-200 text-gray-600 rounded-xl text-sm hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 py-2 rounded-xl text-sm font-medium text-white transition-colors ${
              danger ? "bg-red-500 hover:bg-red-600" : "bg-orange-500 hover:bg-orange-600"
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;