import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type UseMarketsParams = {
  currency: string;
};

export function useMarkets({ currency }: UseMarketsParams) {
  return useQuery({
    queryKey: ["markets", currency],
    queryFn: async () => {
      const response = await axios.get(
        `/api/coingecko/markets?currency=${currency}`,
      );

      return response.data.data;
    },

    //  Phase 1 stability settings
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: Infinity,
  });
}
