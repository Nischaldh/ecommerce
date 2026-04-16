const DashboardSkeleton = () => (
  <div className="animate-pulse flex flex-col gap-6">
    <div className="h-8 bg-gray-100 rounded w-48" />
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="h-20 bg-gray-100 rounded-xl" />
      ))}
    </div>
    <div className="h-72 bg-gray-100 rounded-xl" />
  </div>
);

export default DashboardSkeleton;