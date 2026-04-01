import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  setSellerItems, updateSellerItemStatus, setLoading,
} from "../../store/slices/orderSlice.js";
import { getSellerOrderItemsService, updateDeliveryService, updateOrderItemStatusService } from "@/services/order.service.js";
import { itemStatusConfig } from "@/constants/constants.js";


const allowedTransitions = {
  PENDING: ["PROCESSING", "CANCELLED"],
  PROCESSING: ["SHIPPED"],
  SHIPPED: ["DELIVERED"],
  DELIVERED: [],
  CANCELLED: [],
  REFUNDED: [],
};

export const useSellerOrders = () => {
  const dispatch = useDispatch();
  const { sellerItems, sellerTotal, loading } = useSelector((state) => state.orders);
  const [updatingId, setUpdatingId] = useState(null);
  const [deliveryModal, setDeliveryModal] = useState(null);

  useEffect(() => {
    const load = async () => {
      dispatch(setLoading(true));
      const res = await getSellerOrderItemsService();
      if (res.success) {
        dispatch(setSellerItems({ items: res.items, total: res.total }));
      }
      dispatch(setLoading(false));
    };
    load();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleStatusUpdate = useCallback(async (itemId, newStatus) => {
    setUpdatingId(itemId);
    const res = await updateOrderItemStatusService(itemId, newStatus);
    if (res.success) {
      dispatch(updateSellerItemStatus({ id: itemId, status: newStatus }));
      toast.success(`Order marked as ${newStatus.toLowerCase()}`);
    } else {
      toast.error(res.message || "Failed to update status");
    }
    setUpdatingId(null);
  }, [dispatch]);

  const handleDeliveryUpdate = useCallback(async (itemId, data) => {
    const res = await updateDeliveryService(itemId, data);
    if (res.success) {
      toast.success("Delivery info updated!");
      setDeliveryModal(null);
    } else {
      toast.error(res.message || "Failed to update delivery");
    }
    return res;
  }, []);

  const getNextStatuses = (currentStatus) => allowedTransitions[currentStatus] || [];

  return {
    sellerItems, sellerTotal, loading,
    updatingId, deliveryModal, setDeliveryModal,
    handleStatusUpdate, handleDeliveryUpdate,
    getNextStatuses, itemStatusConfig,
    allowedTransitions,
  };
};