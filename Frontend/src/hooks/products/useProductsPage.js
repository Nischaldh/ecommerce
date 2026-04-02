import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useProducts } from "./useProduct";
import { useDebounce } from "../useDebounce";

export const useProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    products,
    total,
    loading,
    filters,
    fetchProducts,
    applyFilters,
    changePage,
    clearFilters,
  } = useProducts();

  const [searchInput, setSearchInput] = useState(
    searchParams.get("name") || "",
  );
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const categoryRef = useRef(null);
  const isFirstRender = useRef(true);

  const debouncedSearch = useDebounce(searchInput, 500);

  const pageSize = filters.pageSize || 10;
  const totalPages = Math.ceil(total / pageSize);
  const [priceInput, setPriceInput] = useState({
    minPrice: filters.minPrice || "",
    maxPrice: filters.maxPrice || "",
  });

  const handlePriceApply = () => {
    applyFilters({
      minPrice: priceInput.minPrice,
      maxPrice: priceInput.maxPrice,
      page: 1,
    });
  };

  const handlePriceClear = () => {
    setPriceInput({ minPrice: "", maxPrice: "" });
    applyFilters({ minPrice: "", maxPrice: "", page: 1 });
  };

 
  useEffect(() => {
    const params = {
      name: searchParams.get("name") || "",
      category: searchParams.get("category") || "",
      sort: searchParams.get("sort") || "",
      minPrice: searchParams.get("minPrice") || "",
      maxPrice: searchParams.get("maxPrice") || "",
      page: Number(searchParams.get("page")) || 1,
    };
    applyFilters(params);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const params = {};
    if (filters.name) params.name = filters.name;
    if (filters.category) params.category = filters.category;
    if (filters.sort) params.sort = filters.sort;
    if (filters.minPrice) params.minPrice = filters.minPrice;
    if (filters.maxPrice) params.maxPrice = filters.maxPrice;
    if (filters.page && filters.page > 1) params.page = filters.page;

    setSearchParams(params, { replace: true });

    fetchProducts();
  }, [filters]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    applyFilters({ name: debouncedSearch, page: 1 });
  }, [debouncedSearch]); // eslint-disable-line react-hooks/exhaustive-deps

  
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (categoryRef.current && !categoryRef.current.contains(e.target)) {
        setIsCategoryOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCategorySelect = (value) => {
    applyFilters({
      category: filters.category === value ? "" : value,
      page: 1,
    });
    setIsCategoryOpen(false);
  };

  const handleSortChange = (sort) => {
    applyFilters({ sort: filters.sort === sort ? "" : sort, page: 1 });
  };

  const handlePageChange = (page) => {
    changePage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleClearFilters = () => {
    setSearchInput("");
    clearFilters();
    setSearchParams({}, { replace: true });
  };

  const hasActiveFilters =
    filters.name ||
    filters.category ||
    filters.sort ||
    filters.minPrice ||
    filters.maxPrice;

  return {
    products,
    total,
    loading,
    filters,
    totalPages,
    searchInput,
    setSearchInput,
    isCategoryOpen,
    setIsCategoryOpen,
    categoryRef,
    handleCategorySelect,
    handleSortChange,
    handlePageChange,
    handleClearFilters,
    hasActiveFilters,
    priceInput,
    setPriceInput,
    handlePriceApply,
    handlePriceClear,
  };
};
