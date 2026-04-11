/**
 * enricher.ts
 * Takes a raw NewsAPI article and uses Perplexity to generate
 * the full structured story: summary, why it matters, confidence level,
 * core facts, source framing differences, etc.
 */

import type { RawArticle } from "./newsFetcher";
import type { InsertStory } from "@shared/schema";

const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY!;
const PERPLEXITY_BASE = "https://api.perplexity.ai";

interface PerplexityResponse {
  choices: { message: { content: string } }[];
}

async function callPerplexity(prompt: string): Promise<string> {
  const res = await fetch(`${PERPLEXITY_BASE}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${PERPLEXITY_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "sonar",
      messages: [
        {
          role: "system",
          content:
            "You are an expert global news analyst. You provide concise, factual, bias-aware analysis of news stories. Always respond with valid JSON only — no markdown, no explanation, just the raw JSON object.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.2,
      max_tokens: 1200,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Perplexity API error ${res.status}: ${err}`);
  }

  const data = (await res.json()) as PerplexityResponse;
  return data.choices[0]?.message?.content || "";
}

function safeParseJson<T>(raw: string, fallback: T): T {
  try {
    // Strip markdown code fences if present
    const cleaned = raw.replace(/^```json?\n?/i, "").replace(/\n?```$/i, "").trim();
    return JSON.parse(cleaned) as T;
  } catch {
    return fallback;
  }
}

export async function enrichArticle(article: RawArticle): Promise<InsertStory | null> {
  const prompt = `
You are analyzing this news story for Global Brief, an international news app that emphasizes bias awareness and factual confidence.

Article title: "${article.title}"
Source: ${article.source}
Published: ${article.publishedAt}
Description: ${article.description || "N/A"}
Content snippet: ${(article.content || "").slice(0, 500)}
URL: ${article.url}

Search the web for the latest information on this story. Then respond with ONLY a JSON object in this exact format:

{
  "headline": "Concise, neutral headline (max 15 words)",
  "summary": "3-4 sentence factual summary of what happened, who is involved, and current status",
  "whyItMatters": "2-3 sentences explaining the global significance and potential consequences",
  "confidenceLevel": "high" | "moderate" | "low",
  "sourceCount": <number of sources you found covering this, 2-10>,
  "coreFacts": ["fact 1", "fact 2", "fact 3", "fact 4"],
  "verifiedPoints": ["verified point 1", "verified point 2", "verified point 3"],
  "disputedDetails": ["disputed claim 1", "disputed claim 2"],
  "sources": [
    {"name": "Source Name", "url": "https://...", "framing": "One sentence on how this outlet frames the story"},
    {"name": "Source Name 2", "url": "https://...", "framing": "Their framing"}
  ],
  "framingDifferences": [
    {"outlet": "Outlet Name", "framing": "How they frame it"},
    {"outlet": "Outlet Name 2", "framing": "Their framing"}
  ],
  "isCommonGround": <true if story has broad cross-partisan agreement, else false>,
  "isStillDeveloping": <true if the situation is actively evolving, else false>,
  "changedInLast24h": "One sentence on what changed most recently, or null if stable"
}

Confidence level guide:
- "high": multiple major outlets confirm all key facts
- "moderate": core facts confirmed but some details vary across sources  
- "low": significant conflicting reports or unverified claims

Respond with ONLY the JSON object. No markdown, no explanation.
`;

  try {
    console.log(`[enricher] Enriching: "${article.title.slice(0, 60)}..."`);
    const raw = await callPerplexity(prompt);

    const parsed = safeParseJson<Record<string, unknown>>(raw, {});

    if (!parsed.headline || !parsed.summary) {
      console.warn("[enricher] Incomplete response, skipping article");
      return null;
    }

    return {
      headline: String(parsed.headline || article.title),
      summary: String(parsed.summary || article.description || ""),
      whyItMatters: String(parsed.whyItMatters || ""),
      region: article.region,
      topic: article.topic,
      confidenceLevel: (["high", "moderate", "low"].includes(String(parsed.confidenceLevel))
        ? parsed.confidenceLevel
        : "moderate") as string,
      sourceCount: Number(parsed.sourceCount) || 3,
      sources: JSON.stringify(Array.isArray(parsed.sources) ? parsed.sources : [
        { name: article.source, url: article.url, framing: "Primary source" }
      ]),
      coreFacts: JSON.stringify(Array.isArray(parsed.coreFacts) ? parsed.coreFacts : []),
      verifiedPoints: JSON.stringify(Array.isArray(parsed.verifiedPoints) ? parsed.verifiedPoints : []),
      disputedDetails: JSON.stringify(Array.isArray(parsed.disputedDetails) ? parsed.disputedDetails : []),
      framingDifferences: JSON.stringify(Array.isArray(parsed.framingDifferences) ? parsed.framingDifferences : []),
      isCommonGround: Boolean(parsed.isCommonGround),
      isStillDeveloping: Boolean(parsed.isStillDeveloping),
      publishedAt: article.publishedAt,
      changedInLast24h: parsed.changedInLast24h ? String(parsed.changedInLast24h) : null,
    };
  } catch (err) {
    console.error(`[enricher] Failed to enrich "${article.title}":`, err);
    return null;
  }
}

/**
 * Enrich a batch of raw articles sequentially (to avoid rate limits).
 */
export async function enrichArticles(articles: RawArticle[]): Promise<InsertStory[]> {
  const results: InsertStory[] = [];
  for (const article of articles) {
    const enriched = await enrichArticle(article);
    if (enriched) results.push(enriched);
    // Small delay between Perplexity calls to be kind to rate limits
    await new Promise((r) => setTimeout(r, 500));
  }
  console.log(`[enricher] Successfully enriched ${results.length}/${articles.length} articles`);
  return results;
}
