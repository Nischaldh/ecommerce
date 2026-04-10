import { useEffect, useState } from "react";
import {
  getSellerDashboardService,
  getSellerCommissionsService,
} from "../../services/payment.service";
import { useDebounce } from "../useDebounce";
import toast from "react-hot-toast";

export const useSellerDashboard = () => {
  const [stats, setStats] = useState(null);
  const [commissions, setCommissions] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const debouncedSearch = useDebounce(searchInput, 500);
  const totalPages = Math.ceil(total / pageSize);
  useEffect(() => {
    const load = async () => {
      setStatsLoading(true);
      const res = await getSellerDashboardService();
      if (res.success) setStats(res.stats);
      else toast.error(res.message || "Failed to load stats");
      setStatsLoading(false);
    };
    load();
  }, []);

  
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const res = await getSellerCommissionsService({
        search: debouncedSearch || undefined,
        page,
        pageSize,
      });
      if (res.success) {
        setCommissions(res.commissions);
        setTotal(res.total);
      } else {
        toast.error(res.message || "Failed to load orders");
      }
      setLoading(false);
    };
    load();
  }, [debouncedSearch, page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return {
    stats,
    statsLoading,
    commissions,
    total,
    loading,
    totalPages,
    page,
    searchInput,
    setSearchInput,
    handlePageChange,
  };
};