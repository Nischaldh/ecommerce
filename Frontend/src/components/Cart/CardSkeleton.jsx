const CartSkeleton = () => (
  <div className="flex flex-col gap-3 animate-pulse">
    {Array.from({ length: 3 }).map((_, i) => (
      <div key={i} className="flex gap-3 p-4 rounded-xl border border-gray-100">
        <div className="size-20 sm:size-24 rounded-lg bg-gray-200 shrink-0" />
        <div className="flex-1 flex flex-col gap-2">
          <div className="h-4 bg-gray-200 rounded w-3/4" />
          <div className="h-3 bg-gray-200 rounded w-1/2" />
          <div className="h-3 bg-gray-200 rounded w-1/4" />
        </div>
      </div>
    ))}
  </div>
);
export default CartSkeleton;