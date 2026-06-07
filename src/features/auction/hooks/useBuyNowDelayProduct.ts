import { useMutation, useQueryClient } from "@tanstack/react-query";
import { buyNowDelayProduct } from "../api/auctionProduct.api";
import { mypageQueryKeys } from "@/features/mypage/constants/mypageQueryKeys";

export const useBuyNowDelayProduct = (productId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => buyNowDelayProduct(productId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["delay-product", productId],
      });

      queryClient.invalidateQueries({
        queryKey: mypageQueryKeys.purchases(),
      });

      queryClient.invalidateQueries({
        queryKey: mypageQueryKeys.currentPurchases(),
      });
    },
  });
};
