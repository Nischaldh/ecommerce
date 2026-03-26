const ProductDetailSkeleton = () => (
  <div className="flex flex-col lg:flex-row gap-8 py-6 animate-pulse">
    <div className="flex flex-col gap-3 lg:w-[45%] shrink-0">
      <div className="w-full aspect-square rounded-xl bg-gray-200" />
      <div className="grid grid-cols-3 gap-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="aspect-square rounded-lg bg-gray-200" />
        ))}
      </div>
    </div>
    <div className="flex flex-col gap-4 flex-1">
      <div className="h-8 bg-gray-200 rounded w-3/4" />
      <div className="h-8 bg-gray-200 rounded w-1/3" />
      <div className="h-4 bg-gray-200 rounded w-1/2" />
      <div className="h-4 bg-gray-200 rounded w-1/4" />
      <div className="space-y-2">
        <div className="h-3 bg-gray-200 rounded w-full" />
        <div className="h-3 bg-gray-200 rounded w-full" />
        <div className="h-3 bg-gray-200 rounded w-2/3" />
      </div>
      <div className="h-12 bg-gray-200 rounded-xl mt-4" />
    </div>
  </div>
);

export default ProductDetailSkeleton;
