import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import AppSidebar from "./AppSidebar";

const AdminLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/* Mobile header */}
        <header className="flex h-12 items-center gap-3 border-b border-gray-100 bg-white px-4 md:hidden">
          <SidebarTrigger />
          <span className="font-semibold text-gray-900 text-sm">Admin Portal</span>
        </header>
        {/* Desktop trigger strip */}
        <div className="hidden md:flex h-10 items-center px-4 border-b border-gray-100 bg-white">
          <SidebarTrigger className="text-gray-400 hover:text-gray-600" />
        </div>
        <main className="flex-1 p-6 bg-gray-50 min-h-screen">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AdminLayout;