const ProductListSkeleton = () => {
  return (
    <div className="flex gap-4 bg-white border border-gray-100 rounded-xl p-3 animate-pulse">
      <div className="w-32 sm:w-40 md:w-48 shrink-0 aspect-square rounded-lg bg-gray-200" />
      <div className="flex flex-col flex-1 gap-3 py-1">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-200 rounded w-full" />
        <div className="h-3 bg-gray-200 rounded w-2/3" />
        <div className="h-5 bg-gray-200 rounded w-1/4" />
        <div className="h-3 bg-gray-200 rounded w-1/3" />
        <div className="mt-auto flex justify-between">
          <div className="h-3 bg-gray-200 rounded w-1/4" />
          <div className="h-3 bg-gray-200 rounded w-1/5" />
        </div>
      </div>
    </div>
  );
};

export default ProductListSkeleton;
