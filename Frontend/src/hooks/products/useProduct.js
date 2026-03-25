// hooks/products/useProducts.js
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import toast from "react-hot-toast";
import {
  setProducts,
  setLoading,
  setFilters,
  setPage,
  resetFilters,
  removeProduct,
  updateProduct,
  addProduct,
  setSelectedProduct,
} from "../../store/slices/productSlice.js";
import {
  getAllProductsService,
  getProductByIdService,
  createProductService,
  updateProductService,
  deleteProductService,
} from "../../services/product.service.js";
import { useSearchParams } from "react-router-dom";

export const useProducts = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const { items, total, loading, filters, selectedProduct } = useSelector(
    (state) => state.products,
  );

  useEffect(() => {
    const sort = searchParams.get("sort");
    const category = searchParams.get("category");
    if (sort || category) {
      dispatch(
        setFilters({ ...(sort && { sort }), ...(category && { category }) }),
      );
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // fetch product list — uses current filters from Redux by default
  const fetchProducts = useCallback(
    async (overrideParams) => {
      dispatch(setLoading(true));
      const params = overrideParams ?? filters;
      
      const cleanParams = Object.fromEntries(
        Object.entries(params).filter(([, v]) => v !== "" && v !== null),
      );
      const res = await getAllProductsService(cleanParams);
      if (res.success) {
        dispatch(setProducts({ products: res.products, total: res.total }));
      } else {
        toast.error(res.message || "Failed to load products");
      }
      dispatch(setLoading(false));
      return res;
    },
    [dispatch, filters],
  );

  // fetch single product
  const fetchProductById = useCallback(
    async (id) => {
      dispatch(setLoading(true));
      const res = await getProductByIdService(id);
      if (res.success) {
        dispatch(setSelectedProduct(res.product));
      } else {
        toast.error(res.message || "Failed to load product");
      }
      dispatch(setLoading(false));
      return res;
    },
    [dispatch],
  );

  // seller — create product
  const createProduct = useCallback(
    async (formData) => {
      dispatch(setLoading(true));
      const res = await createProductService(formData);
      if (res.success) {
        dispatch(addProduct(res.product));
        toast.success("Product created successfully!");
      } else {
        toast.error(res.message || "Failed to create product");
      }
      dispatch(setLoading(false));
      return res;
    },
    [dispatch],
  );

  // seller — edit product
  const editProduct = useCallback(
    async (id, formData) => {
      dispatch(setLoading(true));
      const res = await updateProductService(id, formData);
      if (res.success) {
        dispatch(updateProduct(res.product));
        toast.success("Product updated successfully!");
      } else {
        toast.error(res.message || "Failed to update product");
      }
      dispatch(setLoading(false));
      return res;
    },
    [dispatch],
  );

  // seller — delete product
  const deleteProduct = useCallback(
    async (id) => {
      dispatch(setLoading(true));
      const res = await deleteProductService(id);
      if (res.success) {
        dispatch(removeProduct(id));
        toast.success("Product deleted successfully!");
      } else {
        toast.error(res.message || "Failed to delete product");
      }
      dispatch(setLoading(false));
      return res;
    },
    [dispatch],
  );

  // filter helpers
  const applyFilters = useCallback(
    (newFilters) => {
      dispatch(setFilters(newFilters));
    },
    [dispatch],
  );

  const changePage = useCallback(
    (page) => {
      dispatch(setPage(page));
    },
    [dispatch],
  );

  const clearFilters = useCallback(() => {
    dispatch(resetFilters());
  }, [dispatch]);

  return {
    // state
    products: items,
    total,
    loading,
    filters,
    selectedProduct,
    // actions
    fetchProducts,
    fetchProductById,
    createProduct,
    editProduct,
    deleteProduct,
    // filters
    applyFilters,
    changePage,
    clearFilters,
  };
};
