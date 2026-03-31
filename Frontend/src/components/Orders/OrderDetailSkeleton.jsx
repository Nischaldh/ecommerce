import React from "react";

const OrderDetailSkeleton = () => {
  return (
    <div className="flex flex-col gap-6 py-6 animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-32" />
      <div className="h-10 bg-gray-200 rounded w-1/2" />
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 flex flex-col gap-4">
          <div className="h-40 bg-gray-200 rounded-xl" />
          <div className="h-40 bg-gray-200 rounded-xl" />
        </div>
        <div className="w-full lg:w-80 flex flex-col gap-4">
          <div className="h-32 bg-gray-200 rounded-xl" />
          <div className="h-48 bg-gray-200 rounded-xl" />
        </div>
      </div>
    </div>
  );
};

export default OrderDetailSkeleton;
