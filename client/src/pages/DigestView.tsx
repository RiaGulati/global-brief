import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { Story } from "@shared/schema";
import NavBar from "@/components/NavBar";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, CheckCircle2, Globe2, Film } from "lucide-react";
import { useLocation } from "wouter";

// Video data embedded in the digest
const VIDEO_EXPLAINERS = [
  {
    id: 1,
    title: "Israel Strikes Lebanon: What Happened and Why It Matters",
    duration: "8 sec explainer",
    region: "Middle East",
    script: `Israel launched one of its largest single-day bombing campaigns against Lebanon on Wednesday, killing more than 300 people. The strikes have put a fragile U.S.-Iran ceasefire at risk. Israel and the U.S. say Lebanon is not covered by the ceasefire deal. Many other countries disagree. Peace talks between the U.S. and Lebanon are expected next week. The situation remains unstable.`,
    scenes: [
      "Opening: aerial view of the Mediterranean at dusk — calm, establishing",
      "Cut: map of Lebanon and Israel borders with soft overlay — informational",
      "Cut: silhouette of a city at night, documentary style — understated",
      "Cut: empty diplomatic meeting room, sunlight streaming in — talks pending",
      "Close: sunrise over the sea — open, unresolved"
    ],
    thumbnail: "Israel — Lebanon — Peace Talks — Ceasefire at Risk",
    topics: ["conflict", "diplomacy"],
  },
  {
    id: 2,
    title: "Artemis II Comes Home: Humans Return from the Moon's Vicinity",
    duration: "8 sec explainer",
    region: "North America",
    script: `NASA's Artemis II crew splashed down safely in the Pacific Ocean today. Four astronauts — Reid Wiseman, Victor Glover, Christina Koch, and Jeremy Hansen — traveled farther from Earth than any humans since Apollo. They circled the far side of the moon and returned in the Orion capsule. It's the first crewed deep-space mission in over 50 years. The mission sets the stage for future moon landings.`,
    scenes: [
      "Opening: Orion capsule floating in deep black space, Earth visible behind",
      "Cut: parachutes deploying in sequence against a pale sky",
      "Cut: Pacific Ocean from above, recovery ship approaching",
      "Cut: astronaut helmet reflection showing Earth — human scale",
      "Close: capsule bobbing in calm water, Navy team arrives in orange boats"
    ],
    thumbnail: "Artemis II · Splashdown · First Crewed Deep Space Mission in 50 Years",
    topics: ["science", "history"],
  },
  {
    id: 3,
    title: "The Strait of Hormuz: Why One Waterway Shapes Global Oil Prices",
    duration: "8 sec explainer",
    region: "Middle East",
    script: `The Strait of Hormuz is a narrow waterway between Iran and Oman. About 20 percent of the world's traded oil passes through it. Since the U.S.-Iran war began in February, Iran has disrupted shipping there. Oil prices rose sharply. A temporary ceasefire has reopened the passage, but tensions remain. Peace talks this weekend in Pakistan could determine what happens next.`,
    scenes: [
      "Opening: aerial view of tankers moving through a narrow strait at sunrise",
      "Cut: world map with glowing trade route lines converging on the Persian Gulf",
      "Cut: oil price board with numbers shifting, financial district in background",
      "Cut: two empty chairs across a long table, flags out of frame — talks pending",
      "Close: wide shot of sea, a single ship moving toward the horizon"
    ],
    thumbnail: "Strait of Hormuz · Oil · U.S.-Iran Ceasefire · Global Markets",
    topics: ["economy", "geopolitics"],
  },
];

export default function DigestView() {
  const [, navigate] = useLocation();

  const { data: stories, isLoading } = useQuery<Story[]>({
    queryKey: ["/api/stories"],
    queryFn: () => apiRequest("GET", "/api/stories").then(r => r.json()),
  });

  return (
    <div className="min-h-screen bg-background">
      <NavBar />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
            data-testid="button-back"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Global Brief
          </button>

          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">2-minute digest</span>
          </div>
          <h1 className="text-2xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            The World Today, April 10, 2026
          </h1>
          <p className="text-sm text-muted-foreground">
            Five stories. Plain language. Key facts only. Read in under two minutes.
          </p>
        </div>

        {/* Story digest */}
        <div className="space-y-5 mb-10">
          {isLoading ? (
            [...Array(5)].map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-12 w-full" />
              </div>
            ))
          ) : stories ? (
            stories.slice(0, 6).map((story, i) => (
              <div
                key={story.id}
                className="flex gap-4 pb-5 border-b border-border last:border-0"
                data-testid={`digest-item-${story.id}`}
              >
                <div className="text-xl font-bold text-muted-foreground/30 font-mono leading-none mt-1 w-6 shrink-0" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                  {i + 1}
                </div>
                <div className="flex-1 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">{story.region}</span>
                    <span className="text-muted-foreground">·</span>
                    <span className="text-xs text-muted-foreground capitalize">{story.topic}</span>
                    {story.isCommonGround && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 ml-auto" />
                    )}
                  </div>
                  <h2 className="text-sm font-semibold leading-snug" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                    {story.headline}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {story.summary.slice(0, 180)}…
                  </p>
                  {story.confidenceLevel === "high" && (
                    <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="w-3 h-3" />
                      Confirmed across multiple sources
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : null}
        </div>

        {/* Video explainers section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Film className="w-4 h-4 text-primary" />
            <h2 className="text-base font-semibold" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Video Explainers — Today's Biggest Stories
            </h2>
          </div>
          <p className="text-xs text-muted-foreground mb-4">
            Three short explainers, each designed as a trustworthy daily briefing — not breaking-news drama.
          </p>

          {VIDEO_EXPLAINERS.map((video) => (
            <div
              key={video.id}
              className="rounded-xl border border-border bg-card overflow-hidden"
              data-testid={`video-card-${video.id}`}
            >
              {/* Video thumbnail area */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 relative aspect-video flex items-center justify-center">
                <div className="text-center px-6 py-4">
                  <div className="w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center mx-auto mb-3">
                    <Film className="w-5 h-5 text-white/70" />
                  </div>
                  <p className="text-white/80 text-sm font-medium text-center leading-snug" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                    {video.thumbnail}
                  </p>
                  <p className="text-white/50 text-xs mt-2">{video.duration}</p>
                </div>
              </div>

              <div className="p-4 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-sm font-semibold leading-snug" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                    {video.title}
                  </h3>
                  <span className="text-xs text-muted-foreground shrink-0">{video.region}</span>
                </div>

                {/* Script */}
                <div className="space-y-1.5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Script</p>
                  <p className="text-xs text-muted-foreground leading-relaxed italic">
                    "{video.script}"
                  </p>
                </div>

                {/* Scene directions */}
                <div className="space-y-1.5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Scene directions</p>
                  <ul className="space-y-1">
                    {video.scenes.map((scene, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                        <span className="font-mono text-muted-foreground/50 shrink-0 mt-0.5">{i + 1}.</span>
                        <span className="leading-relaxed">{scene}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-2 flex-wrap pt-1">
                  {video.topics.map(t => (
                    <span key={t} className="tag-pill bg-muted text-muted-foreground capitalize">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-10 text-center space-y-2">
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <Globe2 className="w-3.5 h-3.5" />
            <span>Global Brief · April 10, 2026 · Source-transparent world news</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Facts separated from framing. Uncertainty labeled. Sources disclosed.
          </p>
        </div>
      </div>
    </div>
  );
}
