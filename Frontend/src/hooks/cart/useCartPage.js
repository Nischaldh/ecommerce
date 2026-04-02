/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "./useCart";
import { useAuth } from "../auth/useAuth";
import { useDebounce } from "../useDebounce";


export const useCartPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, loading: authLoading } = useAuth(); 
  const { items, loading: cartLoading, fetchCart, updateCartItem, removeFromCart } = useCart();

  const [selectedIds, setSelectedIds] = useState([]);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {

    if (authLoading) return;

    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    fetchCart();
  }, [isAuthenticated, authLoading]); // eslint-disable-line react-hooks/exhaustive-deps

  
  useEffect(() => {
    const initial = {};
    items.forEach((item) => {
      initial[item.id] = item.quantity;
    });
    setQuantities(initial);
  }, [items]);


  useEffect(() => {
    if (items.length > 0) {
      setSelectedIds(items.map((i) => i.id));
    }
  }, [items.length]); // eslint-disable-line react-hooks/exhaustive-deps

  const debouncedQuantities = useDebounce(quantities, 1000);

  useEffect(() => {
    items.forEach((item) => {
      const debounced = debouncedQuantities[item.id];
      if (debounced !== undefined && debounced !== item.quantity) {
        updateCartItem(item.id, debounced);
      }
    });
  }, [debouncedQuantities]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleQuantityChange = useCallback((itemId, value) => {
    const parsed = parseInt(value);
    if (isNaN(parsed) || parsed < 1) return;
    setQuantities((prev) => ({ ...prev, [itemId]: parsed }));
  }, []);

  const handleIncrement = useCallback((itemId) => {
    setQuantities((prev) => ({ ...prev, [itemId]: (prev[itemId] || 1) + 1 }));
  }, []);

  const handleDecrement = useCallback((itemId) => {
    setQuantities((prev) => {
      const current = prev[itemId] || 1;
      if (current <= 1) return prev;
      return { ...prev, [itemId]: current - 1 };
    });
  }, []);

  const handleRemove = useCallback(
    (itemId) => {
      removeFromCart(itemId);
      setSelectedIds((prev) => prev.filter((id) => id !== itemId));
    },
    [removeFromCart]
  );

  const handleToggleSelect = useCallback((itemId) => {
    setSelectedIds((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  }, []);

  const handleSelectAll = useCallback(() => {
    if (selectedIds.length === items.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(items.map((i) => i.id));
    }
  }, [selectedIds.length, items]);

  const allSelected = items.length > 0 && selectedIds.length === items.length;

  const selectedItems = items.filter((i) => selectedIds.includes(i.id));
  const selectedTotal = selectedItems.reduce(
    (sum, item) => sum + item.product.price * (quantities[item.id] ?? item.quantity),
    0
  );
  const selectedCount = selectedItems.reduce(
    (sum, item) => sum + (quantities[item.id] ?? item.quantity),
    0
  );

  const handleCheckoutSelected = () => {
    if (selectedIds.length === 0) return;
    const params = new URLSearchParams();
    selectedIds.forEach((id) => params.append("cartItemIds", id));
    navigate(`/checkout?${params.toString()}`);
  };

  const handleCheckoutAll = () => {
    navigate("/checkout");
  };

  
  const loading = authLoading || cartLoading;

  return {
    items,
    loading,
    quantities,
    selectedIds,
    allSelected,
    selectedItems,
    selectedTotal,
    selectedCount,
    handleQuantityChange,
    handleIncrement,
    handleDecrement,
    handleRemove,
    handleToggleSelect,
    handleSelectAll,
    handleCheckoutSelected,
    handleCheckoutAll,
  };
};