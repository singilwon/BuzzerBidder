import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDelayProduct, createLiveProduct } from "../api/auctionProduct.api";
import { mypageQueryKeys } from "@/features/mypage/constants/mypageQueryKeys";

export const useCreateAuctionProduct = () => {
  const queryClient = useQueryClient();

  return useMutation<CreateLiveProductData | CreateDelayProductData, Error, CreateProductForm>({
    mutationFn: (form: CreateProductForm) => {
      const { type, ...body } = form;

      if (type === "LIVE") {
        return createLiveProduct(body as CreateLiveProductRequest);
      }

      return createDelayProduct(body as CreateDelayProductRequest);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: mypageQueryKeys.sales(),
      });
    },
  });
};
