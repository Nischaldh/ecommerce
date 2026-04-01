import { Pencil, Trash2, Check, X, Plus, Minus } from "lucide-react";

const MyProductCard = ({
  product,
  stockEdit,
  confirmingStockId,
  savingStock,
  onEdit,
  onDelete,
  onStockIncrement,
  onStockDecrement,
  onConfirmStock,
  onCancelStockEdit,
}) => {
  const displayStock = stockEdit ?? product.stock;
  const isConfirming = confirmingStockId === product.id;

  return (
    <div className="flex gap-3 bg-white border border-gray-100 rounded-xl p-3 hover:shadow-sm transition-shadow">

      {/* Image */}
      <div className="size-20 rounded-lg overflow-hidden bg-gray-100 shrink-0">
        <img
          src={product.primaryImage}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Details */}
      <div className="flex flex-1 min-w-0 gap-2 flex-col sm:flex-row sm:items-center">

        {/* Name + desc */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 text-sm truncate">{product.name}</h3>
          <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">{product.description}</p>
          <div className="flex items-center gap-3 mt-1.5 flex-wrap">
            <span className="text-orange-500 font-bold text-sm">
              Rs. {Number(product.price).toLocaleString("en-NP")}
            </span>
            <span className="text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full capitalize">
              {product.category}
            </span>
          </div>
        </div>

        {/* Stock control */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex flex-col items-center gap-1">
            <p className="text-xs text-gray-400">Stock</p>
            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden h-8">
              <button
                onClick={() => onStockDecrement(product.id, product.stock)}
                className="w-8 flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <Minus className="size-3" />
              </button>
              <span className="w-10 text-center text-sm font-medium text-gray-800 border-x border-gray-200">
                {displayStock}
              </span>
              <button
                onClick={() => onStockIncrement(product.id, product.stock)}
                className="w-8 flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <Plus className="size-3" />
              </button>
            </div>
          </div>

          {/* Confirm stock change */}
          {isConfirming && (
            <div className="flex flex-col gap-1">
              <button
                onClick={() => onConfirmStock(product)}
                disabled={savingStock}
                className="size-7 bg-green-500 text-white rounded-lg flex items-center justify-center hover:bg-green-600 transition-colors disabled:opacity-60"
              >
                <Check className="size-3.5" />
              </button>
              <button
                onClick={() => onCancelStockEdit(product.id)}
                className="size-7 bg-gray-100 text-gray-600 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <X className="size-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Edit + Delete */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => onEdit(product)}
            className="size-8 border border-blue-200 text-blue-500 rounded-lg flex items-center justify-center hover:bg-blue-50 transition-colors"
          >
            <Pencil className="size-3.5" />
          </button>
          <button
            onClick={() => onDelete(product.id)}
            className="size-8 border border-red-200 text-red-500 rounded-lg flex items-center justify-center hover:bg-red-50 transition-colors"
          >
            <Trash2 className="size-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyProductCard;