import React from "react";

const SellerDetailSkeleton = () => {
  return (
    <div className="py-6 animate-pulse flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <div className="size-20 rounded-full bg-gray-200" />
        <div className="flex flex-col gap-2">
          <div className="h-6 bg-gray-200 rounded w-40" />
          <div className="h-4 bg-gray-200 rounded w-24" />
        </div>
      </div>
    </div>
  );
};

export default SellerDetailSkeleton;
