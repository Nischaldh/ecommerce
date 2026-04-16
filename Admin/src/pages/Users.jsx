import { Users as UsersIcon } from "lucide-react";

import PageHeader from "../components/shared/PageHeader";
import SearchBar from "../components/shared/SearchBar";
import UserTable from "../components/Users/UserTable";
import TableSkeleton from "../components/shared/TableSkeleton";
import Pagination from "../components/shared/Pagination";
import { roleTabs } from "@/constants/constants";
import { useUsers } from "@/hooks/useUser";


const Users = () => {
  const {
    users, total, loading, page, totalPages,
    search, setSearch, roleFilter, setRoleFilter,
    actionLoading, setPage,
    handleSuspend, handleUnsuspend, handleDelete,
  } = useUsers();

  return (
    <div className="flex flex-col gap-5">
      <PageHeader
        title="Users"
        subtitle={`${total} users registered`}
      />

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <SearchBar value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="Search by name or email..." />
        </div>
        <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
          {roleTabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => { setRoleFilter(tab.value); setPage(1); }}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                roleFilter === tab.value
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <TableSkeleton rows={8} cols={5} />
      ) : users.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
          <UsersIcon className="size-12 opacity-20 mb-3" />
          <p className="font-semibold">No users found</p>
        </div>
      ) : (
        <UserTable
          users={users}
          actionLoading={actionLoading}
          onSuspend={handleSuspend}
          onUnsuspend={handleUnsuspend}
          onDelete={handleDelete}
        />
      )}

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
};

export default Users;