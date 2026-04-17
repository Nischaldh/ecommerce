import ConfirmModal from "@/components/shared/ConfirmModal";
import PageHeader from "@/components/shared/PageHeader";
import StatusBadge from "@/components/shared/StatusBadge";
import { useAdmins } from "@/hooks/useAdmin";
import {  Plus, UserX } from "lucide-react";
import { useState } from "react";



const FormInput = ({ label, error, ...props }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <input
      {...props}
      className={`w-full px-3 py-2 border rounded-lg text-sm outline-none transition-colors ${
        error ? "border-red-400" : "border-gray-200 focus:border-orange-400"
      }`}
    />
    {error && <p className="text-xs text-red-500">{error}</p>}
  </div>
);

const Admins = () => {
  const {
    admins, modalOpen, setModalOpen,
    form, errors, creating, actionLoading, currentAdmin,
    handleCreate, handleDeactivate, handleChange,
  } = useAdmins();

  const [confirmId, setConfirmId] = useState(null);

  return (
    <div className="flex flex-col gap-5">
      <PageHeader
        title="Admin Management"
        subtitle="Manage admin accounts"
        action={
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors"
          >
            <Plus className="size-4" />
            Add Admin
          </button>
        }
      />

      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Admin</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Role</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Status</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {admins.map((admin) => (
              <tr key={admin.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-4 py-3">
                  <div>
                    <p className="font-medium text-gray-900">{admin.name}</p>
                    <p className="text-xs text-gray-400">{admin.email}</p>
                  </div>
                </td>
                <td className="px-4 py-3"><StatusBadge status={admin.role} /></td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    admin.isActive !== false
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-600"
                  }`}>
                    {admin.isActive !== false ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  {admin.id !== currentAdmin?.id && admin.isActive !== false && (
                    <button
                      onClick={() => setConfirmId(admin.id)}
                      disabled={actionLoading === admin.id}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-red-500 border border-red-200 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-50 ml-auto"
                    >
                      <UserX className="size-3.5" />
                      Deactivate
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setModalOpen(false)} />
          <div className="relative bg-white rounded-2xl w-full max-w-md p-6 flex flex-col gap-4 shadow-xl">
            <h2 className="font-bold text-gray-900 text-lg">Create Admin</h2>
            <form onSubmit={handleCreate} className="flex flex-col gap-3">
              <FormInput label="Name" value={form.name} onChange={handleChange("name")} placeholder="Admin name" error={errors.name} />
              <FormInput label="Email" type="email" value={form.email} onChange={handleChange("email")} placeholder="admin@example.com" error={errors.email} />
              <FormInput label="Password" type="password" value={form.password} onChange={handleChange("password")} placeholder="Min 8 characters" error={errors.password} />
              <FormInput label="Confirm Password" type="password" value={form.confirmPassword} onChange={handleChange("confirmPassword")} placeholder="Repeat password" error={errors.confirmPassword} />
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700">Role</label>
                <select
                  value={form.role}
                  onChange={handleChange("role")}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-orange-400"
                >
                  <option value="admin">Admin</option>
                  <option value="super_admin">Super Admin</option>
                </select>
              </div>
              <div className="flex gap-3 mt-1">
                <button type="button" onClick={() => setModalOpen(false)} className="flex-1 py-2 border border-gray-200 text-gray-600 rounded-xl text-sm hover:bg-gray-50">Cancel</button>
                <button type="submit" disabled={creating} className="flex-1 py-2 bg-orange-500 text-white rounded-xl text-sm font-medium hover:bg-orange-600 disabled:opacity-60">
                  {creating ? "Creating..." : "Create Admin"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmModal
        open={!!confirmId}
        title="Deactivate Admin"
        message="This admin will no longer be able to log in. This can be reversed manually in the database."
        confirmLabel="Deactivate"
        danger
        onConfirm={() => { handleDeactivate(confirmId); setConfirmId(null); }}
        onClose={() => setConfirmId(null)}
      />
    </div>
  );
};

export default Admins;