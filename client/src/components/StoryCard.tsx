import type { Story } from "@shared/schema";
import { Badge } from "@/components/ui/badge";
import { Users, CheckCircle2, AlertCircle, TrendingUp } from "lucide-react";

const REGION_COLORS: Record<string, string> = {
  "Middle East": "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  "Europe": "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  "North America": "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
  "Africa": "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
  "Asia": "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  "Latin America": "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300",
  "Oceania": "bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300",
};

const TOPIC_COLORS: Record<string, string> = {
  conflict: "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300",
  politics: "bg-slate-100 text-slate-700 dark:bg-slate-700/40 dark:text-slate-300",
  economy: "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300",
  science: "bg-cyan-50 text-cyan-700 dark:bg-cyan-900/20 dark:text-cyan-300",
  climate: "bg-lime-50 text-lime-700 dark:bg-lime-900/20 dark:text-lime-300",
  health: "bg-pink-50 text-pink-700 dark:bg-pink-900/20 dark:text-pink-300",
  technology: "bg-violet-50 text-violet-700 dark:bg-violet-900/20 dark:text-violet-300",
  culture: "bg-fuchsia-50 text-fuchsia-700 dark:bg-fuchsia-900/20 dark:text-fuchsia-300",
};

const CONFIDENCE_CONFIG = {
  high: { label: "High confidence", color: "text-emerald-600 dark:text-emerald-400", width: "95%" },
  moderate: { label: "Moderate confidence", color: "text-amber-600 dark:text-amber-400", width: "60%" },
  low: { label: "Low confidence", color: "text-red-500 dark:text-red-400", width: "25%" },
};

interface Props {
  story: Story;
  onClick: (story: Story) => void;
}

export default function StoryCard({ story, onClick }: Props) {
  const conf = CONFIDENCE_CONFIG[story.confidenceLevel as keyof typeof CONFIDENCE_CONFIG] || CONFIDENCE_CONFIG.moderate;
  const regionColor = REGION_COLORS[story.region] || "bg-gray-100 text-gray-700";
  const topicColor = TOPIC_COLORS[story.topic] || "bg-gray-100 text-gray-700";
  const sources = JSON.parse(story.sources) as Array<{name: string}>;

  return (
    <div
      className="story-card rounded-lg bg-card border border-border p-4 sm:p-5 flex flex-col gap-3"
      onClick={() => onClick(story)}
      data-testid={`card-story-${story.id}`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick(story)}
    >
      {/* Tags row */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className={`tag-pill ${regionColor}`}>{story.region}</span>
        <span className={`tag-pill ${topicColor}`}>{story.topic}</span>
        {story.isCommonGround && (
          <span className="tag-pill bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400">
            <CheckCircle2 className="w-2.5 h-2.5 mr-1" />
            Common Ground
          </span>
        )}
        {story.isStillDeveloping && (
          <span className="tag-pill bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400">
            <TrendingUp className="w-2.5 h-2.5 mr-1" />
            Developing
          </span>
        )}
      </div>

      {/* Headline */}
      <h3 className="text-base font-semibold leading-snug text-foreground" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
        {story.headline}
      </h3>

      {/* Summary */}
      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
        {story.summary}
      </p>

      {/* Why it matters */}
      <div className="text-xs text-muted-foreground border-l-2 border-primary/30 pl-3 italic leading-relaxed">
        {story.whyItMatters.slice(0, 100)}…
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-1 mt-auto">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Users className="w-3.5 h-3.5" />
          <span>{story.sourceCount} sources</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex flex-col items-end gap-1">
            <span className={`text-xs font-medium ${conf.color}`}>{conf.label}</span>
            <div className="confidence-bar w-20">
              <div
                className="confidence-bar-fill"
                style={{
                  width: conf.width,
                  background: story.confidenceLevel === "high"
                    ? "hsl(160 60% 40%)"
                    : story.confidenceLevel === "moderate"
                    ? "hsl(38 90% 50%)"
                    : "hsl(0 65% 55%)"
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
