import { useQuery } from "@tanstack/react-query";
import { myCurrentPurchase } from "../api/MyPage.client.api";
import { mypageQueryKeys } from "../constants/mypageQueryKeys";

export function useMyCurrentPurchase(options?: { initialData: ProductCardType[] | undefined }) {
  return useQuery({
    queryKey: mypageQueryKeys.currentPurchases(),
    queryFn: myCurrentPurchase,
    initialData: options?.initialData,
  });
}
