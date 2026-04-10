import {
  TrendingUp,
  Clock,
  CheckCircle,
  ShoppingBag,
  DollarSign,
  Percent,
} from "lucide-react";
import DashboardStatsCard from "./DashboardStatsCard";

const DashboardStats = ({ stats, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-3 animate-pulse">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-20 bg-gray-100 rounded-xl" />
        ))}
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="flex flex-col gap-3">
      <h2 className="font-bold text-gray-900">Analytics</h2>
      <div className="grid grid-cols-2 gap-3">
        <DashboardStatsCard
          icon={TrendingUp}
          label="Total Earned"
          value={stats.totalEarned}
          color="bg-green-500"
          subLabel="After commission"
        />
        <DashboardStatsCard
          icon={Clock}
          label="Pending"
          value={stats.pendingAmount}
          color="bg-yellow-500"
          subLabel="Awaiting release"
        />
        <DashboardStatsCard
          icon={CheckCircle}
          label="Available"
          value={stats.availableAmount}
          color="bg-blue-500"
          subLabel="Ready for payout"
        />
        <DashboardStatsCard
          icon={DollarSign}
          label="Total Paid Out"
          value={stats.totalPaidOut}
          color="bg-purple-500"
          subLabel="All time"
        />
        <DashboardStatsCard
          icon={Percent}
          label="Platform Fees"
          value={stats.totalCommission}
          color="bg-red-400"
          subLabel="Total commission paid"
        />
        <div className="bg-white border border-gray-100 rounded-xl p-4 flex items-start gap-3">
          <div className="size-10 rounded-xl flex items-center justify-center shrink-0 bg-orange-500">
            <ShoppingBag className="size-5 text-white" />
          </div>
          <div>
            <p className="text-xs text-gray-500">Items Sold</p>
            <p className="font-bold text-gray-900 text-base mt-0.5">
              {stats.totalItems}
            </p>
            <p className="text-[11px] text-gray-400 mt-0.5">All time</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
