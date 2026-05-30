import { useQuery } from "@tanstack/react-query";
import { getMe } from "../api/auth.api";
import { authQueryKeys } from "../constants/authQueryKeys";

export function useMe() {
  return useQuery({
    queryKey: authQueryKeys.me(),
    queryFn: getMe,
    retry: false,
    staleTime: 60_000,
  });
}
