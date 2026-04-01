import { X } from "lucide-react";
import { useEffect } from "react";
import FormInput from "../FormInput";
import { categories } from "@/constants/constants";


const ProductModal = ({ isOpen, onClose, editingProduct, form, onSubmit }) => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = form;

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-xl">

        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100 sticky top-0 bg-white z-10">
          <h2 className="font-bold text-gray-900 text-lg">
            {editingProduct ? "Edit Product" : "Add New Product"}
          </h2>
          <button
            onClick={onClose}
            className="size-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-5 flex flex-col gap-4">

          {/* Primary image */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">
              Primary Image {!editingProduct && <span className="text-red-500">*</span>}
            </label>
            <input
              type="file"
              accept="image/*"
              {...register("primaryImage")}
              className="text-sm text-gray-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-sm file:bg-orange-50 file:text-orange-500 hover:file:bg-orange-100 transition-colors"
            />
            {errors.primaryImage && (
              <p className="text-red-500 text-xs">{errors.primaryImage.message}</p>
            )}
          </div>

          {/* Additional images */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">
              Additional Images{" "}
              <span className="text-gray-400 font-normal">(up to 5, optional)</span>
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              {...register("images")}
              className="text-sm text-gray-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-sm file:bg-orange-50 file:text-orange-500 hover:file:bg-orange-100 transition-colors"
            />
          </div>

          <FormInput
            placeholder="Product Name"
            error={errors.name?.message}
            {...register("name")}
          />

          <div className="flex flex-col gap-1.5">
            <textarea
              placeholder="Description"
              rows={3}
              {...register("description")}
              className={`w-full px-3 py-2 border rounded-lg text-sm outline-none focus:border-orange-400 resize-none transition-colors ${
                errors.description ? "border-red-500" : "border-gray-800"
              }`}
            />
            {errors.description && (
              <p className="text-red-500 text-xs">{errors.description.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <FormInput
              type="number"
              placeholder="Price (Rs.)"
              min={0}
              error={errors.price?.message}
              {...register("price", { valueAsNumber: true })}
            />
            <FormInput
              type="number"
              placeholder="Stock"
              min={0}
              error={errors.stock?.message}
              {...register("stock", { valueAsNumber: true })}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <select
              {...register("category")}
              className={`w-full px-3 py-2 border rounded-lg text-sm outline-none focus:border-orange-400 transition-colors ${
                errors.category ? "border-red-500" : "border-gray-800"
              }`}
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.value}>{cat.name}</option>
              ))}
            </select>
            {errors.category && (
              <p className="text-red-500 text-xs">{errors.category.message}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 border border-gray-200 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-2.5 bg-orange-500 text-white rounded-xl text-sm font-medium hover:bg-orange-600 transition-colors disabled:opacity-60"
            >
              {isSubmitting
                ? "Saving..."
                : editingProduct ? "Save Changes" : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;