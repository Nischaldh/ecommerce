import {
  LayoutDashboard, Users, Package,
  ShoppingBag, BadgeDollarSign, Wallet, RotateCcw, Shield,
} from "lucide-react";

export const navItems = [
  { to: "/",            label: "Dashboard",   icon: LayoutDashboard },
  { to: "/users",       label: "Users",       icon: Users },
  { to: "/products",    label: "Products",    icon: Package },
  { to: "/orders",      label: "Orders",      icon: ShoppingBag },
  { to: "/commissions", label: "Commissions", icon: BadgeDollarSign },
  { to: "/payouts",     label: "Payouts",     icon: Wallet },
  { to: "/refunds",     label: "Refunds",     icon: RotateCcw },
];

export const superAdminNavItems = [
  { to: "/admins", label: "Admins", icon: Shield },
];