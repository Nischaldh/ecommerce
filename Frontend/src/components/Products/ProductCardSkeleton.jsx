const ProductCardSkeleton = () => {
  return (
    <div className="animate-pulse flex flex-col gap-2">
      <div className="aspect-square bg-gray-200 rounded-md" />
      <div className="space-y-2">
        <div className="h-3 bg-gray-200 rounded w-1/2" />
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/4" />
      </div>
    </div>
  );
};

export default ProductCardSkeleton;