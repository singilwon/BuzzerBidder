import { useSearchParams } from "next/navigation";

export const usePaymentSearchParams = () => {
  const params = useSearchParams();

  const paymentKey = params.get("paymentKey");
  const orderId = params.get("orderId");
  const amount = Number(params.get("amount"));

  const isValid = Boolean(paymentKey) && Boolean(orderId) && Number.isFinite(amount) && amount > 0;

  return {
    paymentKey,
    orderId,
    amount,
    isValid,
  };
};
