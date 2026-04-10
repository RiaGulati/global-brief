import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { Story } from "@shared/schema";
import NavBar from "@/components/NavBar";
import StoryCard from "@/components/StoryCard";
import StoryDetailPanel from "@/components/StoryDetailPanel";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Globe2, Layers, ArrowRight, RefreshCw, Info } from "lucide-react";
import { useLocation } from "wouter";

const REGIONS = ["all", "North America", "Latin America", "Europe", "Middle East", "Africa", "Asia", "Oceania"];
const TOPICS = ["all", "politics", "conflict", "economy", "climate", "science", "health", "technology", "culture"];
const VIEWS = [
  { key: "all", label: "All Stories" },
  { key: "common-ground", label: "Common Ground" },
  { key: "developing", label: "Still Developing" },
];

const CHANGES_STRIP = [
  "Israel death toll in Lebanon surpassed 300 — up from initial estimates",
  "VP Vance confirmed for Iran-U.S. Islamabad talks this weekend",
  "Artemis II crew splashed down safely in Pacific — mission complete",
  "Russia-Ukraine 32-hour Easter ceasefire announced",
  "EU publicly rejected Trump's Hormuz toll proposal",
  "Hungary election poll: Tisza holds wide lead over Fidesz ahead of Sunday vote",
];

