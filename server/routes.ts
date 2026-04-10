import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { seedData } from "./seed";

export async function registerRoutes(httpServer: Server, app: Express): Promise<Server> {
  // Seed on startup if DB is empty
  if (storage.getStoryCount() === 0) {
    storage.seedStories(seedData);
  }

  app.get("/api/stories", (req, res) => {
    const { region, topic, view } = req.query;
    let stories = storage.getAllStories();

    if (region && region !== "all") {
      stories = stories.filter(s => s.region === region);
    }
    if (topic && topic !== "all") {
      stories = stories.filter(s => s.topic === topic);
    }
    if (view === "common-ground") {
      stories = stories.filter(s => s.isCommonGround);
    }
    if (view === "developing") {
      stories = stories.filter(s => s.isStillDeveloping);
    }

    res.json(stories);
  });

  app.get("/api/stories/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const story = storage.getStoryById(id);
    if (!story) {
      return res.status(404).json({ message: "Story not found" });
    }
    res.json(story);
  });

  app.get("/api/digest", (req, res) => {
    const all = storage.getAllStories();
    const digest = all.slice(0, 5).map(s => ({
      id: s.id,
      headline: s.headline,
      summary: s.summary.slice(0, 120) + "...",
      region: s.region,
      topic: s.topic,
      confidenceLevel: s.confidenceLevel,
    }));
    res.json(digest);
  });

  return httpServer;
}
