import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ClerkProvider } from "@clerk/clerk-react";

import CoinProvider from "./context/CoinProvider";
import { PriceAlertProvider } from "./context/PriceAlertProvider";

// Frontend env check (correct place)
if (!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key");
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      staleTime: Infinity,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ClerkProvider
      publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}
      clerkJSUrl="https://cdn.clerk.com"
    >
      <QueryClientProvider client={queryClient}>
        <CoinProvider>
          <PriceAlertProvider>
            <App />
          </PriceAlertProvider>
        </CoinProvider>
      </QueryClientProvider>
    </ClerkProvider>
  </React.StrictMode>,
);
