import { BIZZ_LOG_TRANSACTION_TYPE_MAP, type BizzLogFilter } from "../constants/bizzLogFilters";

export const filterBizzLogs = <T extends { transactionType: string }>(
  logs: T[],
  filter: BizzLogFilter
) => {
  if (filter === "전체") {
    return logs;
  }

  const targetTypes = BIZZ_LOG_TRANSACTION_TYPE_MAP[filter];

  return logs.filter(log => targetTypes.includes(log.transactionType));
};

export const sortBizzLogsByRecent = <T extends { transactionDate: string }>(logs: T[]) => {
  return [...logs].sort(
    (a, b) => new Date(b.transactionDate).getTime() - new Date(a.transactionDate).getTime()
  );
};
