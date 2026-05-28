import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createWithdrawal } from "../api/withdrawal.api";
import Toast from "@/components/common/Toast";
import { withdrawalQueryKeys } from "../constants/withdrawalQueryKeys";
import { paymentQueryKeys } from "@/features/payments/constants/paymentQueryKeys";

type ErrorType = {
  msg: string;
  resultCode: string;
  data: null;
};

export const useCreateWithdrawal = () => {
  const qc = useQueryClient();

  return useMutation<CreateWithdrawalResponse, ErrorType, CreateWithdrawalRequest>({
    mutationFn: createWithdrawal,

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["me"] });
      qc.invalidateQueries({ queryKey: withdrawalQueryKeys.history() });
      qc.invalidateQueries({ queryKey: paymentQueryKeys.wallet() });

      Toast({
        message: "출금 요청이 완료되었습니다.",
        type: "SUCCESS",
      });
    },

    onError: err => {
      Toast({
        message: err.msg ?? "출금 요청 중 오류가 발생했습니다.",
        type: "ERROR",
      });
    },
  });
};
