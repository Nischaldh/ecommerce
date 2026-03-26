const ReviewSkeleton = () => (
  <div className="animate-pulse flex flex-col gap-3 bg-white border border-gray-100 rounded-xl p-4">
    <div className="flex items-center gap-2.5">
      <div className="size-8 rounded-full bg-gray-200" />
      <div className="flex flex-col gap-1">
        <div className="h-3 bg-gray-200 rounded w-24" />
        <div className="h-2.5 bg-gray-200 rounded w-16" />
      </div>
    </div>
    <div className="h-3 bg-gray-200 rounded w-20" />
    <div className="h-3 bg-gray-200 rounded w-full" />
    <div className="h-3 bg-gray-200 rounded w-3/4" />
  </div>
);

export default ReviewSkeleton;