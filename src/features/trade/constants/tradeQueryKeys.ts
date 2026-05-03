export const tradeQueryKeys = {
  all: ["trade"] as const,
  detail: (auctionType: "LIVE" | "DELAYED", dealId: string) =>
    [...tradeQueryKeys.all, "detail", auctionType, dealId] as const,
};
