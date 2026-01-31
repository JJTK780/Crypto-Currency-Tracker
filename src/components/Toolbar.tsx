import { Listbox, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useContext } from "react";
import { CoinContext } from "../context/CoinProvider";
import { Currencies } from "../types/CoinTypes";
import { UserButton, SignInButton, useAuth } from "@clerk/clerk-react";
import { useTheme } from "../context/ThemeContext";

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeOption {
  value: ThemeMode;
  label: string;
  icon: JSX.Element;
}

export default function Toolbar() {
  const { currency, updateCurrency } = useContext(CoinContext);
  const { isSignedIn } = useAuth();
  const { theme, setTheme } = useTheme();
  const currencies: Currencies[] = ["EUR", "USD", "INR"];

  const themeOptions: ThemeOption[] = [
    {
      value: 'light',
      label: 'Light',
      icon: (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m8.66-9h-1M4.34 12h-1m15.07 6.07l-.7-.7M6.34 6.34l-.7-.7m12.02 12.02l-.7-.7M6.34 17.66l-.7-.7M12 7a5 5 0 100 10 5 5 0 000-10z" />
        </svg>
      )
    },
    {
      value: 'dark',
      label: 'Dark',
      icon: (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" />
        </svg>
      )
    },
    {
      value: 'system',
      label: 'System',
      icon: (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    }
  ];

  const currentThemeOption = themeOptions.find(option => option.value === theme) || themeOptions[2];

  return (
    <nav className="flex justify-end items-center w-full max-w-4xl gap-4 p-2 mx-auto">
      <div className="flex items-center gap-4">
        <Listbox value={currency} onChange={updateCurrency}>
          <div className="relative">
            <Listbox.Button className="px-2 bg-white border rounded-md shadow-sm py-0.5 border-gray-200 text-emerald-500 dark:bg-black dark:border-gray-800">
              {currency}
            </Listbox.Button>

            <Transition
              as={Fragment}
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute px-2 mt-1 overflow-auto bg-white border rounded-md shadow-sm cursor-pointer select-none py-0.5 border-gray-200 dark:bg-black dark:border-gray-800 z-10">
                {currencies.map((currency, index) => (
                  <Listbox.Option key={index} value={currency} as={Fragment}>
                    {({ selected }) => (
                      <li className={selected ? "hidden" : "dark:text-white"}>{currency}</li>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>

        <Listbox value={theme} onChange={setTheme}>
          <div className="relative">
            <Listbox.Button className="flex items-center gap-2 px-3 py-2 bg-white border rounded-md shadow-sm border-gray-200 dark:bg-black dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-950">
              <span className="text-gray-700 dark:text-gray-300">{currentThemeOption.icon}</span>
              <span className="text-sm text-gray-700 dark:text-gray-300">{currentThemeOption.label}</span>
            </Listbox.Button>

            <Transition
              as={Fragment}
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute right-0 mt-1 overflow-auto bg-white border rounded-md shadow-lg cursor-pointer select-none border-gray-200 dark:bg-black dark:border-gray-800 z-10 min-w-[140px]">
                {themeOptions.map((option) => (
                  <Listbox.Option key={option.value} value={option.value} as={Fragment}>
                    {({ active, selected }) => (
                      <li className={`flex items-center gap-3 px-3 py-2 ${active ? 'bg-gray-100 dark:bg-gray-900' : ''} ${selected ? 'text-emerald-500' : 'text-gray-700 dark:text-gray-300'}`}>
                        <span>{option.icon}</span>
                        <span className="text-sm">{option.label}</span>
                      </li>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>

        {isSignedIn ? (
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "w-10 h-10",
                userButtonTrigger: "focus:outline-none",
              },
            }}
          />
        ) : (
          <SignInButton mode="modal">
            <button className="px-4 py-2 font-medium text-white transition-colors bg-emerald-500 rounded-md hover:bg-emerald-600">
              Login
            </button>
          </SignInButton>
        )}
      </div>
    </nav>
  );
}
