import { useQuery } from "@tanstack/react-query";
import { myWallet } from "../api/Payments.api";
import { paymentQueryKeys } from "../constants/paymentQueryKeys";

export function useMyWallet() {
  return useQuery({
    queryKey: paymentQueryKeys.wallet(),
    queryFn: myWallet,
  });
}
