import { useMutation, useQueryClient } from "@tanstack/react-query";
import { approvePayments } from "../api/Payments.api";
import Toast from "@/components/common/Toast";
import { useRouter } from "next/navigation";
import { paymentQueryKeys } from "../constants/paymentQueryKeys";

export const useApprovePayments = () => {
  const qc = useQueryClient();
  const router = useRouter();
  return useMutation<ApprovePaymentsResponse, Error, ApprovePaymentsRequest>({
    mutationFn: approvePayments,

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["me"] });
      qc.invalidateQueries({ queryKey: ["history-withdrawals"] });
      qc.invalidateQueries({ queryKey: paymentQueryKeys.history() });
      qc.invalidateQueries({ queryKey: paymentQueryKeys.wallet() });
      Toast({ message: "결제를 완료하였습니다.", type: "SUCCESS" });

      router.push("/payments/complete");
    },
    onError: () => {
      Toast({ message: "결제에 실패하였습니다.", type: "ERROR" });
      router.push("/payments/fail");
    },
  });
};
