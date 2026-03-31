import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import toast from "react-hot-toast";
import {
  setSellers, setSelectedSeller, setSellerProducts,
  setLoading, setSellerProductsLoading,
  setFilters, setPage, setProductFilters,
  setProductPage, resetProductFilters,
} from "../../store/slices/sellerSlice.js";
import {
  getSellersService,
  getSellerByIdService,
  getSellerProductsService,
} from "../../services/seller.service.js";

export const useSellers = () => {
  const dispatch = useDispatch();
  const {
    sellers, total, loading, selectedSeller,
    sellerProducts, sellerProductsTotal, sellerProductsLoading,
    filters, productFilters,
  } = useSelector((state) => state.sellers);

  const fetchSellers = useCallback(async (overrideParams) => {
    dispatch(setLoading(true));
    const params = overrideParams ?? filters;
    const cleanParams = Object.fromEntries(
      Object.entries(params).filter(([, v]) => v !== "" && v !== null)
    );
    const res = await getSellersService(cleanParams);
    if (res.success) {
      dispatch(setSellers({ sellers: res.sellers, total: res.total }));
    } else {
      toast.error(res.message || "Failed to load sellers");
    }
    dispatch(setLoading(false));
    return res;
  }, [dispatch, filters]);

  const fetchSellerById = useCallback(async (id) => {
    dispatch(setLoading(true));
    const res = await getSellerByIdService(id);
    if (res.success) {
      dispatch(setSelectedSeller(res.seller));
    } else {
      toast.error(res.message || "Failed to load seller");
    }
    dispatch(setLoading(false));
    return res;
  }, [dispatch]);

  const fetchSellerProducts = useCallback(async (sellerId, overrideParams) => {
    dispatch(setSellerProductsLoading(true));
    const params = overrideParams ?? productFilters;
    const cleanParams = Object.fromEntries(
      Object.entries(params).filter(([, v]) => v !== "" && v !== null)
    );
    const res = await getSellerProductsService(sellerId, cleanParams);
    if (res.success) {
      dispatch(setSellerProducts({ products: res.products, total: res.total }));
    } else {
      toast.error(res.message || "Failed to load products");
    }
    dispatch(setSellerProductsLoading(false));
    return res;
  }, [dispatch, productFilters]);

  const applyFilters = useCallback((f) => dispatch(setFilters(f)), [dispatch]);
  const changePage = useCallback((p) => dispatch(setPage(p)), [dispatch]);
  const applyProductFilters = useCallback((f) => dispatch(setProductFilters(f)), [dispatch]);
  const changeProductPage = useCallback((p) => dispatch(setProductPage(p)), [dispatch]);
  const clearProductFilters = useCallback(() => dispatch(resetProductFilters()), [dispatch]);

  return {
    sellers, total, loading,
    selectedSeller,
    sellerProducts, sellerProductsTotal, sellerProductsLoading,
    filters, productFilters,
    fetchSellers, fetchSellerById, fetchSellerProducts,
    applyFilters, changePage,
    applyProductFilters, changeProductPage, clearProductFilters,
  };
};