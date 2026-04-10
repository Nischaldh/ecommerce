export const getEffectiveOrderStatus = (order) => {
  if (order.status === "COMPLETED" || order.status === "CANCELLED") {
    return order.status;
  }

  const items = order.items ?? [];
  if (!items.length) return order.status;


  const statuses = items.map((i) => i.status);
  if (statuses.every((s) => s === "DELIVERED")) return "COMPLETED";
  if (statuses.every((s) => s === "CANCELLED")) return "CANCELLED";
  if (statuses.some((s) => s === "SHIPPED")) return "SHIPPED";
  if (statuses.some((s) => s === "PROCESSING")) return "PROCESSING";
  return "PENDING";
};