import { db } from "./db";
import { stories, type Story, type InsertStory } from "@shared/schema";
import { eq, like, or } from "drizzle-orm";

export interface IStorage {
  getAllStories(): Story[];
  getStoryById(id: number): Story | undefined;
  getStoriesByRegion(region: string): Story[];
  getStoriesByTopic(topic: string): Story[];
  getCommonGroundStories(): Story[];
  getStillDevelopingStories(): Story[];
  seedStories(data: InsertStory[]): void;
  getStoryCount(): number;
}

export class DatabaseStorage implements IStorage {
  getAllStories(): Story[] {
    return db.select().from(stories).all();
  }

  getStoryById(id: number): Story | undefined {
    return db.select().from(stories).where(eq(stories.id, id)).get();
  }

  getStoriesByRegion(region: string): Story[] {
    return db.select().from(stories).where(eq(stories.region, region)).all();
  }

  getStoriesByTopic(topic: string): Story[] {
    return db.select().from(stories).where(eq(stories.topic, topic)).all();
  }

  getCommonGroundStories(): Story[] {
    return db.select().from(stories).where(eq(stories.isCommonGround, true)).all();
  }

  getStillDevelopingStories(): Story[] {
    return db.select().from(stories).where(eq(stories.isStillDeveloping, true)).all();
  }

  seedStories(data: InsertStory[]): void {
    for (const story of data) {
      db.insert(stories).values(story).run();
    }
  }

  getStoryCount(): number {
    const result = db.select().from(stories).all();
    return result.length;
  }
}

export const storage = new DatabaseStorage();
