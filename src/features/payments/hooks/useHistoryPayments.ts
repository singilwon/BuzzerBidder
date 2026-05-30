import { useQuery } from "@tanstack/react-query";
import { historyPayments } from "../api/Payments.api";
import { paymentQueryKeys } from "../constants/paymentQueryKeys";

type UseHistoryPaymentsParams = {
  startDate?: string;
  endDate?: string;
  paymentStatus?: string;
  page?: number;
  size?: number;
};

export function useHistoryPayments(params: UseHistoryPaymentsParams = {}) {
  return useQuery({
    queryKey: paymentQueryKeys.history(params),
    queryFn: () => historyPayments(params),
  });
}
