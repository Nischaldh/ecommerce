import StatusBadge from "../shared/StatusBadge";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu, DropdownMenuContent,
  DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const UserTable = ({ users, actionLoading, onSuspend, onUnsuspend, onDelete }) => (
  <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-100">
            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">User</th>
            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Role</th>
            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Status</th>
            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Joined</th>
            <th className="px-4 py-3" />
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
              <td className="px-4 py-3">
                <div className="flex items-center gap-2.5">
                  <div className="size-8 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                    {user.profilePic
                      ? <img src={user.profilePic} className="size-8 rounded-full object-cover" alt="" />
                      : <span className="text-orange-600 text-xs font-bold">{user.name?.charAt(0).toUpperCase()}</span>
                    }
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{user.name}</p>
                    <p className="text-xs text-gray-400">{user.email}</p>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3"><StatusBadge status={user.role} /></td>
              <td className="px-4 py-3"><StatusBadge status={user.status} /></td>
              <td className="px-4 py-3 text-xs text-gray-500">
                {new Date(user.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
              </td>
              <td className="px-4 py-3 text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      disabled={actionLoading === user.id}
                      className="p-1 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                    >
                      <MoreHorizontal className="size-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {user.status === "suspended"
                      ? <DropdownMenuItem onClick={() => onUnsuspend(user.id)}>Unsuspend</DropdownMenuItem>
                      : user.status !== "deleted" && (
                          <DropdownMenuItem onClick={() => onSuspend(user.id)}>Suspend</DropdownMenuItem>
                        )
                    }
                    {user.status !== "deleted" && (
                      <DropdownMenuItem
                        onClick={() => onDelete(user.id)}
                        className="text-red-500 focus:text-red-600"
                      >
                        Delete
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default UserTable;