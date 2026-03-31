import React from "react";

const OrderSkeleton = () => {
  return (
    <div className="animate-pulse bg-white border border-gray-100 rounded-xl overflow-hidden">
      <div className="h-12 bg-gray-100" />
      <div className="p-4 flex gap-4">
        <div className="size-16 sm:size-20 rounded-lg bg-gray-200 shrink-0" />
        <div className="flex-1 flex flex-col gap-2">
          <div className="h-4 bg-gray-200 rounded w-3/4" />
          <div className="h-3 bg-gray-200 rounded w-1/2" />
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="h-5 bg-gray-200 rounded w-20" />
          <div className="h-7 bg-gray-200 rounded w-16" />
        </div>
      </div>
    </div>
  );
};

export default OrderSkeleton;
