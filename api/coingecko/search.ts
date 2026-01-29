import type { VercelRequest, VercelResponse } from "@vercel/node";

const COINGECKO_BASE_URL = "https://api.coingecko.com/api/v3";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const query = req.query.query as string;

    if (!query) {
      return res.status(400).json({
        error: "Missing search query",
      });
    }

    const response = await fetch(
      `${COINGECKO_BASE_URL}/search?query=${encodeURIComponent(query)}`,
      {
        headers: {
          Accept: "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error("CoinGecko API error");
    }

    const data = await response.json();

    // Very short cache (search is user-driven)
    res.setHeader(
      "Cache-Control",
      "public, s-maxage=15, stale-while-revalidate=15",
    );

    return res.status(200).json({ data });
  } catch (error) {
    console.error("[CoinGecko Search Error]", error);
    return res.status(500).json({
      error: "Failed to search coins",
    });
  }
}
