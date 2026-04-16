
import { useState, useCallback } from "react";
import toast from "react-hot-toast";
import {  createAdminService, deactivateAdminService } from "../services/auth.service";
import { useAdminAuth } from "../context/AdminAuthContext";

export const useAdmins = () => {
  const { admin: currentAdmin } = useAdminAuth();
  const [admins, setAdmins] = useState([currentAdmin].filter(Boolean));
  const [modalOpen, setModalOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "", role: "admin" });
  const [errors, setErrors] = useState({});
  const [creating, setCreating] = useState(false);

  const handleCreate = useCallback(async (e) => {
    e.preventDefault();
    
    const validate = () => {
      const errs = {};
      if (!form.name.trim()) errs.name = "Name is required";
      if (!form.email.trim()) errs.email = "Email is required";
      if (!form.password) errs.password = "Password is required";
      else if (form.password.length < 8) errs.password = "Min 8 characters";
      if (form.password !== form.confirmPassword) errs.confirmPassword = "Passwords do not match";
      return errs;
    };
    
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setCreating(true);
    const res = await createAdminService(form);
    if (res.success) {
      setAdmins((prev) => [...prev, res.admin]);
      setModalOpen(false);
      setForm({ name: "", email: "", password: "", confirmPassword: "", role: "admin" });
      toast.success("Admin created successfully");
    } else toast.error(res.message);
    setCreating(false);
  }, [form]);

  const handleDeactivate = useCallback(async (id) => {
    setActionLoading(id);
    const res = await deactivateAdminService(id);
    if (res.success) {
      setAdmins((prev) => prev.map((a) => a.id === id ? { ...a, isActive: false } : a));
      toast.success("Admin deactivated");
    } else toast.error(res.message);
    setActionLoading(null);
  }, []);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  return {
    admins, modalOpen, setModalOpen,
    form, errors, creating,
    actionLoading, currentAdmin,
    handleCreate, handleDeactivate, handleChange,
  };
};