// Vercel Serverless Function - 获取详情API
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

  const { id, type, languages = "zh-CN,zh-TW,en-US,ja-JP" } = req.query;

  if (!id || !type) {
    return res
      .status(400)
      .json({ error: "ID and type parameters are required" });
  }

  // 从环境变量获取API Token
  const TMDB_TOKEN = process.env.TMDB_API_TOKEN;

  if (!TMDB_TOKEN) {
    return res.status(500).json({ error: "TMDB API Token not configured" });
  }

  try {
    // 获取多语言信息
    const langArray = languages.split(",");
    const promises = langArray.map((lang) =>
      fetchDetails(id, type, lang, TMDB_TOKEN),
    );

    const results = await Promise.all(promises);

    // 合并多语言结果
    const combined = results[0]; // 使用第一个作为基础
    combined.translations = {};

    langArray.forEach((lang, index) => {
      combined.translations[lang] = {
        title:
          results[index].title ||
          results[index].name ||
          results[index].original_name,
      };
    });

    return res.status(200).json(combined);
  } catch (error) {
    console.error("Details API error:", error);
    return res.status(500).json({ error: error.message });
  }
}

async function fetchDetails(id, mediaType, language, token) {
  const url = `https://api.themoviedb.org/3/${mediaType}/${id}?language=${language}`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`TMDB API error: ${response.status}`);
  }

  return await response.json();
}
