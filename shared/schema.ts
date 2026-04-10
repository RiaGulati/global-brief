import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const stories = sqliteTable("stories", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  headline: text("headline").notNull(),
  summary: text("summary").notNull(),
  whyItMatters: text("why_it_matters").notNull(),
  region: text("region").notNull(), // e.g. "Middle East"
  topic: text("topic").notNull(), // e.g. "conflict"
  confidenceLevel: text("confidence_level").notNull(), // "high" | "moderate" | "low"
  sourceCount: integer("source_count").notNull(),
  sources: text("sources").notNull(), // JSON array of {name, url, framing}
  coreFacts: text("core_facts").notNull(), // JSON array of strings
  verifiedPoints: text("verified_points").notNull(), // JSON array of strings
  disputedDetails: text("disputed_details").notNull(), // JSON array of strings
  framingDifferences: text("framing_differences").notNull(), // JSON array of {outlet, framing}
  isCommonGround: integer("is_common_ground", { mode: "boolean" }).default(false),
  isStillDeveloping: integer("is_still_developing", { mode: "boolean" }).default(false),
  publishedAt: text("published_at").notNull(),
  changedInLast24h: text("changed_in_last_24h"),
});

export const insertStorySchema = createInsertSchema(stories).omit({ id: true });
export type InsertStory = z.infer<typeof insertStorySchema>;
export type Story = typeof stories.$inferSelect;
