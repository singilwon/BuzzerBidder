export const withdrawalQueryKeys = {
  all: ["withdrawals"] as const,

  history: () => [...withdrawalQueryKeys.all, "history"] as const,

  historyPage: (page: number) => [...withdrawalQueryKeys.history(), page] as const,
};
