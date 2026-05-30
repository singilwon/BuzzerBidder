type PaymentHistoryQueryParams = {
  startDate?: string;
  endDate?: string;
  paymentStatus?: string;
  page?: number;
  size?: number;
};

export const paymentQueryKeys = {
  all: ["payments"] as const,

  history: (params?: PaymentHistoryQueryParams) =>
    [...paymentQueryKeys.all, "history", params ?? {}] as const,

  wallet: () => [...paymentQueryKeys.all, "wallet"] as const,
};
