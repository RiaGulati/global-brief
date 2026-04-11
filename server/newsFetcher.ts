/**
 * newsFetcher.ts
 * Pulls top headlines from NewsAPI across key global regions,
 * deduplicates, and returns raw articles for enrichment.
 */

const NEWS_API_KEY = process.env.NEWS_API_KEY!;
const NEWS_API_BASE = "https://newsapi.org/v2";

export interface RawArticle {
  title: string;
  description: string | null;
  content: string | null;
  url: string;
  source: string;
  publishedAt: string;
  region: string;
  topic: string;
}

// Query groups: each entry maps to a region + topic + search query
const QUERIES: { q: string; region: string; topic: string }[] = [
  { q: "war OR conflict OR military OR strikes", region: "Middle East", topic: "conflict" },
  { q: "Israel OR Lebanon OR Gaza OR Iran OR Syria", region: "Middle East", topic: "politics" },
  { q: "Russia OR Ukraine OR NATO OR Europe war", region: "Europe", topic: "conflict" },
  { q: "NATO OR European Union OR elections Europe", region: "Europe", topic: "politics" },
  { q: "China OR Taiwan OR South China Sea", region: "Asia", topic: "politics" },
  { q: "India OR Pakistan OR Southeast Asia", region: "Asia", topic: "politics" },
  { q: "Africa OR Sudan OR Congo OR Nigeria crisis", region: "Africa", topic: "conflict" },
  { q: "IMF OR World Bank OR global economy recession", region: "Global", topic: "economy" },
  { q: "climate OR environment OR disaster flood", region: "Global", topic: "environment" },
  { q: "NASA OR space OR science breakthrough", region: "North America", topic: "science" },
  { q: "United States OR White House OR Congress", region: "North America", topic: "politics" },
  { q: "Latin America OR Brazil OR Mexico politics", region: "Latin America", topic: "politics" },
];

async function fetchTopArticlesForQuery(
  q: string,
  region: string,
  topic: string
): Promise<RawArticle[]> {
  const params = new URLSearchParams({
    q,
    language: "en",
    sortBy: "publishedAt",
    pageSize: "3",
    apiKey: NEWS_API_KEY,
  });

  const res = await fetch(`${NEWS_API_BASE}/everything?${params}`);
  if (!res.ok) {
    console.error(`NewsAPI error for "${q}": ${res.status} ${res.statusText}`);
    return [];
  }

  const data = (await res.json()) as {
    articles: {
      title: string;
      description: string | null;
      content: string | null;
      url: string;
      source: { name: string };
      publishedAt: string;
    }[];
  };

  return (data.articles || [])
    .filter((a) => a.title && a.title !== "[Removed]")
    .map((a) => ({
      title: a.title,
      description: a.description,
      content: a.content,
      url: a.url,
      source: a.source?.name || "Unknown",
      publishedAt: a.publishedAt,
      region,
      topic,
    }));
}

/**
 * Fetch top global news articles across all regions.
 * Returns up to ~2 articles per query group (deduped by URL).
 */
export async function fetchGlobalNews(): Promise<RawArticle[]> {
  console.log("[newsFetcher] Fetching global news from NewsAPI...");

  const results = await Promise.allSettled(
    QUERIES.map((q) => fetchTopArticlesForQuery(q.q, q.region, q.topic))
  );

  const all: RawArticle[] = [];
  const seenUrls = new Set<string>();
  const seenTitles = new Set<string>();

  for (const result of results) {
    if (result.status !== "fulfilled") continue;
    for (const article of result.value) {
      if (seenUrls.has(article.url)) continue;
      // Dedupe by title similarity (first 60 chars)
      const titleKey = article.title.slice(0, 60).toLowerCase();
      if (seenTitles.has(titleKey)) continue;
      seenUrls.add(article.url);
      seenTitles.add(titleKey);
      all.push(article);
    }
  }

  // Pick the most recent 2 per region, max 10 total stories
  const byRegion: Record<string, RawArticle[]> = {};
  for (const a of all) {
    if (!byRegion[a.region]) byRegion[a.region] = [];
    if (byRegion[a.region].length < 2) byRegion[a.region].push(a);
  }

  const selected = Object.values(byRegion).flat();
  // Sort by date descending, cap at 10
  selected.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  console.log(`[newsFetcher] Got ${selected.length} articles after dedup`);
  return selected.slice(0, 10);
}
