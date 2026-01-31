// Hooks
import { ReactNode, createContext, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useMarkets } from "../hooks/useMarkets";
// Libs
import axios from "axios";

// Types
import {
  CoinContextType,
  CoinState,
  Currencies,
  Coin,
  TrendingCoin,
} from "../types/CoinTypes";

export const CoinContext = createContext<CoinContextType>(null!);

const TRENDING_API_URL = "/api/coingecko/trending";

interface CoinProviderProps {
  children: ReactNode;
}

export default function CoinProvider({ children }: CoinProviderProps) {
  const [currency, setCurrency] = useState<Currencies>("INR");
  const [trending, setTrending] = useState<TrendingCoin[]>([]);
  const [coins, setCoins] = useState<Coin[]>([]);

  const trendingQuery = useQuery({
    queryKey: ["trending"],
    queryFn: () => axios.get(TRENDING_API_URL),
    onSuccess: (response) => {
      const data = response.data.data.coins.map(
        (coin: { item: TrendingCoin }) => coin.item,
      );
      setTrending(data);
    },
  });

  const { data: marketCoins, status } = useMarkets({ currency });
  useEffect(() => {
    if (marketCoins) {
      setCoins(marketCoins);
    }
  }, [marketCoins]);

  function updateCurrency(currency: Currencies) {
    setCurrency(currency);
  }

  const data: CoinState = {
    trending,
    coins,
  };

  return (
    <CoinContext.Provider value={{ data, status, currency, updateCurrency }}>
      {children}
    </CoinContext.Provider>
  );
}
