import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { NewsArticle } from "../types/NewsTypes";

export default function useNews() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["news"],
    queryFn: async (): Promise<NewsArticle[]> => {
      const response = await axios.get("/api/news");
      return response.data.data.articles;
    },

    // Phase 1 stability rules
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: Infinity,
  });

  return {
    news: data ?? [],
    loading: isLoading,
    error: isError ? (error as Error).message : null,
  };
}
