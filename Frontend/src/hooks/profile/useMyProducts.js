/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useProducts } from "../products/useProduct";
import { addProductSchema } from "@/validations/validations";
import { categories } from "@/constants/constants";
import { useAuth } from "../auth/useAuth";
import { getSellerProductsService } from "@/services/seller.service";

export const useMyProducts = () => {
  const { user } = useAuth();
  const {
    loading,
    createProduct,
    editProduct,
    deleteProduct,
  } = useProducts();

  // own state for seller's products (separate from the global product list)
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [fetchingProducts, setFetchingProducts] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [stockEdits, setStockEdits] = useState({});
  const [confirmingStockId, setConfirmingStockId] = useState(null);
  const [savingStock, setSavingStock] = useState(false);

  const form = useForm({
    resolver: yupResolver(addProductSchema),
    defaultValues: { name: "", description: "", price: 0, category: "", stock: 0 },
  });

  const fetchMyProducts = useCallback(async () => {
    if (!user?.id) return;
    setFetchingProducts(true);
    const res = await getSellerProductsService(user.id, { pageSize: 100 });
    if (res.success) {
      setProducts(res.products);
      setTotal(res.total);
    }
    setFetchingProducts(false);
  }, [user]);

  useEffect(() => {
    fetchMyProducts();
  }, [fetchMyProducts]);

  const handleOpenAdd = useCallback(() => {
    setEditingProduct(null);
    form.reset({ name: "", description: "", price: 0, category: "", stock: 0 });
    setModalOpen(true);
  }, [form]);

  const handleOpenEdit = useCallback((product) => {
    setEditingProduct(product);
    form.reset({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      stock: product.stock,
    });
    setModalOpen(true);
  }, [form]);

  const handleCloseModal = useCallback(() => {
    setModalOpen(false);
    setEditingProduct(null);
    form.reset();
  }, [form]);

  const onSubmitProduct = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("category", data.category);
    formData.append("stock", data.stock);

    if (data.primaryImage?.[0]) formData.append("primaryImage", data.primaryImage[0]);
    if (data.images) {
      Array.from(data.images).forEach((file) => formData.append("images", file));
    }

    let res;
    if (editingProduct) {
      res = await editProduct(editingProduct.id, formData);
    } else {
      res = await createProduct(formData);
    }

    if (res.success) {
      handleCloseModal();
      fetchMyProducts(); 
    }
  };

  const handleStockChange = useCallback((productId, value) => {
    const parsed = parseInt(value);
    if (isNaN(parsed) || parsed < 0) return;
    setStockEdits((prev) => ({ ...prev, [productId]: parsed }));
    setConfirmingStockId(productId);
  }, []);

  const handleStockIncrement = useCallback((productId, currentStock) => {
    const newVal = (stockEdits[productId] ?? currentStock) + 1;
    setStockEdits((prev) => ({ ...prev, [productId]: newVal }));
    setConfirmingStockId(productId);
  }, [stockEdits]);

  const handleStockDecrement = useCallback((productId, currentStock) => {
    const current = stockEdits[productId] ?? currentStock;
    if (current <= 0) return;
    setStockEdits((prev) => ({ ...prev, [productId]: current - 1 }));
    setConfirmingStockId(productId);
  }, [stockEdits]);

  const handleConfirmStock = useCallback(async (product) => {
    const newStock = stockEdits[product.id];
    if (newStock === undefined || newStock === product.stock) {
      setConfirmingStockId(null);
      return;
    }
    setSavingStock(true);
    const formData = new FormData();
    formData.append("stock", newStock);
    await editProduct(product.id, formData);
    setStockEdits((prev) => {
      const copy = { ...prev };
      delete copy[product.id];
      return copy;
    });
    setConfirmingStockId(null);
    setSavingStock(false);
    fetchMyProducts(); // refresh after stock update
  }, [stockEdits, editProduct, fetchMyProducts]);

  const handleCancelStockEdit = useCallback((productId) => {
    setStockEdits((prev) => {
      const copy = { ...prev };
      delete copy[productId];
      return copy;
    });
    setConfirmingStockId(null);
  }, []);

  const handleDelete = useCallback(async (id) => {
    if (!window.confirm("Delete this product?")) return;
    const res = await deleteProduct(id);
    if (res.success) fetchMyProducts(); // refresh after delete
  }, [deleteProduct, fetchMyProducts]);

  return {
    products,
    total,
    loading: fetchingProducts || loading,
    modalOpen,
    editingProduct,
    stockEdits,
    confirmingStockId,
    savingStock,
    categories,
    form,
    handleOpenAdd,
    handleOpenEdit,
    handleCloseModal,
    onSubmitProduct,
    handleStockChange,
    handleStockIncrement,
    handleStockDecrement,
    handleConfirmStock,
    handleCancelStockEdit,
    handleDelete,
  };
};