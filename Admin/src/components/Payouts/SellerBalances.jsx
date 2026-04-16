const SellerBalances = ({ balances, loading }) => {
  if (loading) return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-pulse">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="h-28 bg-gray-100 rounded-xl" />
      ))}
    </div>
  );

  if (!balances.length) return null;

  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-semibold text-gray-800 text-sm">Seller Balances</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {balances.map((b) => (
          <div key={b.id} className="bg-white border border-gray-100 rounded-xl p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-gray-900 text-sm truncate">{b.sellerName ?? "Seller"}</p>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <p className="text-[11px] text-gray-400">Pending</p>
                <p className="text-sm font-bold text-yellow-600">
                  Rs. {Number(b.pendingAmount).toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-[11px] text-gray-400">Available</p>
                <p className="text-sm font-bold text-green-600">
                  Rs. {Number(b.availableAmount).toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-[11px] text-gray-400">Paid Out</p>
                <p className="text-sm font-bold text-gray-700">
                  Rs. {Number(b.totalPaidOut).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SellerBalances;