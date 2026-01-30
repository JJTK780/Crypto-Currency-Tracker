# Trackibit

## 1. Project Overview

**Trackibit** is a production-ready cryptocurrency tracking web application built with **React + TypeScript** and deployed on **Vercel**.  
It provides real-time crypto market data, trending coins, search, curated news, and user-specific features such as authentication and price alerts.

The application is designed with **scalability, API safety, and performance** in mind, using backend proxy APIs, caching strategies, and modern state-management patterns.

![image alt](https://github.com/JJTK780/Crypto-Currency-Tracker/blob/ee9a5bccbe1a07c37c65934dd1ac8a2f7358f390/screenshot%20github%20cct.png)

## 2. Features and Functionality

### 2.1 User Authentication

- Utilizes Clerk for secure user authentication and session management.
- Ensures personalized experience with user-specific favorites and alerts.

### 2.2 Tabbed Interface

- **Trending:** Displays a curated list of trending cryptocurrencies with ranking.
- **Cryptocurrencies:** Shows a comprehensive list of coins with detailed info such as current price, market cap, and price changes.
- **Search:** Allows users to search for coins by name or symbol.
- **Favourites:** Users can add/remove coins to their favorites list for quick access.
- **Crypto News:** Aggregates and displays the latest news articles related to cryptocurrencies.

### 2.3 Price Alerts

- Users can create alerts specifying:
  - Coin ID and Name
  - Target Price
  - Direction (Above or Below)
- Alerts trigger browser notifications or alert popups when conditions are met.
- Alerts can be toggled active/inactive or removed.
- Alerts are persisted in localStorage for persistence across sessions.

### 2.4 Data Management

- Uses React Query for efficient data fetching, caching, and background updates.
- Coin data and news are refreshed every 5 minutes.
- Global state management via React Context API for coins, favorites, and price alerts.

### 2.5 Favorites Management

- Users can mark coins as favorites by clicking a heart icon.
- Favorites are managed globally and displayed in a dedicated tab.

### 2.6 Responsive and Accessible UI

- Built with Headless UI Tabs for accessible keyboard navigation.
- Supports dark mode and responsive layouts for various screen sizes.
- Uses Tailwind CSS for styling.

## 3. Architecture and Technology Stack

Trackibit follows a **frontend + serverless backend** architecture.

### Why this matters:

- No API keys exposed to the browser
- Rate limits are easier to manage
- Caching improves performance
- Production-safe architecture

### Frontend

- React + TypeScript
- Vite
- Tailwind CSS
- Headless UI
- React Router DOM

### State & Data

- React Context API
- @tanstack/react-query
- LocalStorage (alerts & preferences)

### Authentication

- Clerk React SDK  
  _(Development instance for Phase 1 / beta)_

### Backend / Infrastructure

- Vercel Serverless Functions
- Backend proxy for:
  - CoinGecko API
  - News API
- Edge-friendly caching headers

---

## 4. Context Providers and State Management

- **CoinProvider:** Manages fetching and providing coin data globally.
- **FavoritesProvider:** Manages user's favorite coins.
- **PriceAlertProvider:** Manages price alerts, including adding, removing, toggling, and triggering notifications.

## 5. Component Responsibilities

- `App.tsx` – Application shell & routing
- `MenuTabs.tsx` – Navigation tabs
- `MenuPanels.tsx` – Tab content rendering
- `CoinCard.tsx` – Individual coin display
- `TrendingCoinCard.tsx` – Trending coin UI
- `SearchCoinList.tsx` – Search logic & UI
- `NewsList.tsx` – Crypto news rendering
- `PriceAlertForm.tsx` – Alert creation
- `PriceAlertList.tsx` – Alert management
- `Layout.tsx` – Shared layout (header/footer)

---

## 6. Backend Proxy & Caching Strategy

-### CoinGecko

- All CoinGecko requests are routed through `/api/coingecko/*`
- Caching: **30–60 seconds**
- Prevents direct client exposure and rate-limit issues

### News API

- Routed through `/api/news`
- API key stored securely in Vercel environment variables
- Caching: **5–10 minutes**

---

## 7. Data Fetching Strategy

- React Query handles:
  - Caching
  - Background updates
  - Request deduplication
- Global defaults:
  - Reduced retries
  - Disabled refetch on focus
  - Stable stale times for market data

## 8. Notification and Alert System

-
- Uses the Web Notifications API
- Requests permission on alert creation
- Alerts auto-disable after triggering
- Fallback UI alerts used when notifications are blocked

---

## 9. Authentication Flow

- Clerk handles user sign-in, sign-up, and session management.
- Authentication state is checked before rendering the main app.
- User-specific data like favorites and alerts are scoped to authenticated users.

## 10. Styling and UI Framework

- Tailwind CSS provides utility-first styling.
- Headless UI Tabs ensure accessible tab navigation.
- Dark mode support is included.
- Responsive design adapts to different screen sizes.

## 11. Running and Testing the Project

- Install dependencies: `npm install`
- Start development server: `npm run dev`
- Access app at `http://localhost:5174` (or assigned port)
- Test all tabs, price alert creation and notifications, authentication flows, and favorites management.
- Ensure notifications permissions are granted for alerts.

## 12. Possible Extensions and Notes

- Please refer wiki https://github.com/JJTK780/trackibit/wiki

## Licence

This is an open-source project and is available under the [**MIT License**](LICENSE). You are free to use, modify, and distribute the code in accordance with the terms of the license.

## Contributors

Contributions are highly appreciated! If you encounter any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request.

[JJTK780](https://github.com/JJTK780) & [drupathmm](https://github.com/drupathmm)

## Contact

GitHub:

- [JJTK780](https://github.com/JJTK780)
- [drupathmm](https://github.com/drupathmm)

LinkedIn profile: (https://www.linkedin.com/in/jefsonjacob)
