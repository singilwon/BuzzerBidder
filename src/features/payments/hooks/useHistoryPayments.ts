import { useQuery } from "@tanstack/react-query";
import { historyPayments } from "../api/Payments.api";
import { paymentQueryKeys } from "../constants/paymentQueryKeys";

export function useHistoryPayments() {
  return useQuery({
    queryKey: paymentQueryKeys.history(),
    queryFn: historyPayments,
  });
}
