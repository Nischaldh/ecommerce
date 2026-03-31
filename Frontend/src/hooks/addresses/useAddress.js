import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import toast from "react-hot-toast";
import {
  setAddresses,
  addAddress,
  updateAddress,
  removeAddress,
  setDefaultAddress,
  setLoading,
} from "../../store/slices/addressSlice.js";
import {
  getAddressesService,
  createAddressService,
  updateAddressService,
  deleteAddressService,
  setDefaultAddressService,
} from "../../services/address.service.js";

export const useAddresses = () => {
  const dispatch = useDispatch();
  const { addresses, loading } = useSelector((state) => state.addresses);

  const fetchAddresses = useCallback(async () => {
    dispatch(setLoading(true));
    const res = await getAddressesService();
    if (res.success) {
      dispatch(setAddresses({ addresses: res.addresses, total: res.total }));
    } else {
      toast.error(res.message || "Failed to fetch addresses");
    }
    dispatch(setLoading(false));
    return res;
  }, [dispatch]);

  const createAddress = useCallback(async (data) => {
    const res = await createAddressService(data);
    if (res.success) {
      dispatch(addAddress(res.address));
      toast.success("Address saved!");
    } else {
      toast.error(res.message || "Failed to save address");
    }
    return res;
  }, [dispatch]);

  const editAddress = useCallback(async (id, data) => {
    const res = await updateAddressService(id, data);
    if (res.success) {
      dispatch(updateAddress(res.address));
      toast.success("Address updated!");
    } else {
      toast.error(res.message || "Failed to update address");
    }
    return res;
  }, [dispatch]);

  const deleteAddress = useCallback(async (id) => {
    const res = await deleteAddressService(id);
    if (res.success) {
      dispatch(removeAddress(id));
      toast.success("Address deleted");
    } else {
      toast.error(res.message || "Failed to delete address");
    }
    return res;
  }, [dispatch]);

  const makeDefault = useCallback(async (id) => {
    const res = await setDefaultAddressService(id);
    if (res.success) {
      dispatch(setDefaultAddress(id));
    } else {
      toast.error(res.message || "Failed to set default");
    }
    return res;
  }, [dispatch]);

  return {
    addresses,
    loading,
    fetchAddresses,
    createAddress,
    editAddress,
    deleteAddress,
    makeDefault,
  };
};