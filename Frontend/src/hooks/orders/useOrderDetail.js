import { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import toast from "react-hot-toast";
import { addressSchema } from "@/validations/validations";
import { useOrders } from "./useOrder";
import { getOrderByIdService, updateOrderAddressService } from "@/services/order.service";


export const useOrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cancelOrder } = useOrders();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);
  const [editingAddress, setEditingAddress] = useState(false);
  const [savingAddress, setSavingAddress] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(addressSchema) });

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const res = await getOrderByIdService(id);
      if (res.success) {
        setOrder(res.order);
      } else {
        toast.error(res.message || "Order not found");
        navigate("/orders");
      }
      setLoading(false);
    };
    load();
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  const itemsBySeller = useMemo(() => {
    if (!order?.items) return [];
    const groups = {};
    order.items.forEach((item) => {
      if (!groups[item.seller_id]) {
        groups[item.seller_id] = {
          sellerId: item.seller_id,
          sellerName: item.sellerName,
          sellerProfilePic: item.sellerProfilePic,
          items: [],
        };
      }
      groups[item.seller_id].items.push(item);
    });
    return Object.values(groups);
  }, [order]);

  const canCancel =
    order?.status === "PENDING" &&
    !order?.items?.some(
      (i) => i.status === "SHIPPED" || i.status === "DELIVERED"
    );

  const canEditAddress = order?.status === "PENDING";

  const handleCancel = async () => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;
    setCancelling(true);
    const res = await cancelOrder(id);
    if (res.success) {
      setOrder((prev) => ({
        ...prev,
        status: "CANCELLED",
        items: prev.items.map((i) => ({ ...i, status: "CANCELLED" })),
      }));
    }
    setCancelling(false);
  };

  const handleStartEditAddress = () => {
    if (!order) return;
    reset(order.shippingAddress);
    setEditingAddress(true);
  };

  const onSaveAddress = async (data) => {
    setSavingAddress(true);
    const res = await updateOrderAddressService(id, data);
    if (res.success) {
      setOrder(res.order); 
      setEditingAddress(false);
      toast.success("Address updated successfully");
    } else {
      toast.error(res.message || "Failed to update address");
    }
    setSavingAddress(false);
  };

  const handleCancelEditAddress = () => {
    setEditingAddress(false);
    reset();
  };

  return {
    order,
    loading,
    itemsBySeller,
    canCancel,
    canEditAddress,
    cancelling,
    handleCancel,
    editingAddress,
    savingAddress,
    handleStartEditAddress,
    handleSaveAddress: handleSubmit(onSaveAddress),
    handleCancelEditAddress,
    register,
    errors,
  };
};