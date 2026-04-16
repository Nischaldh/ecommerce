import { configs } from "@/constants/constants";

const StatusBadge = ({ status }) => {
  const cls = configs[status] ?? "bg-gray-100 text-gray-600";
  return (
    <span className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${cls}`}>
      {status?.replace("_", " ")}
    </span>
  );
};

export default StatusBadge;