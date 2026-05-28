import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { historyWithdrawals } from "../api/withdrawal.api";
import { withdrawalQueryKeys } from "../constants/withdrawalQueryKeys";

export function useHistoryWithdrawals({ page }: { page: number }) {
  return useQuery({
    queryKey: withdrawalQueryKeys.historyPage(page),
    queryFn: () => historyWithdrawals({ page }),
    placeholderData: keepPreviousData,
  });
}
