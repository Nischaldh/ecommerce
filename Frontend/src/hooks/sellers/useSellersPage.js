import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSellers } from "./useSellers";
import { useDebounce } from "../useDebounce";

export const useSellersPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { sellers, total, loading, filters, fetchSellers, applyFilters, changePage } = useSellers();

  const [searchInput, setSearchInput] = useState(searchParams.get("name") || "");
  const debouncedSearch = useDebounce(searchInput, 500);

  const totalPages = Math.ceil(total / (filters.pageSize || 12));

  useEffect(() => {
    applyFilters({
      name: searchParams.get("name") || "",
      page: Number(searchParams.get("page")) || 1,
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    applyFilters({ name: debouncedSearch, page: 1 });
  }, [debouncedSearch]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const params = {};
    if (filters.name) params.name = filters.name;
    if (filters.page > 1) params.page = filters.page;
    setSearchParams(params, { replace: true });
    fetchSellers();
  }, [filters]); // eslint-disable-line react-hooks/exhaustive-deps

  const handlePageChange = (page) => {
    changePage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return {
    sellers, total, loading, filters, totalPages,
    searchInput, setSearchInput,
    handlePageChange,
  };
};