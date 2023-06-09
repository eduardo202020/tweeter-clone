import useSWR from "swr";

import fetcher from "@/libs/fetcher";

import { ITotalPost } from "@/app";

const usePosts = (userId?: string | undefined) => {
  // creamos el url dinamico que depandera del argumento
  const url = userId ? `/api/posts?userId=${userId}` : "/api/posts";

  const { data, error, isLoading, mutate } = useSWR<ITotalPost[]>(url, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default usePosts;
