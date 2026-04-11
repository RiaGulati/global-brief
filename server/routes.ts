import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { seedData } from "./seed";
import { startAutoRefresh, refreshNews, getLastRefreshedAt } from "./refreshNews";

export async function registerRoutes(httpServer: Server, app: Express): Promise<Server> {
  // Seed fallback stories and start auto-refresh pipeline
  if (storage.getStoryCount() === 0) {
    storage.seedStories(seedData);
  }
  startAutoRefresh();

  // GET /api/stories — with optional region, topic, view filters
  app.get("/api/stories", (req, res) => {
    const { region, topic, view } = req.query;
    let stories = storage.getAllStories();

    if (region && region !== "all") {
      stories = stories.filter((s) => s.region === region);
    }
    if (topic && topic !== "all") {
      stories = stories.filter((s) => s.topic === topic);
    }
    if (view === "common-ground") {
      stories = stories.filter((s) => s.isCommonGround);
    }
    if (view === "developing") {
      stories = stories.filter((s) => s.isStillDeveloping);
    }

    res.json(stories);
  });

  // GET /api/stories/:id
  app.get("/api/stories/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const story = storage.getStoryById(id);
    if (!story) {
      return res.status(404).json({ message: "Story not found" });
    }
    res.json(story);
  });

  // GET /api/digest — top 5 stories for the 2-min digest
  app.get("/api/digest", (req, res) => {
    const all = storage.getAllStories();
    const digest = all.slice(0, 5).map((s) => ({
      id: s.id,
      headline: s.headline,
      summary: s.summary.slice(0, 120) + "...",
      region: s.region,
      topic: s.topic,
      confidenceLevel: s.confidenceLevel,
    }));
    res.json(digest);
  });

  // GET /api/status — show last refresh time and story count
  app.get("/api/status", (_req, res) => {
    res.json({
      storyCount: storage.getStoryCount(),
      lastRefreshedAt: getLastRefreshedAt()?.toISOString() ?? null,
      usingLiveNews: !!(process.env.NEWS_API_KEY && process.env.PERPLEXITY_API_KEY),
    });
  });

  // POST /api/refresh — manually trigger a news refresh
  app.post("/api/refresh", async (_req, res) => {
    const result = await refreshNews(true);
    res.json(result);
  });

  return httpServer;
}
