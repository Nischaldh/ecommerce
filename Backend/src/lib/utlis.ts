import { CartItem } from "../entity/CartItem.js";
import { Delivery } from "../entity/Delivery.js";
import { Order } from "../entity/Order.js";
import { OrderItem } from "../entity/OrderItems.js";
import { Product } from "../entity/Product.js";
import { UserAddress } from "../entity/UserAddresses.js";
import { IAddressResponse } from "../types/address.schema.js";
import { ICartItemResponse } from "../types/cart.schema.js";
import { OrderItemStatus } from "../types/global.types.js";
import {  IDeliveryResponse, IOrderItemResponse, IOrderResponse } from "../types/order.schema.js";
import { IProductResponse } from "../types/product.schema.js";

export const mapProduct = (product: Product): IProductResponse=> {
   return {
    id: product.id,
    name: product.name,
    price: Number(product.price),
    description: product.description,
    category: product.category,
    stock: product.stock,
    primaryImage: product.primaryImage,
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
  },
});


export const mapOrderItem = (item: OrderItem): IOrderItemResponse => ({
  id: item.id,
  order_id: item.order_id,
  product_id: item.product_id,
  seller_id: item.seller_id,
  productName: item.productName,
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
  shippingAddress: order.shippingAddress,
  paymentReference: order.paymentReference,
  createdAt: order.createdAt,
  updatedAt: order.updatedAt,
});

export const allowedTransitions: Record<OrderItemStatus, OrderItemStatus[]> = {
  [OrderItemStatus.PENDING]: [OrderItemStatus.PROCESSING, OrderItemStatus.CANCELLED],
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
