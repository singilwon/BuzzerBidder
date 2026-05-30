import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../api/login.api";
import { authQueryKeys } from "../constants/authQueryKeys";

export function useSignIn() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: login,
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: authQueryKeys.me() });
      await qc.refetchQueries({ queryKey: authQueryKeys.me() });
    },
  });
}
