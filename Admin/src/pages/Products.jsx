import ProductTable from "@/components/Products/ProductTable";
import PageHeader from "@/components/shared/PageHeader";
import Pagination from "@/components/shared/Pagination";
import SearchBar from "@/components/shared/Searchbar";
import TableSkeleton from "@/components/shared/TableSkeleton";
import { useProducts } from "@/hooks/useProducts";
import { Package } from "lucide-react";



const Products = () => {
  const {
    products, total, loading, page, totalPages,
    search, setSearch, deletingId, setPage, handleDelete,
  } = useProducts();

  return (
    <div className="flex flex-col gap-5">
      <PageHeader title="Products" subtitle={`${total} products listed`} />

      <SearchBar
        value={search}
        onChange={(v) => { setSearch(v); setPage(1); }}
        placeholder="Search by product name..."
      />

      {loading ? (
        <TableSkeleton rows={8} cols={6} />
      ) : products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
          <Package className="size-12 opacity-20 mb-3" />
          <p className="font-semibold">No products found</p>
        </div>
      ) : (
        <ProductTable
          products={products}
          deletingId={deletingId}
          onDelete={handleDelete}
        />
      )}

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
};

export default Products;