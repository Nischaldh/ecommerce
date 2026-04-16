/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import {
  getUsersService, suspendUserService,
  unsuspendUserService, deleteUserService,
} from "../services/user.service";
import { useDebounce } from "./useDebounce";

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [actionLoading, setActionLoading] = useState(null);

  const debouncedSearch = useDebounce(search, 500);
  const totalPages = Math.ceil(total / 20);

  const fetch = useCallback(async (params) => {
    setLoading(true);
    const res = await getUsersService(params);
    if (res.success) { setUsers(res.users); setTotal(res.total); }
    else toast.error(res.message || "Failed to load users");
    setLoading(false);
  }, []);

  useEffect(() => {
    fetch({ page, search: debouncedSearch || undefined, role: roleFilter || undefined });
  }, [page, debouncedSearch, roleFilter, fetch]);

  const handleSuspend = useCallback(async (id) => {
    setActionLoading(id);
    const res = await suspendUserService(id);
    if (res.success) {
      setUsers((prev) => prev.map((u) => u.id === id ? { ...u, status: "suspended" } : u));
      toast.success("User suspended");
    } else toast.error(res.message);
    setActionLoading(null);
  }, []);

  const handleUnsuspend = useCallback(async (id) => {
    setActionLoading(id);
    const res = await unsuspendUserService(id);
    if (res.success) {
      setUsers((prev) => prev.map((u) => u.id === id ? { ...u, status: "verified" } : u));
      toast.success("User unsuspended");
    } else toast.error(res.message);
    setActionLoading(null);
  }, []);

  const handleDelete = useCallback(async (id) => {
    setActionLoading(id);
    const res = await deleteUserService(id);
    if (res.success) {
      setUsers((prev) => prev.map((u) => u.id === id ? { ...u, status: "deleted" } : u));
      toast.success("User deleted");
    } else toast.error(res.message);
    setActionLoading(null);
  }, []);

  return {
    users, total, loading, page, totalPages,
    search, setSearch, roleFilter, setRoleFilter,
    actionLoading, setPage,
    handleSuspend, handleUnsuspend, handleDelete,
  };
};