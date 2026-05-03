import { useMutation, useQueryClient } from "@tanstack/react-query";
import Toast from "@/components/common/Toast";
import { confirmTrade } from "../api/trade.api";
import { useRouter } from "next/navigation";
import { tradeQueryKeys } from "../constants/tradeQueryKeys";

export const useConfirmTrade = () => {
  const router = useRouter();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: confirmTrade,

    onSuccess: (_, params) => {
      Toast({ message: "구매를 확정했습니다.", type: "SUCCESS" });

      qc.invalidateQueries({
        queryKey: tradeQueryKeys.detail(params.type, params.dealId),
      });

      router.replace("/");
    },

    onError: error => {
      const message = error instanceof Error ? error.message : "서버 오류가 발생했습니다.";
      Toast({ message, type: "ERROR" });
    },
  });
};
