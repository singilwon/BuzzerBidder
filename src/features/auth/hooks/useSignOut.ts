import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../api/logout.api";
import { authQueryKeys } from "../constants/authQueryKeys";

export function useSignOut() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      qc.setQueryData(authQueryKeys.me(), null);
      qc.removeQueries({
        queryKey: authQueryKeys.me(),
      });
    },
  });
}
