export const navBarMenu = [
    {
        id:1,
        title:"Home",
        link:"/"
    },
    {
        id:2,
        title:"Products",
        link:"/products",
    },
    {
        id:3,
        title:"Sellers",
        link:"/sellers"
    }
]


export const pages = [
    {
        name:"home",
        link:"/"
    },

]

export const categories = [
  { id: 1, name: "Accessories", value: "accessories" },
  { id: 2, name: "Bags & Luggage", value: "bags" },
  { id: 3, name: "Beauty & Personal Care", value: "beauty" },
  { id: 4, name: "Books", value: "books" },
  { id: 5, name: "Clothing", value: "clothing" },
  { id: 6, name: "Electronics", value: "electronics" },
  { id: 7, name: "Footwear", value: "footwear" },
  { id: 8, name: "Groceries", value: "groceries" },
  { id: 9, name: "Health & Wellness", value: "health" },
  { id: 10, name: "Home & Kitchen", value: "home_kitchen" },
  { id: 11, name: "Jewelry", value: "jewelry" },
  { id: 12, name: "Office Supplies", value: "office" },
  { id: 13, name: "Pet Supplies", value: "pets" },
  { id: 14, name: "Sports & Fitness", value: "sports" },
  { id: 15, name: "Toys & Games", value: "toys" }
];

export const sortOptions = [
  { label: "Newest First", value: "created_at_desc" },
  { label: "Oldest First", value: "created_at_asc" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Highest Rated", value: "rating" },
];

export const OrderStatus = {
  PENDING: "PENDING",
  CONFIRMED: "CONFIRMED",
  CANCELLED: "CANCELLED",
  COMPLETED: "COMPLETED",
};

export const OrderItemStatus = {
  PENDING: "PENDING",
  PROCESSING: "PROCESSING",
  SHIPPED: "SHIPPED",
  DELIVERED: "DELIVERED",
  CANCELLED: "CANCELLED",
  REFUNDED: "REFUNDED",
};

export const statusConfig = {
  PENDING: {
    label: "Pending",
    color: "bg-yellow-100 text-yellow-700 border-yellow-200",
    dot: "bg-yellow-500",
  },
   PROCESSING: {
    label: "Processing",
    color: "bg-blue-100 text-blue-700 border-blue-200",
    dot: "bg-blue-500",
  },
  SHIPPED: {
    label: "Shipped",
    color: "bg-purple-100 text-purple-700 border-purple-200",
    dot: "bg-purple-500",
  },
  CONFIRMED: {
    label: "Confirmed",
    color: "bg-blue-100 text-blue-700 border-blue-200",
    dot: "bg-blue-500",
  },
  CANCELLED: {
    label: "Cancelled",
    color: "bg-red-100 text-red-700 border-red-200",
    dot: "bg-red-500",
  },
  COMPLETED: {
    label: "Completed",
    color: "bg-green-100 text-green-700 border-green-200",
    dot: "bg-green-500",
  },
};

export const itemStatusConfig = {
  PENDING: { label: "Pending", color: "text-yellow-600" },
  PROCESSING: { label: "Processing", color: "text-blue-600" },
  SHIPPED: { label: "Shipped", color: "text-purple-600" },
  DELIVERED: { label: "Delivered", color: "text-green-600" },
  CANCELLED: { label: "Cancelled", color: "text-red-600" },
  REFUNDED: { label: "Refunded", color: "text-gray-600" },
};

export const statusTabs = [
  { label: "All", value: "" },
  { label: "Pending", value: "PENDING" },
  { label: "Confirmed", value: "CONFIRMED" },
  { label: "Completed", value: "COMPLETED" },
  { label: "Cancelled", value: "CANCELLED" },
];

export const dashboardStatusConfig = {
  PENDING: { label: "Pending", color: "bg-yellow-100 text-yellow-700" },
  CONFIRMED: { label: "Confirmed", color: "bg-blue-100 text-blue-700" },
  RELEASED: { label: "Released", color: "bg-green-100 text-green-700" },
  REFUNDED: { label: "Refunded", color: "bg-red-100 text-red-700" },
};

export const paymentStatusConfig = {
  UNPAID: { label: "Unpaid", color: "text-yellow-600" },
  PAID: { label: "Paid", color: "text-green-600" },
  REFUNDED: { label: "Refunded", color: "text-red-600" },
};


export const refundLabels = {
    REQUESTED: { label: "Refund Requested", color: "bg-yellow-50 border-yellow-100 text-yellow-700" },
    APPROVED:  { label: "Refund Approved",  color: "bg-blue-50 border-blue-100 text-blue-700" },
    COMPLETED: { label: "Refund Completed", color: "bg-green-50 border-green-100 text-green-700" },
    REJECTED:  { label: "Refund Rejected",  color: "bg-red-50 border-red-100 text-red-700" },
  };

