import { useEffect, useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { useSellers } from "./useSellers";
import { useDebounce } from "../useDebounce";

const sortOptions = [
  { label: "Newest", value: "created_at_desc" },
  { label: "Oldest", value: "created_at_asc" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Highest Rated", value: "rating" },
];

export const useSellerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    selectedSeller, sellerProducts, sellerProductsTotal,
    sellerProductsLoading, productFilters,
    fetchSellerById, fetchSellerProducts,
    applyProductFilters, changeProductPage, clearProductFilters,
  } = useSellers();

  const [searchInput, setSearchInput] = useState(searchParams.get("name") || "");
  const [priceInput, setPriceInput] = useState({
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
  });

  const debouncedSearch = useDebounce(searchInput, 500);
  const totalPages = Math.ceil(sellerProductsTotal / (productFilters.pageSize || 10));

  // load seller on mount
  useEffect(() => {
    const load = async () => {
      const res = await fetchSellerById(id);
      if (!res.success) navigate("/sellers");
    };
    load();
    // hydrate filters from URL
    applyProductFilters({
      name: searchParams.get("name") || "",
      sort: searchParams.get("sort") || "",
      minPrice: searchParams.get("minPrice") || "",
      maxPrice: searchParams.get("maxPrice") || "",
      page: Number(searchParams.get("page")) || 1,
    });
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  // debounced search
  useEffect(() => {
    applyProductFilters({ name: debouncedSearch, page: 1 });
  }, [debouncedSearch]); // eslint-disable-line react-hooks/exhaustive-deps

  // sync filters to URL + fetch products
  useEffect(() => {
    if (!id) return;
    const params = {};
    if (productFilters.name) params.name = productFilters.name;
    if (productFilters.sort) params.sort = productFilters.sort;
    if (productFilters.minPrice) params.minPrice = productFilters.minPrice;
    if (productFilters.maxPrice) params.maxPrice = productFilters.maxPrice;
    if (productFilters.page > 1) params.page = productFilters.page;
    setSearchParams(params, { replace: true });
    fetchSellerProducts(id);
  }, [productFilters]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSortChange = (sort) => {
    applyProductFilters({ sort: productFilters.sort === sort ? "" : sort, page: 1 });
  };

  const handlePriceApply = () => {
    applyProductFilters({
      minPrice: priceInput.minPrice,
      maxPrice: priceInput.maxPrice,
      page: 1,
    });
  };

  const handlePriceClear = () => {
    setPriceInput({ minPrice: "", maxPrice: "" });
    applyProductFilters({ minPrice: "", maxPrice: "", page: 1 });
  };

  const handlePageChange = (page) => {
    changeProductPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleClearFilters = () => {
    setSearchInput("");
    setPriceInput({ minPrice: "", maxPrice: "" });
    clearProductFilters();
  };

  const hasActiveFilters =
    productFilters.name || productFilters.sort ||
    productFilters.minPrice || productFilters.maxPrice;

  return {
    seller: selectedSeller,
    sellerLoading: !selectedSeller,
    products: sellerProducts,
    productsTotal: sellerProductsTotal,
    loading: sellerProductsLoading,
    productFilters,
    totalPages,
    sortOptions,
    searchInput, setSearchInput,
    priceInput, setPriceInput,
    hasActiveFilters,
    handleSortChange,
    handlePriceApply,
    handlePriceClear,
    handlePageChange,
    handleClearFilters,
  };
};