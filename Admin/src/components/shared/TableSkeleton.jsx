const TableSkeleton = ({ rows = 6, cols = 5 }) => (
  <div className="animate-pulse">
    <div className="h-10 bg-gray-100 rounded-t-lg mb-0.5" />
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} className="flex gap-4 px-4 py-3 border-b border-gray-50">
        {Array.from({ length: cols }).map((_, j) => (
          <div key={j} className="flex-1 h-4 bg-gray-100 rounded" />
        ))}
      </div>
    ))}
  </div>
);

export default TableSkeleton;