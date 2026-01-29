// Vercel Serverless Function - 搜索API
export default async function handler(req, res) {
  // 设置CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { query, type = "multi", language = "zh-CN" } = req.query;

  if (!query) {
    return res.status(400).json({ error: "Query parameter is required" });
  }

  // 从环境变量获取API Token
  const TMDB_TOKEN = process.env.TMDB_API_TOKEN;

  if (!TMDB_TOKEN) {
    return res.status(500).json({ error: "TMDB API Token not configured" });
  }

  try {
    const endpoint = type === "multi" ? "/search/multi" : `/search/${type}`;
    const url = `https://api.themoviedb.org/3${endpoint}?query=${encodeURIComponent(query)}&language=${language}&include_adult=false`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${TMDB_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`TMDB API error: ${response.status}`);
    }

    const data = await response.json();

    // 过滤只返回电影和电视剧
    const results = data.results.filter(
      (item) => item.media_type === "movie" || item.media_type === "tv",
    );

    return res.status(200).json({ results });
  } catch (error) {
    console.error("Search API error:", error);
    return res.status(500).json({ error: error.message });
  }
}
