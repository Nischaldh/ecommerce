import { Star } from "lucide-react";

const SellerProfile = ({ seller }) => {
  return (
    <div className="flex items-center gap-5 p-5 bg-white border border-gray-100 rounded-xl">
      <div className="size-20 rounded-full bg-orange-100 overflow-hidden flex items-center justify-center shrink-0 ring-4 ring-orange-50">
        {seller.profilePic ? (
          <img
            src={seller.profilePic}
            alt={seller.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-orange-500 text-3xl font-bold">
            {seller.name?.charAt(0).toUpperCase()}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
          {seller.name}
        </h1>
        <div className="flex items-center gap-4 text-sm text-gray-500 flex-wrap">
          <span>{seller.totalProducts} products</span>
          <span className="flex items-center gap-1">
            <Star className="size-3.5 fill-orange-400 text-orange-400" />
            {Number(seller.averageRating).toFixed(1)} avg rating
          </span>
          <span>
            Joined{" "}
            {new Date(seller.createdAt).toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SellerProfile;