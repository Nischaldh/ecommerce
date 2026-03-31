import React from "react";

const SellerCardSkeleton = () => {
  return (
    <div className="flex flex-col items-center gap-3 p-5 bg-white border border-gray-100 rounded-xl animate-pulse">
      <div className="size-20 rounded-full bg-gray-200" />
      <div className="h-4 bg-gray-200 rounded w-20" />
    </div>
  );
};

export default SellerCardSkeleton;
