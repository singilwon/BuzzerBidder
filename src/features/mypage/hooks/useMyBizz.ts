import { useQuery } from "@tanstack/react-query";
import { getMyBizz } from "../api/MyBizz.api";
import { mypageQueryKeys } from "../constants/mypageQueryKeys";

export const useGetMyBizz = () => {
  return useQuery({
    queryKey: mypageQueryKeys.bizz(),
    queryFn: getMyBizz,
  });
};
