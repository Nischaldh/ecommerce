import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import toast from "react-hot-toast";
import {
  setOrders,
  setLoading,
  updateOrderStatus,
  setOrderFilters,
  setOrderPage,
  resetOrderFilters,
} from "../../store/slices/orderSlice.js";
import {
  getMyOrdersService,
  cancelOrderService,
} from "../../services/order.service.js";
import { OrderStatus } from "@/constants/constants.js";


export const useOrders = () => {
  const dispatch = useDispatch();
  const { orders, total, loading, filters } = useSelector((state) => state.orders);

  const fetchOrders = useCallback(async (overrideParams) => {
    dispatch(setLoading(true));
    const params = overrideParams ?? filters;
    const cleanParams = Object.fromEntries(
      Object.entries(params).filter(([, v]) => v !== "" && v !== null)
    );
    const res = await getMyOrdersService(cleanParams);
    if (res.success) {
      dispatch(setOrders({ orders: res.orders, total: res.total }));
    } else {
      toast.error(res.message || "Failed to fetch orders");
    }
    dispatch(setLoading(false));
    return res;
  }, [dispatch, filters]);

  const cancelOrder = useCallback(async (orderId) => {
    const res = await cancelOrderService(orderId);
    if (res.success) {
      dispatch(updateOrderStatus({ id: orderId, status: OrderStatus.CANCELLED }));
      toast.success("Order cancelled successfully");
    } else {
      toast.error(res.message || "Failed to cancel order");
    }
    return res;
  }, [dispatch]);

  const applyFilters = useCallback((newFilters) => {
    dispatch(setOrderFilters(newFilters));
  }, [dispatch]);

  const changePage = useCallback((page) => {
    dispatch(setOrderPage(page));
  }, [dispatch]);

  const clearFilters = useCallback(() => {
    dispatch(resetOrderFilters());
  }, [dispatch]);

  return {
    orders,
    total,
    loading,
    filters,
    fetchOrders,
    cancelOrder,
    applyFilters,
    changePage,
    clearFilters,
  };
};