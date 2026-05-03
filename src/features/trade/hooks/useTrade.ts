import { useQuery } from "@tanstack/react-query";
import { trade } from "../api/trade.api";
import { tradeQueryKeys } from "../constants/tradeQueryKeys";

export function useTradeDetail(params: { auctionType: "LIVE" | "DELAYED"; dealId: string }) {
  return useQuery({
    queryKey: tradeQueryKeys.detail(params.auctionType, params.dealId),
    queryFn: () => trade(params),
    enabled: !!params.dealId,
  });
}
