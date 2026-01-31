// Components
import SearchCoinCard from "./SearchCoinCard";
import List from "./List";

// Hooks
import { useState } from "react";
import useDebounce from "../hooks/useDebounce";

// Libs
import axios from "axios";

// Types
import { SearchCoin } from "../types/CoinTypes";

export default function SearchCoinList() {
  const [coins, setCoins] = useState<SearchCoin[]>([]);
  const [value, setValue] = useState("");

  async function search() {
    if (!value) return;

    try {
      const response = await axios.get(`/api/coingecko/search?query=${value}`);
      setCoins(response.data.data.coins);
    } catch (error) {
      console.error("Error searching coins:", error);
      setCoins([]);
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setValue(event.target.value);
  }

  useDebounce(search, 1500, [value]);

  return (
    <>
      <input
        className="block w-full px-4 py-2 mx-auto mb-4 border rounded-md shadow-sm border-gray-200 dark:border-gray-800 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 sm:max-w-md bg-white dark:bg-black text-black dark:text-white"
        onChange={handleChange}
        value={value}
        placeholder="Search coins eg. JJTK coin"
        type="text"
      />

      <div className="grid gap-2 sm:grid-cols-2">
        <List
          items={coins}
          render={(coin) => <SearchCoinCard key={coin.id} coin={coin} />}
        />
      </div>
    </>
  );
}
