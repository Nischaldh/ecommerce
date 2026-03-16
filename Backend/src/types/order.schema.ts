export interface IShippingAddress {
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string | null;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface ICreateOrder {
  shippingAddress: IShippingAddress;
  cartItemIds?: string[];
}

export interface IOrderItemResponse {
  id: string;
  order_id: string;
  product_id: string;
  seller_id: string;
  productName: string;
  priceAtPurchase: number;
  quantity: number;
  subtotal: number;
  status: string;
  trackingNumber: string | null;
  carrier: string | null;
  estimatedDelivery: Date | null;
  deliveredAt: Date | null;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface IOrderResponse {
  id: string;
  user_id: string;
  items: IOrderItemResponse[];
  totalAmount: number;
  status: string;
  paymentStatus: string;
  shippingAddress: IShippingAddress;
  paymentReference: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface IDeliveryResponse {
  id: string;
  order_item_id: string;
  status: string;
  trackingNumber: string | null;
  carrier: string | null;
  estimatedDelivery: Date | null;
  deliveredAt: Date | null;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUpdateDelivery {
  trackingNumber?: string;
  carrier?: string;
  estimatedDelivery?: Date;
  notes?: string | null;
}
