export const paymentQueryKeys = {
  all: ["payments"] as const,
  history: () => [...paymentQueryKeys.all, "history"] as const,
  wallet: () => [...paymentQueryKeys.all, "wallet"] as const,
};