export default function Home() {
  const [activeRegion, setActiveRegion] = useState("all");
  const [activeTopic, setActiveTopic] = useState("all");
  const [activeView, setActiveView] = useState("all");
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [, navigate] = useLocation();

  const { data: stories, isLoading } = useQuery<Story[]>({
    queryKey: ["/api/stories", activeRegion, activeTopic, activeView],
    queryFn: () => {
      const params = new URLSearchParams();
      if (activeRegion !== "all") params.set("region", activeRegion);
      if (activeTopic !== "all") params.set("topic", activeTopic);
      if (activeView !== "all") params.set("view", activeView);
      return apiRequest("GET", `/api/stories?${params.toString()}`).then(r => r.json());
    },
  });

  const handleStoryClick = (story: Story) => {
    setSelectedStory(story);
  };

  return (
    <div className="min-h-screen bg-background">
      <NavBar />

      {/* Hero / What Changed Strip */}
      <div className="border-b border-border bg-primary/5 dark:bg-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-primary whitespace-nowrap shrink-0">
              <RefreshCw className="w-3.5 h-3.5" />
              What changed:
            </div>
            {CHANGES_STRIP.map((item, i) => (
              <span key={i} className="text-xs text-muted-foreground whitespace-nowrap px-2 border-l border-border first:border-0">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Page header */}
        <div className="mb-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-1" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                Today's Global Brief
              </h1>
              <p className="text-sm text-muted-foreground">
                April 10, 2026 · Cross-referenced from {" "}
                <span className="text-foreground font-medium">multiple international sources</span> ·{" "}
                <span className="italic">Facts separated from framing</span>
              </p>
            </div>
            <a href="#bias-note" onClick={(e) => { e.preventDefault(); document.getElementById('bias-note')?.scrollIntoView({ behavior: 'smooth' }); }}>
              <Button variant="outline" size="sm" className="hidden sm:flex items-center gap-1.5 text-xs shrink-0">
                <Info className="w-3.5 h-3.5" />
                How we determine consensus
              </Button>
            </a>
          </div>
        </div>

        {/* View switcher */}
        <div className="flex gap-2 mb-4">
          {VIEWS.map(v => (
            <button
              key={v.key}
              onClick={() => setActiveView(v.key)}
              data-testid={`button-view-${v.key}`}
              className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-colors ${
                activeView === v.key
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background border-border text-muted-foreground hover:bg-muted"
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="space-y-3 mb-6">
          {/* Region filters */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-muted-foreground font-medium mr-1 shrink-0">Region</span>
            {REGIONS.map(r => (
              <button
                key={r}
                onClick={() => setActiveRegion(r)}
                data-testid={`button-region-${r}`}
                className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
                  activeRegion === r
                    ? "bg-foreground text-background border-foreground"
                    : "bg-background border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                {r === "all" ? "All Regions" : r}
              </button>
            ))}
          </div>
          {/* Topic filters */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-muted-foreground font-medium mr-1 shrink-0">Topic</span>
            {TOPICS.map(t => (
              <button
                key={t}
                onClick={() => setActiveTopic(t)}
                data-testid={`button-topic-${t}`}
                className={`text-xs px-2.5 py-1 rounded-full border transition-colors capitalize ${
                  activeTopic === t
                    ? "bg-foreground text-background border-foreground"
                    : "bg-background border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                {t === "all" ? "All Topics" : t}
              </button>
            ))}
          </div>
        </div>

        {/* Two-column layout: story grid + detail panel */}
        <div className="flex gap-6">
          {/* Story grid */}
          <div className={`flex-1 min-w-0 ${selectedStory ? "lg:max-w-lg xl:max-w-xl" : "w-full"}`}>
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="rounded-lg border border-border p-5 space-y-3">
                    <Skeleton className="h-4 w-24 rounded-full" />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-4/5" />
                    <Skeleton className="h-16 w-full" />
                    <div className="flex justify-between">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </div>
                ))}
              </div>
            ) : stories && stories.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {stories.map(story => (
                  <StoryCard
                    key={story.id}
                    story={story}
                    onClick={handleStoryClick}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 text-muted-foreground">
                <Globe2 className="w-10 h-10 mx-auto mb-3 opacity-40" />
                <p className="text-sm">No stories match this filter.</p>
              </div>
            )}
          </div>

          {/* Detail panel */}
          {selectedStory && (
            <div className="hidden lg:block lg:w-[440px] xl:w-[480px] shrink-0">
              <div className="sticky top-20">
                <StoryDetailPanel story={selectedStory} onClose={() => setSelectedStory(null)} />
              </div>
            </div>
          )}
        </div>

        {/* Mobile: full-screen modal for story detail */}
        {selectedStory && (
          <div className="fixed inset-0 z-50 bg-background overflow-y-auto lg:hidden">
            <div className="max-w-2xl mx-auto px-4 py-4">
              <StoryDetailPanel story={selectedStory} onClose={() => setSelectedStory(null)} />
            </div>
          </div>
        )}

        {/* Bias note */}
        <div id="bias-note" className="mt-12 rounded-xl border border-border bg-muted/30 p-5 sm:p-6 space-y-3">
          <h2 className="text-base font-semibold" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            How Global Brief determines consensus, uncertainty, and framing
          </h2>
          <div className="grid sm:grid-cols-3 gap-4 text-sm text-muted-foreground">
            <div>
              <div className="font-medium text-foreground mb-1">Consensus</div>
              <p>A fact is marked as verified when it appears in the same form across three or more independent sources from different countries or editorial traditions. We look for direct corroboration — not just repetition of the same wire service.</p>
            </div>
            <div>
              <div className="font-medium text-foreground mb-1">Uncertainty</div>
              <p>Details are labeled uncertain when sources contradict each other, when a claim comes from a single partisan source, or when key context (who, how many, why) is missing or disputed. We aim to name the gap, not fill it with guesswork.</p>
            </div>
            <div>
              <div className="font-medium text-foreground mb-1">Framing differences</div>
              <p>The same event can be reported accurately from different angles. We show how each outlet's word choices, emphasis, and omissions shape the story — so you can read the facts and notice the frame separately.</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground border-t border-border pt-3 mt-2">
            Global Brief does not claim to be perfectly unbiased. Our summaries are written by AI and may inherit the biases present in the sources we aggregate. We disclose sources, flag uncertainty, and show framing differences so you can decide for yourself.
          </p>
        </div>

        {/* Digest CTA */}
        <div className="mt-6 flex justify-center">
          <a href="/digest" onClick={(e) => { e.preventDefault(); navigate("/digest"); }}>
            <Button variant="outline" className="flex items-center gap-2 text-sm" data-testid="button-digest-cta">
              Read the 2-minute digest
              <ArrowRight className="w-4 h-4" />
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
