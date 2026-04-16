const Pagination = ({ page, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
    .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
    .reduce((acc, p, idx, arr) => {
      if (idx > 0 && p - arr[idx - 1] > 1) acc.push("...");
      acc.push(p);
      return acc;
    }, []);

  return (
    <div className="flex items-center justify-center gap-1.5 py-4">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm text-gray-600 hover:border-orange-400 hover:text-orange-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        Prev
      </button>
      {pages.map((p, i) =>
        p === "..." ? (
          <span key={`e-${i}`} className="px-2 text-gray-400 text-sm">...</span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`w-9 h-9 rounded-lg text-sm transition-colors ${
              page === p
                ? "bg-orange-500 text-white font-medium"
                : "border border-gray-200 text-gray-600 hover:border-orange-400 hover:text-orange-500"
            }`}
          >
            {p}
          </button>
        )
      )}
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm text-gray-600 hover:border-orange-400 hover:text-orange-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;