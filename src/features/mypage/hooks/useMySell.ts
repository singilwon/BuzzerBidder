import { useQuery } from "@tanstack/react-query";
import { mySell } from "../api/MyPage.client.api";
import { mypageQueryKeys } from "../constants/mypageQueryKeys";

export function useMySell(options?: { initialData?: ProductCardType[] }) {
  return useQuery<ProductCardType[]>({
    queryKey: mypageQueryKeys.sales(),
    queryFn: mySell,
    initialData: options?.initialData,
  });
}
