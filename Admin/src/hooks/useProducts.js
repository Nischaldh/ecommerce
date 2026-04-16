/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import { getProductsService, deleteProductService } from "../services/product.service";
import { useDebounce } from "./useDebounce";

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const debouncedSearch = useDebounce(search, 500);
  const totalPages = Math.ceil(total / 20);

  const fetch = useCallback(async (params) => {
    setLoading(true);
    const res = await getProductsService(params);
    if (res.success) { setProducts(res.products); setTotal(res.total); }
    else toast.error(res.message || "Failed to load products");
    setLoading(false);
  }, []);

  useEffect(() => {
    fetch({ page, search: debouncedSearch || undefined });
  }, [page, debouncedSearch, fetch]);

  const handleDelete = useCallback(async (id) => {
    setDeletingId(id);
    const res = await deleteProductService(id);
    if (res.success) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
      setTotal((t) => t - 1);
      toast.success("Product deleted");
    } else toast.error(res.message);
    setDeletingId(null);
  }, []);

  return {
    products, total, loading, page, totalPages,
    search, setSearch, deletingId, setPage, handleDelete,
  };
};