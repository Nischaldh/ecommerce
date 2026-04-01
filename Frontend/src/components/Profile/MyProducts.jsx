import { Plus } from "lucide-react";
import { useMyProducts } from "@/hooks/profile/useMyProducts";
import MyProductCard from "./MyProductCard";
import ProductModal from "./ProductModal";
import MyProductSkeleton from "./MyProductSkeleton";



const MyProducts = () => {
  const {
    products, total, loading,
    modalOpen, editingProduct,
    stockEdits, confirmingStockId, savingStock,
    form,
    handleOpenAdd, handleOpenEdit, handleCloseModal,
    onSubmitProduct,
    handleStockIncrement, handleStockDecrement,
    handleConfirmStock, handleCancelStockEdit,
    handleDelete,
  } = useMyProducts();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900">My Products</h2>
          <p className="text-sm text-gray-500 mt-0.5">{total} products listed</p>
        </div>
      </div>

      {loading ? (
        <MyProductSkeleton />
      ) : products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-gray-400">
          <p className="text-lg font-semibold">No products yet</p>
          <p className="text-sm mt-1">Click the + button to add your first product</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {products.map((product) => (
            <MyProductCard
              key={product.id}
              product={product}
              stockEdit={stockEdits[product.id]}
              confirmingStockId={confirmingStockId}
              savingStock={savingStock}
              onEdit={handleOpenEdit}
              onDelete={handleDelete}
              onStockIncrement={handleStockIncrement}
              onStockDecrement={handleStockDecrement}
              onConfirmStock={handleConfirmStock}
              onCancelStockEdit={handleCancelStockEdit}
            />
          ))}
        </div>
      )}

      {/* FAB — add product */}
      <button
        onClick={handleOpenAdd}
        className="fixed bottom-8 right-8 size-14 bg-orange-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-orange-600 transition-colors z-40"
      >
        <Plus className="size-6" />
      </button>

      <ProductModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        editingProduct={editingProduct}
        form={form}
        onSubmit={onSubmitProduct}
      />
    </div>
  );
};

export default MyProducts;