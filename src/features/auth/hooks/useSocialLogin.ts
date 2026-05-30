import { useMutation, useQueryClient } from "@tanstack/react-query";
import { socialLogin } from "../api/socialLogin.api";
import { authQueryKeys } from "../constants/authQueryKeys";

export function useSocialLogin() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: socialLogin,
    onSuccess: async () => {
      qc.invalidateQueries({ queryKey: authQueryKeys.me() });
    },
  });
}
