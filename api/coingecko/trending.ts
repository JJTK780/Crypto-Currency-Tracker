import type { VercelRequest, VercelResponse } from "@vercel/node";

const COINGECKO_BASE_URL = "https://api.coingecko.com/api/v3";

export default async function handler(
  _req: VercelRequest,
  res: VercelResponse,
) {
  try {
    const response = await fetch(`${COINGECKO_BASE_URL}/search/trending`, {
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("CoinGecko API error");
    }

    const data = await response.json();

    // Cache for 5 minutes
    res.setHeader(
      "Cache-Control",
      "public, s-maxage=300, stale-while-revalidate=60",
    );

    return res.status(200).json({ data });
  } catch (error) {
    console.error("[CoinGecko Trending Error]", error);
    return res.status(500).json({
      error: "Failed to fetch trending coins",
    });
  }
}
