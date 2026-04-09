export const getCommissionRate = (amount: number): number => {
  if (amount >= 200000) return 0.01;
  if (amount >= 100000) return 0.025;
  if (amount >= 50000) return 0.035;
  return 0.05;
};

export const calculateCommission = (subtotal: number) => {
  const rate = getCommissionRate(subtotal);
  const commissionAmount = parseFloat((subtotal * rate).toFixed(2));
  const sellerAmount = parseFloat((subtotal - commissionAmount).toFixed(2));
  return { rate, commissionAmount, sellerAmount };
};
