import { useEffect, useState } from "react";
import { User, Package, ShoppingBag } from "lucide-react";
import { useAuth } from "@/hooks/auth/useAuth";
import ProfileSettings from "@/components/Profile/ProfileSettings";
import MyProducts from "@/components/Profile/MyProducts";
import SellerOrders from "@/components/Profile/SellerOrders";
import { useSearchParams } from "react-router-dom";

const tabs = [
  { id: "profile", label: "Profile", icon: User, roles: ["buyer", "seller"] },
  { id: "orders", label: "My Orders", icon: ShoppingBag, roles: ["seller"] },
  { id: "products", label: "My Products", icon: Package, roles: ["seller"] },
];

const Profile = () => {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  const [activeTab, setActiveTab] = useState("profile");

  const availableTabs = tabs.filter((t) => t.roles.includes(user?.role));
  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab && availableTabs.find((t) => t.id === tab)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveTab(tab);
    }
  }, [searchParams, availableTabs]);
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    setSearchParams({ tab: tabId });
  };

  return (
    <div className="py-6 flex flex-col lg:flex-row gap-6 items-start">
      {/* ── Left sidebar ── */}
      <div className="w-full lg:w-56 shrink-0 bg-white border border-gray-100 rounded-xl p-4 flex flex-col gap-2">
        {/* User info */}
        <div className="flex items-center gap-3 pb-3 border-b border-gray-100 mb-1">
          <div className="size-10 rounded-full bg-orange-100 overflow-hidden flex items-center justify-center shrink-0">
            {user?.profilePic ? (
              <img
                src={user.profilePic}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-orange-500 font-bold text-sm">
                {user?.name?.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-gray-900 text-sm truncate">
              {user?.name}
            </p>
            <p className="text-xs text-gray-400 capitalize">{user?.role}</p>
          </div>
        </div>

        {/* Nav tabs */}
        {availableTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-colors text-left ${
              activeTab === tab.id
                ? "bg-orange-500 text-white font-medium"
                : "text-gray-600 hover:bg-orange-50 hover:text-orange-500"
            }`}
          >
            <tab.icon className="size-4 shrink-0" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── Right content ── */}
      <div className="flex-1 min-w-0 w-full bg-white border border-gray-100 rounded-xl p-5">
        {activeTab === "profile" && <ProfileSettings />}
        {activeTab === "orders" && user?.role === "seller" && <SellerOrders />}
        {activeTab === "products" && user?.role === "seller" && <MyProducts />}
      </div>
    </div>
  );
};

export default Profile;
