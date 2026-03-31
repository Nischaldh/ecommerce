import { Link } from "react-router-dom";
import { itemStatusConfig } from "@/constants/constants";
import { Package, Truck, MapPin } from "lucide-react";

const OrderDetailItems = ({ itemsBySeller }) => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-bold text-gray-900">Items</h2>

      {itemsBySeller.map((group) => (
        <div
          key={group.sellerId}
          className="bg-white border border-gray-100 rounded-xl overflow-hidden"
        >
          {/* Seller header */}
          <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 border-b border-gray-100">
            <Link
              to={`/seller/${group.sellerId}`}
              className="flex items-center gap-2 group"
            >
              <div className="size-8 rounded-full bg-orange-100 overflow-hidden flex items-center justify-center shrink-0">
                {group.sellerProfilePic ? (
                  <img
                    src={group.sellerProfilePic}
                    alt={group.sellerName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-orange-500 text-xs font-bold">
                    {group.sellerName?.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <div>
                <p className="text-xs text-gray-400">Sold by</p>
                <p className="text-sm font-semibold text-gray-800 group-hover:text-orange-500 transition-colors">
                  {group.sellerName}
                </p>
              </div>
            </Link>
          </div>

          {/* Items */}
          <div className="divide-y divide-gray-50">
            {group.items.map((item) => {
              const itemStatus = itemStatusConfig[item.status] || itemStatusConfig.PENDING;

              return (
                <div key={item.id} className="p-4 flex flex-col gap-3">
                  {/* Item row */}
                  <div className="flex gap-3">
                    <Link to={`/products/${item.product_id}`} className="shrink-0">
                      <div className="size-16 sm:size-20 rounded-lg overflow-hidden bg-gray-100">
                        <img
                          src={item.primaryImage}
                          alt={item.productName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </Link>

                    <div className="flex-1 min-w-0">
                      <Link to={`/products/${item.product_id}`}>
                        <h3 className="font-semibold text-gray-900 text-sm hover:text-orange-500 transition-colors line-clamp-2">
                          {item.productName}
                        </h3>
                      </Link>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Qty: {item.quantity} × Rs.{" "}
                        {Number(item.priceAtPurchase).toLocaleString("en-NP")}
                      </p>
                      <div className="flex items-center gap-1.5 mt-1.5">
                        <span className={`text-xs font-medium ${itemStatus.color}`}>
                          ● {itemStatus.label}
                        </span>
                      </div>
                    </div>

                    <div className="shrink-0 text-right">
                      <p className="font-bold text-orange-500 text-sm">
                        Rs. {Number(item.subtotal).toLocaleString("en-NP")}
                      </p>
                    </div>
                  </div>

                  {/* Delivery info if available */}
                  {(item.trackingNumber || item.carrier || item.estimatedDelivery) && (
                    <div className="bg-blue-50 rounded-lg px-3 py-2.5 flex flex-col gap-1.5">
                      <p className="text-xs font-semibold text-blue-700 flex items-center gap-1">
                        <Truck className="size-3.5" />
                        Delivery Info
                      </p>
                      {item.carrier && (
                        <p className="text-xs text-blue-600">
                          Carrier: <span className="font-medium">{item.carrier}</span>
                        </p>
                      )}
                      {item.trackingNumber && (
                        <p className="text-xs text-blue-600">
                          Tracking:{" "}
                          <span className="font-mono font-medium">{item.trackingNumber}</span>
                        </p>
                      )}
                      {item.estimatedDelivery && (
                        <p className="text-xs text-blue-600">
                          Est. Delivery:{" "}
                          <span className="font-medium">
                            {new Date(item.estimatedDelivery).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </p>
                      )}
                      {item.deliveredAt && (
                        <p className="text-xs text-green-600 font-medium flex items-center gap-1">
                          <Package className="size-3.5" />
                          Delivered on{" "}
                          {new Date(item.deliveredAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>
                      )}
                      {item.notes && (
                        <p className="text-xs text-blue-600 italic">{item.notes}</p>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderDetailItems;