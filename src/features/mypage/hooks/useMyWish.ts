import { useQuery } from "@tanstack/react-query";
import { myWish } from "../api/MyPage.client.api";
import { mypageQueryKeys } from "../constants/mypageQueryKeys";

export function useMyWish(options?: { initialData: ProductCardType[] | undefined }) {
  return useQuery({
    queryKey: mypageQueryKeys.wishes(),
    queryFn: myWish,
    initialData: options?.initialData,
  });
}
