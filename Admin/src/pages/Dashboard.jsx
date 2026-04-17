import DashboardSkeleton from "@/components/Dashboard/DashboardSkeleton";
import PageHeader from "@/components/shared/PageHeader";
import StatCard from "@/components/shared/StatCard";
import { useDashboard } from "@/hooks/useDashboard";
import {
  Users, Package, ShoppingBag, DollarSign,
  RotateCcw, CreditCard, TrendingUp, CheckCircle,
} from "lucide-react";




const Dashboard = () => {
  const { stats, loading } = useDashboard();

  if (loading) return <DashboardSkeleton />;
  if (!stats) return null;

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Dashboard" subtitle="Platform overview" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <StatCard label="Total Buyers"    value={stats.totalBuyers}     icon={Users}        color="blue" />
        <StatCard label="Total Sellers"   value={stats.totalSellers}    icon={Users}        color="orange" />
        <StatCard label="Total Orders"    value={stats.totalOrders}     icon={ShoppingBag}  color="purple" />
        <StatCard label="Completed"       value={stats.completedOrders} icon={CheckCircle}  color="green" />
        <StatCard label="Products"        value={stats.totalProducts}   icon={Package}      color="yellow" />
        <StatCard label="Platform Revenue" value={`Rs. ${Number(stats.totalRevenue).toLocaleString()}`} icon={TrendingUp} color="green" />
        <StatCard label="Pending Refunds" value={stats.pendingRefunds}  icon={RotateCcw}    color="red" sub="Needs attention" />
        <StatCard label="Pending Payouts" value={stats.pendingPayouts}  icon={CreditCard}   color="yellow" sub="Needs attention" />
      </div>
    </div>
  );
};

export default Dashboard;