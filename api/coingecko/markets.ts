import type { VercelRequest, VercelResponse } from "@vercel/node";

const COINGECKO_BASE_URL = "https://api.coingecko.com/api/v3";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const currency = (req.query.currency as string) || "EUR";

    const url =
      `${COINGECKO_BASE_URL}/coins/markets` +
      `?vs_currency=${currency}` +
      `&order=market_cap_desc` +
      `&per_page=100` +
      `&page=1` +
      `&sparkline=true` +
      `&price_change_percentage=1h` +
      `&locale=en`;

    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("CoinGecko API error");
    }

    const data = await response.json();

    // Cache for 60 seconds at the edge
    res.setHeader(
      "Cache-Control",
      "public, s-maxage=60, stale-while-revalidate=30",
    );

    return res.status(200).json({ data });
  } catch (error) {
    console.error("[CoinGecko Markets Error]", error);
    return res.status(500).json({
      error: "Failed to fetch market data",
    });
  }
}
