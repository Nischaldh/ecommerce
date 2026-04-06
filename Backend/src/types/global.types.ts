export type LogContent =  {
    method: string;
    url: string;
    host: string | undefined;
    ms: number;
}

export enum userRole  {
    BUYER ="buyer", 
    SELLER = "seller"
}

export enum userStatus {
    VERIFIED = "verified",
    NOT_VERIFIED = "not_verified"
}

export type JwtPayload = {
    id: string;
    email: string;
    role: userRole;
}

export type successResponse ={
    success:boolean;
    message:string,
}


export type queryType = {
    name?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    minRating?: number;   
    sort?: string;        
    page?: number;
    pageSize?: number;
}

export enum OrderStatus {
  PENDING = "PENDING",       
  CONFIRMED = "CONFIRMED",  
  CANCELLED = "CANCELLED",
  COMPLETED = "COMPLETED",   
}

export enum PaymentStatus {
  UNPAID = "UNPAID",
  PAID = "PAID",
  REFUNDED = "REFUNDED",
}

export enum OrderItemStatus {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
  REFUNDED = "REFUNDED",
}

export enum DeliveryStatus {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  SHIPPED = "SHIPPED",
  OUT_FOR_DELIVERY = "OUT_FOR_DELIVERY",
  DELIVERED = "DELIVERED",
  FAILED = "FAILED",
  RETURNED = "RETURNED",
}

export enum SortBy{
CREATED_AT_ASC = "created_at_asc",
CREATED_AT_DESC = "created_at_desc",
PRICE_ASC = "price_asc",
PRICE_DESC = "price_desc",
RATING = "rating"
}

export enum NotificationType {
  ORDER_PLACED = "ORDER_PLACED",
  ORDER_STATUS_UPDATED = "ORDER_STATUS_UPDATED",
  ORDER_CANCELLED = "ORDER_CANCELLED",
  PAYMENT_RECEIVED = "PAYMENT_RECEIVED",
  PAYOUT_PROCESSED = "PAYOUT_PROCESSED",
  DELIVERY_UPDATED = "DELIVERY_UPDATED",
}
