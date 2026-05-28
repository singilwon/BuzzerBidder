import { useQuery } from "@tanstack/react-query";
import { myPurchase } from "../api/MyPage.client.api";
import { mypageQueryKeys } from "../constants/mypageQueryKeys";

export function useMyPurchase(options?: { initialData: ProductCardType[] | undefined }) {
  return useQuery({
    queryKey: mypageQueryKeys.purchases(),
    queryFn: myPurchase,
    initialData: options?.initialData,
  });
}
