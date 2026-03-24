// hooks/products/useProductDetail.js
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProducts } from "./useProducts";
import { useAuth } from "../auth/useAuth";

export const useProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    selectedProduct,
    loading,
    fetchProductById,
    deleteProduct,
  } = useProducts();

  useEffect(() => {
    const load = async () => {
      const res = await fetchProductById(id);
      if (!res.success) navigate("/products");
    };
    load();
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    const res = await deleteProduct(id);
    if (res.success) navigate("/products");
  };

  const isSeller =
    user && selectedProduct && user.id === selectedProduct.seller?.id;

  return {
    product: selectedProduct,
    loading,
    isSeller,
    handleDelete,
  };
};