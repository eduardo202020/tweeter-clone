import useSWR from "swr";

import fetcher from "@/libs/fetcher";
import { User } from "@prisma/client";
import { UserAndCount } from "@/pages/api/users/[userId]";

const useUser = (userId: string) => {
  const { data, error, isLoading, mutate } = useSWR<UserAndCount>(
    userId ? `/api/users/${userId}` : null,
    fetcher
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useUser;
