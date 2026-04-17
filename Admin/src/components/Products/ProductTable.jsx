import { Trash2 } from "lucide-react";
import ConfirmModal from "../shared/ConfirmModal";
import { useState } from "react";

const ProductTable = ({ products, deletingId, onDelete }) => {
  const [confirmId, setConfirmId] = useState(null);

  return (
    <>
      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">
                  Product
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">
                  Seller
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">
                  Price
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">
                  Stock
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">
                  Category
                </th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {products.map((p) => (
                <tr
                  key={p.id}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="size-10 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                        <img
                          src={p.primaryImage}
                          alt={p.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 truncate max-w-40">
                          {p.name}
                        </p>
                        <p className="text-xs text-gray-400">
                          {new Date(p.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {p.seller?.name ?? "—"}
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-900">
                    Rs. {Number(p.price).toLocaleString("en-NP")}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-sm font-medium ${
                        p.stock === 0
                          ? "text-red-500"
                          : p.stock < 10
                            ? "text-yellow-500"
                            : "text-green-600"
                      }`}
                    >
                      {p.stock}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full capitalize">
                      {p.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => setConfirmId(p.id)}
                      disabled={deletingId === p.id}
                      className="p-1.5 rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors disabled:opacity-50"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmModal
        open={!!confirmId}
        title="Delete Product"
        message="This will permanently remove the product from the platform. This action cannot be undone."
        confirmLabel="Delete"
        danger
        onConfirm={(note) => {
          onDelete(confirmId, note);
          setConfirmId(null);
        }}
        onClose={() => setConfirmId(null)}
      />
    </>
  );
};

export default ProductTable;
