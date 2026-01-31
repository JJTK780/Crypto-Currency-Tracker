// Components
import { Tab } from "@headlessui/react";

export default function MenuTabs() {
  return (
    <Tab.List className="flex flex-wrap items-center w-full px-3 py-2 mx-auto bg-white border rounded-md shadow-sm sm:items-stretch sm:flex-row sm:max-w-md justify-evenly sm:gap-2 border-gray-200 dark:bg-black dark:border-gray-800">
      <Tab className="py-2 font-medium transition-colors border-b-2 border-transparent px-1.5 text-gray-600 dark:text-gray-400 ui-selected:outline-none ui-selected:text-emerald-500 ui-selected:border-b-emerald-500 dark:ui-selected:text-emerald-400 hover:text-black dark:hover:text-white">
        Trending
      </Tab>

      <Tab className="py-2 font-medium transition-colors border-b-2 border-transparent px-1.5 text-gray-600 dark:text-gray-400 ui-selected:outline-none ui-selected:text-emerald-500 ui-selected:border-b-emerald-500 dark:ui-selected:text-emerald-400 hover:text-black dark:hover:text-white">
        Cryptocurrencies
      </Tab>

      <Tab className="py-2 font-medium transition-colors border-b-2 border-transparent px-1.5 text-gray-600 dark:text-gray-400 ui-selected:outline-none ui-selected:text-emerald-500 ui-selected:border-b-emerald-500 dark:ui-selected:text-emerald-400 hover:text-black dark:hover:text-white">
        Search
      </Tab>

      <Tab className="py-2 font-medium transition-colors border-b-2 border-transparent px-1.5 text-gray-600 dark:text-gray-400 ui-selected:outline-none ui-selected:text-emerald-500 ui-selected:border-b-emerald-500 dark:ui-selected:text-emerald-400 hover:text-black dark:hover:text-white">
        Favourites
      </Tab>

      <Tab className="py-2 font-medium transition-colors border-b-2 border-transparent px-1.5 text-gray-600 dark:text-gray-400 ui-selected:outline-none ui-selected:text-emerald-500 ui-selected:border-b-emerald-500 dark:ui-selected:text-emerald-400 hover:text-black dark:hover:text-white">
        Crypto News
      </Tab>
    </Tab.List>
  );
}
