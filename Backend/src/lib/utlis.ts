import { CartItem } from "../entity/CartItem.js";
import { Commission } from "../entity/Commission.js";
import { Delivery } from "../entity/Delivery.js";
import { Order } from "../entity/Order.js";
import { OrderItem } from "../entity/OrderItems.js";
import { PaymentTransaction } from "../entity/PaymentTransaction.js";
import { Payout } from "../entity/Payout.js";
import { Product } from "../entity/Product.js";
import { Review } from "../entity/Review.js";
import { UserAddress } from "../entity/UserAddresses.js";
import { IAddressResponse } from "../types/address.schema.js";
import { ICartItemResponse } from "../types/cart.schema.js";
import { OrderItemStatus } from "../types/global.types.js";
import {
  IDeliveryResponse,
  IOrderItemResponse,
  IOrderResponse,
} from "../types/order.schema.js";
import {
  IPaymentTransactionResponse,
  IPayoutResponse,
  ISellerCommissionResponse,
} from "../types/payment.schema.js";
import { IProductResponse } from "../types/product.schema.js";
import { IReviewResponse } from "../types/review.schema.js";

export const mapProduct = (product: Product): IProductResponse => {
  return {
    id: product.id,
    name: product.name,
    price: Number(product.price),
    description: product.description,
    category: product.category,
    stock: product.stock,
    primaryImage: product.primaryImage,
    averageRating: Number(product.averageRating),
    reviewCount: product.reviewCount,
    seller: {
      id: product.seller.id,
      name: product.seller.name,
    },
    images: product.images.map((img) => ({
      id: img.id,
      url: img.img_url,
    })),
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
  };
};

export const mapCartItem = (item: CartItem): ICartItemResponse => ({
  id: item.id,
  cart_id: item.cart_id,
  quantity: item.quantity,
  createdAt: item.createdAt,
  updatedAt: item.updatedAt,
  product: {
    id: item.product.id,
    name: item.product.name,
    price: Number(item.product.price),
    primaryImage: item.product.primaryImage,
    sellerId: item.product.seller.id,
    sellerName: item.product.seller.name,
  },
});

export const mapOrderItem = (item: OrderItem): IOrderItemResponse => ({
  id: item.id,
  order_id: item.order_id,
  product_id: item.product_id,
  seller_id: item.seller_id,
  productName: item.productName,
  primaryImage: item.product?.primaryImage ?? "",
  sellerName: item.seller?.name ?? "",
  sellerProfilePic: item.seller?.profilePic ?? null,
  priceAtPurchase: item.priceAtPurchase,
  quantity: item.quantity,
  subtotal: item.subtotal,
  status: item.status,
  trackingNumber: item.delivery?.trackingNumber ?? null,
  carrier: item.delivery?.carrier ?? null,
  estimatedDelivery: item.delivery?.estimatedDelivery ?? null,
  deliveredAt: item.delivery?.deliveredAt ?? null,
  notes: item.delivery?.notes ?? null,
  createdAt: item.createdAt,
  updatedAt: item.updatedAt,
});

export const mapOrder = (order: Order): IOrderResponse => ({
  id: order.id,
  user_id: order.user_id,
  items: order.items.map(mapOrderItem),
  totalAmount: order.totalAmount,
  status: order.status,
  paymentStatus: order.paymentStatus,
  paymentMethod: order.paymentMethod ?? null,
  shippingAddress: order.shippingAddress,
  paymentReference: order.paymentReference,
  createdAt: order.createdAt,
  refundStatus: null,
  updatedAt: order.updatedAt,
});

export const allowedTransitions: Record<OrderItemStatus, OrderItemStatus[]> = {
  [OrderItemStatus.PENDING]: [
    OrderItemStatus.PROCESSING,
    OrderItemStatus.CANCELLED,
  ],
  [OrderItemStatus.PROCESSING]: [OrderItemStatus.SHIPPED],
  [OrderItemStatus.SHIPPED]: [OrderItemStatus.DELIVERED],
  [OrderItemStatus.DELIVERED]: [],
  [OrderItemStatus.CANCELLED]: [],
  [OrderItemStatus.REFUNDED]: [],
};

export const mapAddress = (address: UserAddress): IAddressResponse => ({
  id: address.id,
  user_id: address.user_id,
  fullName: address.fullName,
  phone: address.phone,
  addressLine1: address.addressLine1,
  addressLine2: address.addressLine2,
  city: address.city,
  state: address.state,
  postalCode: address.postalCode,
  country: address.country,
  isDefault: address.isDefault,
  createdAt: address.createdAt,
  updatedAt: address.updatedAt,
});

export const mapDelivery = (delivery: Delivery): IDeliveryResponse => ({
  id: delivery.id,
  order_item_id: delivery.order_item_id,
  status: delivery.status,
  trackingNumber: delivery.trackingNumber,
  carrier: delivery.carrier,
  estimatedDelivery: delivery.estimatedDelivery,
  deliveredAt: delivery.deliveredAt,
  notes: delivery.notes,
  createdAt: delivery.createdAt,
  updatedAt: delivery.updatedAt,
});

export const mapReview = (review: Review): IReviewResponse => ({
  id: review.id,
  productId: review.product_id,
  rating: review.rating,
  comment: review.comment,
  user: {
    id: review.user.id,
    name: review.user.name,
    profilePic: review.user.profilePic ?? null,
  },
  createdAt: review.createdAt,
  updatedAt: review.updatedAt,
});

export const mapTx = (tx: PaymentTransaction): IPaymentTransactionResponse => ({
  id: tx.id,
  order_id: tx.order_id,
  method: tx.method,
  status: tx.status,
  amount: tx.amount,
  pidx: tx.pidx,
  transactionId: tx.transactionId,
  createdAt: tx.createdAt,
});

export const mapPayout = (p: Payout): IPayoutResponse => ({
  id: p.id,
  seller_id: p.seller_id,
  sellerName: p.seller?.name ?? null,
  amount: p.amount,
  status: p.status,
  method: p.method,
  payoutReference: p.payoutReference,
  notes: p.notes,
  createdAt: p.createdAt,
});

export const mapSellerCommission = (
  c: Commission & {
    releaseDate?: Date | null;
  },
): ISellerCommissionResponse => ({
  id: c.id,
  order_id: c.order_id,
  productName: c.orderItem?.productName ?? "Unknown",
  productImage: c.orderItem?.product?.primaryImage ?? null,
  quantity: c.orderItem?.quantity ?? 0,
  itemAmount: Number(c.itemAmount),
  commissionRate: Number(c.commissionRate),
  commissionAmount: Number(c.commissionAmount),
  sellerAmount: Number(c.sellerAmount),
  status: c.status,
  orderStatus: c.order?.status ?? null,
  paymentStatus: c.order?.paymentStatus ?? null,
  releaseDate: c.releaseDate ?? null,
  createdAt: c.createdAt,
});
