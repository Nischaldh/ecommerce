import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import { useCart } from "../cart/useCart";
import { useReviews } from "../review/useReview";
import { useProducts } from "./useProduct";
import toast from "react-hot-toast";

export const useProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { selectedProduct, loading: productLoading, fetchProductById, deleteProduct } = useProducts();
  const { addToCart } = useCart();
  const { fetchProductReviews } = useReviews();

  const [selectedImage, setSelectedImage] = useState(null);
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    const load = async () => {
      const res = await fetchProductById(id);
      if (!res.success) navigate("/products");
    };
    load();
    fetchProductReviews(id);
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (selectedProduct) setSelectedImage(selectedProduct.primaryImage);
  }, [selectedProduct]);

  const allImages = selectedProduct
    ? [
        { id: "primary", url: selectedProduct.primaryImage },
        ...(selectedProduct.images || []).map((img) => ({ id: img.id, url: img.url })),
      ]
    : [];

  const isSeller = user && selectedProduct && user.id === selectedProduct.seller?.id;

  const handleAddToCart = async () => {
    if (!isAuthenticated) { toast.error("Please Login to add the item to cart."); return; }
    setAddingToCart(true);
    await addToCart(selectedProduct.id, 1);
    setAddingToCart(false);
  };

  const handleBuyNow = () => {
    if (!isAuthenticated) { toast.error("Please Login to buy the item."); return; }
    navigate(`/checkout?productId=${selectedProduct.id}`);
  };

  const handleDeleteProduct = async () => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    const res = await deleteProduct(id);
    if (res.success) navigate("/products");
  };

  return {
    product: selectedProduct,
    productLoading,
    allImages,
    selectedImage,
    setSelectedImage,
    isSeller,
    handleDeleteProduct,
    addingToCart,
    handleAddToCart,
    handleBuyNow,
  };
};