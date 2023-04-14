import useSWR from "swr";

import fetcher from "@/libs/fetcher";
import { UserAndCount } from "@/pages/api/users/[userId]";

const useCurrentUser = () => {
  const { data, error, isLoading, mutate } = useSWR<UserAndCount>(
    "/api/current",
    fetcher
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useCurrentUser;
