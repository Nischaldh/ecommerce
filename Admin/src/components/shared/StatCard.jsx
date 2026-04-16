import { colors } from "@/constants/colors";

const StatCard = ({ label, value, icon: Icon, color = "orange", sub }) => {
  const IconComponent = Icon;
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4 flex items-start gap-3">
      <div className={`size-10 rounded-xl flex items-center justify-center shrink-0 ${colors[color]}`}>
        <IconComponent className="size-5" />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-lg font-bold text-gray-900 mt-0.5">{value}</p>
        {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
      </div>
    </div>
  );
};

export default StatCard;