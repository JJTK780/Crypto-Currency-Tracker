import type { VercelRequest, VercelResponse } from "@vercel/node";
const NEWS_API_BASE_URL = "https://newsapi.org/v2/everything";

export default async function handler(
  _req: VercelRequest,
  res: VercelResponse,
) {
  try {
    const apiKey = process.env.NEWS_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: "News API key not configured",
      });
    }

    const response = await fetch(
      `${NEWS_API_BASE_URL}?q=cryptocurrency&language=en&pageSize=20&sortBy=publishedAt&apiKey=${apiKey}`,
    );

    if (!response.ok) {
      throw new Error("News API error");
    }

    const data = await response.json();

    // Cache news for 10 minutes
    res.setHeader(
      "Cache-Control",
      "public, s-maxage=600, stale-while-revalidate=120",
    );

    return res.status(200).json({ data });
  } catch (error) {
    console.error("[News API Error]", error);
    return res.status(500).json({
      error: "Failed to fetch news",
    });
  }
}
export const config = {
  runtime: "nodejs",
};
