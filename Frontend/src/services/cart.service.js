import api from "../lib/api.js";

export const getCartService = async () => {
  try {
    const res = await api.get("/cart");
    return res.data;
  } catch (err) {
    return { success: false, message: err.response?.data?.message || "Failed to fetch cart" };
  }
};

export const addToCartService = async (productId, quantity) => {
  try {
    const res = await api.post("/cart", { productId, quantity });
    return res.data;
  } catch (err) {
    return { success: false, message: err.response?.data?.message || "Failed to add to cart" };
  }
};

export const updateCartItemService = async (itemId, quantity) => {
  try {
    const res = await api.patch(`/cart/item/${itemId}`, { quantity });
    return res.data;
  } catch (err) {
    return { success: false, message: err.response?.data?.message || "Failed to update cart item" };
  }
};

export const removeCartItemService = async (itemId) => {
  try {
    const res = await api.delete(`/cart/item/${itemId}`);
    return res.data;
  } catch (err) {
    return { success: false, message: err.response?.data?.message || "Failed to remove cart item" };
  }
};