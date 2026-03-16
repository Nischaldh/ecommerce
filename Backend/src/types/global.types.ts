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