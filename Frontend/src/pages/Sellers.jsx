import { Search, Users, X } from "lucide-react";
import { useSellersPage } from "@/hooks/sellers/useSellersPage";
import SellerCardSkeleton from "@/components/Sellers/SellerCardSkeleton";
import SellerCard from "@/components/Sellers/SellerCard";


const Sellers = () => {
  const {
    sellers, total, loading, filters, totalPages,
    searchInput, setSearchInput, handlePageChange,
  } = useSellersPage();

  return (
    <div className="py-6 flex flex-col gap-6">

      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Sellers</h1>
        <p className="text-sm text-gray-500 mt-1">{total} sellers on the platform</p>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search sellers by name..."
          className="w-full pl-9 pr-9 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-orange-400 transition-colors"
        />
        {searchInput && (
          <button
            onClick={() => setSearchInput("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="size-4" />
          </button>
        )}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {Array.from({ length: 12 }).map((_, i) => <SellerCardSkeleton key={i} />)}
        </div>
      ) : sellers.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
          <Users className="size-14 opacity-20 mb-3" />
          <p className="text-lg font-semibold">No sellers found</p>
          {searchInput && (
            <p className="text-sm mt-1">No results for "{searchInput}"</p>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {sellers.map((seller) => <SellerCard key={seller.id} seller={seller} />)}
        </div>
      )}

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div className="flex items-center justify-center gap-1.5 py-4">
          <button
            onClick={() => handlePageChange(filters.page - 1)}
            disabled={filters.page === 1}
            className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm text-gray-600 hover:border-orange-400 hover:text-orange-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter((p) => p === 1 || p === totalPages || Math.abs(p - filters.page) <= 1)
            .reduce((acc, p, idx, arr) => {
              if (idx > 0 && p - arr[idx - 1] > 1) acc.push("...");
              acc.push(p);
              return acc;
            }, [])
            .map((p, i) =>
              p === "..." ? (
                <span key={`e-${i}`} className="px-2 text-gray-400 text-sm">...</span>
              ) : (
                <button
                  key={p}
                  onClick={() => handlePageChange(p)}
                  className={`w-9 h-9 rounded-lg text-sm transition-colors ${
                    filters.page === p
                      ? "bg-orange-500 text-white font-medium"
                      : "border border-gray-200 text-gray-600 hover:border-orange-400 hover:text-orange-500"
                  }`}
                >
                  {p}
                </button>
              )
            )}
          <button
            onClick={() => handlePageChange(filters.page + 1)}
            disabled={filters.page === totalPages}
            className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm text-gray-600 hover:border-orange-400 hover:text-orange-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Sellers;