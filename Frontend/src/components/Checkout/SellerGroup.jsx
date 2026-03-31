const SellerGroup = ({ group }) => {
  const groupTotal = group.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="flex flex-col gap-3 p-4 bg-gray-50 rounded-xl">
      {/* Seller header */}
      <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
        <div className="size-6 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
          <span className="text-orange-500 text-[10px] font-bold">
            {group.sellerName?.charAt(0).toUpperCase()}
          </span>
        </div>
        <span className="text-sm font-semibold text-gray-700">{group.sellerName}</span>
      </div>

      {/* Items */}
      <div className="flex flex-col gap-2">
        {group.items.map((item) => (
          <div key={item.id} className="flex items-center gap-3">
            <div className="size-12 rounded-lg overflow-hidden bg-white shrink-0">
              <img
                src={item.product.primaryImage}
                alt={item.product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {item.product.name}
              </p>
              <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
            </div>
            <p className="text-sm font-semibold text-orange-500 shrink-0">
              Rs. {(item.product.price * item.quantity).toLocaleString("en-NP")}
            </p>
          </div>
        ))}
      </div>

      {/* Group subtotal */}
      <div className="flex justify-between items-center pt-2 border-t border-gray-200">
        <span className="text-xs text-gray-500">Subtotal</span>
        <span className="text-sm font-semibold text-gray-800">
          Rs. {groupTotal.toLocaleString("en-NP")}
        </span>
      </div>
    </div>
  );
};

export default SellerGroup;