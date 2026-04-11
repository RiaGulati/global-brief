import type { Story, InsertStory } from "@shared/schema";

export interface IStorage {
  getAllStories(): Story[];
  getStoryById(id: number): Story | undefined;
  getStoriesByRegion(region: string): Story[];
  getStoriesByTopic(topic: string): Story[];
  getCommonGroundStories(): Story[];
  getStillDevelopingStories(): Story[];
  seedStories(data: InsertStory[]): void;
  replaceAllStories(data: InsertStory[]): void;
  getStoryCount(): number;
}

export class MemoryStorage implements IStorage {
  private stories: Story[] = [];
  private nextId = 1;

  getAllStories(): Story[] {
    return this.stories;
  }

  getStoryById(id: number): Story | undefined {
    return this.stories.find((s) => s.id === id);
  }

  getStoriesByRegion(region: string): Story[] {
    return this.stories.filter((s) => s.region === region);
  }

  getStoriesByTopic(topic: string): Story[] {
    return this.stories.filter((s) => s.topic === topic);
  }

  getCommonGroundStories(): Story[] {
    return this.stories.filter((s) => s.isCommonGround);
  }

  getStillDevelopingStories(): Story[] {
    return this.stories.filter((s) => s.isStillDeveloping);
  }

  seedStories(data: InsertStory[]): void {
    for (const story of data) {
      this.stories.push({
        id: this.nextId++,
        isCommonGround: story.isCommonGround ?? false,
        isStillDeveloping: story.isStillDeveloping ?? false,
        changedInLast24h: story.changedInLast24h ?? null,
        ...story,
      } as Story);
    }
  }

  /** Wipe existing stories and replace with fresh enriched data */
  replaceAllStories(data: InsertStory[]): void {
    this.stories = [];
    this.nextId = 1;
    this.seedStories(data);
  }

  getStoryCount(): number {
    return this.stories.length;
  }
}

export const storage = new MemoryStorage();
