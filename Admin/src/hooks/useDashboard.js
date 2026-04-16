import { useState, useEffect } from "react";
import { getDashboardService } from "../services/dashboard.service";
import toast from "react-hot-toast";

export const useDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const res = await getDashboardService();
      if (res.success) setStats(res.stats);
      else toast.error(res.message || "Failed to load dashboard");
      setLoading(false);
    };
    load();
  }, []);

  return { stats, loading };
};