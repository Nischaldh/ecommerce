export interface IPaymentTransactionResponse {
  id: string;
  order_id: string;
  method: string;
  status: string;
  amount: number;
  pidx: string | null;
  transactionId: string | null;
  createdAt: Date;
}

export interface ICommissionResponse {
  id: string;
  order_item_id: string;
  order_id: string;
  seller_id: string;
  itemAmount: number;
  commissionRate: number;
  commissionAmount: number;
  sellerAmount: number;
  status: string;
  createdAt: Date;
}

export interface ISellerBalanceResponse {
  id: string;
  seller_id: string;
  pendingAmount: number;
  availableAmount: number;
  totalPaidOut: number;
}

export interface IPayoutResponse {
  id: string;
  seller_id: string;
  sellerName: string | null
  amount: number;
  status: string;
  method: string;
  payoutReference: string | null;
  notes: string | null;
  createdAt: Date;
}

export interface IInitiatePaymentInput {
  orderId: string;
  method: "KHALTI" | "COD";
}
export interface ISellerDashboardStats {
  totalEarned: number;
  totalCommission: number;
  grossRevenue: number;
  totalItems: number;
  pendingAmount: number;
  availableAmount: number;
  totalPaidOut: number;
}

export interface ISellerCommissionResponse {
  id: string;
  order_id: string;
  productName: string;
  productImage: string | null;
  quantity: number;
  itemAmount: number;
  commissionRate: number;
  commissionAmount: number;
  sellerAmount: number;
  status: string;
  orderStatus: string | null;
  paymentStatus: string | null;
  releaseDate: Date | null;
  createdAt: Date;
}