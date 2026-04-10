import axios from "axios";
import env from "./env.js";

const KHALTI_BASE = env.KHATLI_BASE_URL;

export const initiateKhaltiPayment = async (params: {
  amount: number;
  orderId: string;
  orderName: string;
  returnUrl: string;
}) => {
  const res = await axios.post(
    `${KHALTI_BASE}/epayment/initiate/`,
    {
      return_url: params.returnUrl,
      website_url: env.FRONTEND_URL,
      amount: Math.round(params.amount * 100), 
      purchase_order_id: params.orderId,
      purchase_order_name: params.orderName,
    },
    { headers: { Authorization: `Key ${env.KHALTI_SECRET_KEY}` } }
  );
  return res.data as {
    pidx: string;
    payment_url: string;
    expires_at: string;
  };
};

export const verifyKhaltiPayment = async (pidx: string) => {
  const res = await axios.post(
    `${KHALTI_BASE}/epayment/lookup/`,
    { pidx },
    { headers: { Authorization: `Key ${env.KHALTI_SECRET_KEY}` } }
  );
  return res.data as {
    pidx: string;
    status: string; 
    transaction_id: string;
    total_amount: number; 
    fee_amount: number;
  };
};

export const initiateKhaltiTransfer = async (params: {
  amount: number;        
  receiverKhaltiId: string; 
  remarks: string;
}) => {
  const res = await axios.post(
    `${KHALTI_BASE}/payment/transfer/`,
    {
      amount: Math.round(params.amount * 100),
      mobile: params.receiverKhaltiId,
      remarks: params.remarks,
    },
    { headers: { Authorization: `Key ${env.KHALTI_SECRET_KEY}` } }
  );
  return res.data as {
    success: boolean;
    transfer_id: string;
    message: string;
  };
};