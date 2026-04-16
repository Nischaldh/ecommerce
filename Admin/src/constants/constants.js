export const configs = {
  // order
  PENDING:      "bg-yellow-100 text-yellow-700",
  PROCESSING:   "bg-blue-100 text-blue-700",
  SHIPPED:      "bg-purple-100 text-purple-700",
  COMPLETED:    "bg-green-100 text-green-700",
  CANCELLED:    "bg-red-100 text-red-700",
  // payment
  PAID:         "bg-green-100 text-green-700",
  UNPAID:       "bg-yellow-100 text-yellow-700",
  REFUNDED:     "bg-red-100 text-red-700",
  // commission
  CONFIRMED:    "bg-blue-100 text-blue-700",
  RELEASED:     "bg-green-100 text-green-700",
  // refund
  REQUESTED:    "bg-yellow-100 text-yellow-700",
  APPROVED:     "bg-blue-100 text-blue-700",
  REJECTED:     "bg-red-100 text-red-700",
  // payout
  FAILED:       "bg-red-100 text-red-700",
  // user
  verified:     "bg-green-100 text-green-700",
  not_verified: "bg-yellow-100 text-yellow-700",
  suspended:    "bg-red-100 text-red-700",
  deleted:      "bg-gray-100 text-gray-600",
  // role
  buyer:        "bg-blue-100 text-blue-700",
  seller:       "bg-orange-100 text-orange-700",
  admin:        "bg-purple-100 text-purple-700",
  super_admin:  "bg-red-100 text-red-700",
};

export const roleTabs = [
  { label: "All", value: "" },
  { label: "Buyers", value: "buyer" },
  { label: "Sellers", value: "seller" },
];

export const statusTabs = [
  { label: "All",       value: "" },
  { label: "Pending",   value: "PENDING" },
  { label: "Confirmed", value: "CONFIRMED" },
  { label: "Released",  value: "RELEASED" },
  { label: "Refunded",  value: "REFUNDED" },
];