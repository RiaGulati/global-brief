/**
 * refreshNews.ts
 * Orchestrates the full news refresh pipeline:
 * 1. Fetch raw articles from NewsAPI
 * 2. Enrich each with Perplexity
 * 3. Replace stories in memory storage
 *
 * Called on startup and every 24 hours.
 */

import { fetchGlobalNews } from "./newsFetcher";
import { enrichArticles } from "./enricher";
import { storage } from "./storage";
import { seedData } from "./seed";

let lastRefreshedAt: Date | null = null;
let isRefreshing = false;

export function getLastRefreshedAt() {
  return lastRefreshedAt;
}

export async function refreshNews(force = false): Promise<{ success: boolean; count: number; error?: string }> {
  if (isRefreshing) {
    return { success: false, count: 0, error: "Refresh already in progress" };
  }

  const hasApiKeys =
    process.env.NEWS_API_KEY && process.env.PERPLEXITY_API_KEY;

  if (!hasApiKeys) {
    console.warn("[refreshNews] Missing API keys — using seeded stories");
    return { success: false, count: 0, error: "Missing API keys" };
  }

  isRefreshing = true;
  console.log("[refreshNews] Starting news refresh...");

  try {
    const rawArticles = await fetchGlobalNews();

    if (rawArticles.length === 0) {
      console.warn("[refreshNews] No articles from NewsAPI");
      isRefreshing = false;
      return { success: false, count: 0, error: "No articles fetched" };
    }

    const enriched = await enrichArticles(rawArticles);

    if (enriched.length === 0) {
      console.warn("[refreshNews] Enrichment returned 0 stories");
      isRefreshing = false;
      return { success: false, count: 0, error: "Enrichment failed" };
    }

    // Replace all stories in memory
    storage.replaceAllStories(enriched);
    lastRefreshedAt = new Date();

    console.log(`[refreshNews] Done — ${enriched.length} live stories loaded at ${lastRefreshedAt.toISOString()}`);
    isRefreshing = false;
    return { success: true, count: enriched.length };
  } catch (err) {
    console.error("[refreshNews] Error:", err);
    isRefreshing = false;
    return { success: false, count: 0, error: String(err) };
  }
}

/**
 * Start auto-refresh on server boot.
 * - First refresh runs immediately (non-blocking)
 * - Then repeats every 24 hours
 */
export function startAutoRefresh() {
  // Seed with hardcoded stories immediately so the app works right away
  if (storage.getStoryCount() === 0) {
    storage.seedStories(seedData);
    console.log("[refreshNews] Seeded with fallback stories");
  }

  if (!process.env.NEWS_API_KEY || !process.env.PERPLEXITY_API_KEY) {
    console.warn("[refreshNews] No API keys set — running on seeded stories only");
    return;
  }

  // Run first refresh after 2s (let server finish starting up)
  setTimeout(async () => {
    const result = await refreshNews();
    if (!result.success) {
      console.warn("[refreshNews] Initial refresh failed, keeping seeded stories");
    }
  }, 2000);

  // Repeat every 24 hours
  const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;
  setInterval(async () => {
    await refreshNews();
  }, TWENTY_FOUR_HOURS);
}
