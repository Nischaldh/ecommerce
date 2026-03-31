/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import toast from "react-hot-toast";
import { useAuth } from "../auth/useAuth";
import { useCart } from "../cart/useCart";
import { useAddresses } from "../addresses/useAddress";
import { placeOrderService } from "@/services/order.service";
import { addressSchema } from "@/validations/validations";

export const useCheckout = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, isAuthenticated, loading: authLoading } = useAuth();

  const { items, fetchCart, emptyCart } = useCart();
  const { addresses, fetchAddresses, createAddress } = useAddresses();

  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [useNewAddress, setUseNewAddress] = useState(false);
  const [saveAddress, setSaveAddress] = useState(false);
  const [placingOrder, setPlacingOrder] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(addressSchema) });

  useEffect(() => {
    if (authLoading) return;
    if (!isAuthenticated) return;
    fetchCart();
    fetchAddresses();
  }, [authLoading, isAuthenticated]); // eslint-disable-line react-hooks/exhaustive-deps

  // auto select default address
  useEffect(() => {
    if (addresses.length > 0 && !selectedAddressId) {
      const defaultAddr = addresses.find((a) => a.isDefault) || addresses[0];
      setSelectedAddressId(defaultAddr.id);
      setUseNewAddress(false);
    }
    // if no saved addresses, show new address form
    if (addresses.length === 0) {
      setUseNewAddress(true);
    }
  }, [addresses]); // eslint-disable-line react-hooks/exhaustive-deps

  // get cart item ids from URL for partial checkout
  const cartItemIds = searchParams.getAll("cartItemIds");

  // items to checkout — partial or all
  const itemsToCheckout = useMemo(() => {
    if (cartItemIds.length > 0) {
      return items.filter((i) => cartItemIds.includes(i.id));
    }
    return items;
  }, [items, cartItemIds]);

  // group items by seller
  const itemsBySeller = useMemo(() => {
    const groups = {};
    itemsToCheckout.forEach((item) => {
      const sellerId = item.product.sellerId || "unknown";
      const sellerName = item.product.sellerName || "Seller";
      if (!groups[sellerId]) {
        groups[sellerId] = { sellerId, sellerName, items: [] };
      }
      groups[sellerId].items.push(item);
    });
    return Object.values(groups);
  }, [itemsToCheckout]);

  const orderTotal = itemsToCheckout.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const getShippingAddress = (formData) => {
    if (useNewAddress && formData) {
      return {
        fullName: formData.fullName,
        phone: formData.phone,
        addressLine1: formData.addressLine1,
        addressLine2: formData.addressLine2 || null,
        city: formData.city,
        state: formData.state,
        postalCode: formData.postalCode,
        country: formData.country,
      };
    }
    // use saved address
    const saved = addresses.find((a) => a.id === selectedAddressId);
    if (!saved) return null;
    return {
      fullName: saved.fullName,
      phone: saved.phone,
      addressLine1: saved.addressLine1,
      addressLine2: saved.addressLine2 || null,
      city: saved.city,
      state: saved.state,
      postalCode: saved.postalCode,
      country: saved.country,
    };
  };

  const onPlaceOrder = async (formData) => {
    const shippingAddress = getShippingAddress(formData);
    if (!shippingAddress) {
      toast.error("Please select or enter a delivery address");
      return;
    }

    // optionally save the new address
    if (useNewAddress && saveAddress) {
      await createAddress({
        ...shippingAddress,
        isDefault: addresses.length === 0,
      });
    }

    setPlacingOrder(true);

    const orderData = {
      shippingAddress,
      ...(cartItemIds.length > 0 && { cartItemIds }),
    };

    const res = await placeOrderService(orderData);

    if (res.success) {
      emptyCart();
      toast.success("Order placed successfully!");
      navigate("/orders");
    } else {
      toast.error(res.message || "Failed to place order");
    }

    setPlacingOrder(false);
  };

  // if using saved address, submit directly without form validation
  const handlePlaceOrder = () => {
    if (useNewAddress) {
      handleSubmit(onPlaceOrder)();
    } else {
      onPlaceOrder(null);
    }
  };

  return {
    // address
    addresses,
    selectedAddressId,
    setSelectedAddressId,
    useNewAddress,
    setUseNewAddress,
    saveAddress,
    setSaveAddress,
    // form
    register,
    errors,
    reset,
    // order
    itemsBySeller,
    itemsToCheckout,
    orderTotal,
    placingOrder,
    handlePlaceOrder,
    user,
  };
};
