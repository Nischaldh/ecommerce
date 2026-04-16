import { NavLink, useNavigate } from "react-router-dom";
import { ShieldCheck, LogOut } from "lucide-react";
import { useAdminAuth } from "../../context/AdminAuthContext";
import { navItems, superAdminNavItems } from "../../constants/navItems";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

const AppSidebar = () => {
  const { admin, logout, isSuperAdmin } = useAdminAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const allNavItems = isSuperAdmin
    ? [...navItems, ...superAdminNavItems]
    : navItems;

  return (
    <Sidebar collapsible="icon">
      {/* Header */}
      <SidebarHeader className="border-b border-gray-100 overflow-hidden px-5 py-5 group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:py-5">
        <div className="flex items-center gap-2.5 group-data-[collapsible=icon]:justify-center">
          <div className="size-8 bg-orange-500 rounded-lg flex items-center justify-center shrink-0">
            <ShieldCheck className="size-4 text-white" />
          </div>
          <div className="group-data-[collapsible=icon]:hidden min-w-0">
            <p className="font-bold text-gray-900 text-sm truncate">
              Admin Portal
            </p>
            <p className="text-xs text-gray-400 capitalize truncate">
              {admin?.role?.replace("_", " ")}
            </p>
          </div>
        </div>
      </SidebarHeader>
      {/* Nav */}
      <SidebarContent>
        <SidebarGroup className="p-3">
          <SidebarGroupContent>
            <SidebarMenu className="gap-0.5">
              {allNavItems.map((item) => (
                <SidebarMenuItem key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === "/"}
                    className={({ isActive }) =>
                      `flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-colors w-full
   group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0 ${
     isActive
       ? "bg-orange-500 text-white font-medium"
       : "text-gray-600 hover:bg-orange-50 hover:text-orange-500"
   }`
                    }
                  >
                    <item.icon className="size-4 shrink-0" />
                    <span className="group-data-[collapsible=icon]:hidden">
                      {item.label}
                    </span>
                  </NavLink>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="border-t border-gray-100 p-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="px-3 py-2 mb-1 group-data-[collapsible=icon]:hidden">
              <p className="text-xs font-semibold text-gray-900 truncate">
                {admin?.name}
              </p>
              <p className="text-xs text-gray-400 truncate">{admin?.email}</p>
            </div>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-red-500 hover:bg-red-50 transition-colors group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0"
            >
              <LogOut className="size-4 shrink-0" />
              <span className="group-data-[collapsible=icon]:hidden">
                Logout
              </span>
            </button>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
};

export default AppSidebar;
