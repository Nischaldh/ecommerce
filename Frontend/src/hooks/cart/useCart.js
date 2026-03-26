import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import toast from "react-hot-toast";
import {
  setCart,
  addItem,
  updateItem,
  removeItem,
  clearCart,
  setLoading,
} from "../../store/slices/cartSlice.js";
import {
  getCartService,
  addToCartService,
  updateCartItemService,
  removeCartItemService,
} from "../../services/cart.service.js";

export const useCart = () => {
  const dispatch = useDispatch();
  const { id, items, loading } = useSelector((state) => state.cart);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0
  );

  const fetchCart = useCallback(async () => {
    dispatch(setLoading(true));
    const res = await getCartService();
    if (res.success && res.cart) {
      dispatch(setCart(res.cart));
    }
    dispatch(setLoading(false));
    return res;
  }, [dispatch]);

  const addToCart = useCallback(
    async (productId, quantity = 1) => {
      const res = await addToCartService(productId, quantity);
      if (res.success) {
        dispatch(addItem(res.item));
        toast.success("Added to cart!");
      } else {
        toast.error(res.message || "Failed to add to cart");
      }
      return res;
    },
    [dispatch]
  );

  const updateCartItem = useCallback(
    async (itemId, quantity) => {
      const res = await updateCartItemService(itemId, quantity);
      if (res.success) {
        dispatch(updateItem({ id: itemId, quantity }));
      } else {
        toast.error(res.message || "Failed to update cart");
      }
      return res;
    },
    [dispatch]
  );

  const removeFromCart = useCallback(
    async (itemId) => {
      const res = await removeCartItemService(itemId);
      if (res.success) {
        dispatch(removeItem(itemId));
        toast.success("Item removed from cart");
      } else {
        toast.error(res.message || "Failed to remove item");
      }
      return res;
    },
    [dispatch]
  );

  const emptyCart = useCallback(() => {
    dispatch(clearCart());
  }, [dispatch]);

  return {
    cartId: id,
    items,
    loading,
    totalItems,
    totalPrice,
    fetchCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    emptyCart,
  };
};