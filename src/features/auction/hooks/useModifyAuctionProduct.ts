import { useMutation, useQueryClient } from "@tanstack/react-query";
import { modifyDelayProduct, modifyLiveProduct } from "../api/auctionProduct.api";
import { mypageQueryKeys } from "@/features/mypage/constants/mypageQueryKeys";

export const useModifyAuctionProduct = (productId: number) => {
  const queryClient = useQueryClient();
  useMutation<CreateLiveProductResponse | CreateDelayProductResponse, unknown, CreateProductForm>({
    mutationFn: (form: CreateProductForm) => {
      const { type, ...body } = form;

      if (type === "LIVE") {
        return modifyLiveProduct(body as CreateLiveProductRequest, productId);
      }

      return modifyDelayProduct(body as CreateDelayProductRequest, productId);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: mypageQueryKeys.sales(),
      });
    },
  });
};
