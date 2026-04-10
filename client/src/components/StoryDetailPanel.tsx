import type { Story } from "@shared/schema";
import { X, ExternalLink, CheckCircle2, AlertTriangle, Info, Users, GitBranch } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Props {
  story: Story;
  onClose: () => void;
}

const CONFIDENCE_CONFIG = {
  high: { label: "High confidence", barWidth: "95%", barColor: "hsl(160 60% 40%)", dot: "bg-emerald-500" },
  moderate: { label: "Moderate confidence", barWidth: "60%", barColor: "hsl(38 90% 50%)", dot: "bg-amber-500" },
  low: { label: "Low confidence", barWidth: "25%", barColor: "hsl(0 65% 55%)", dot: "bg-red-500" },
};

export default function StoryDetailPanel({ story, onClose }: Props) {
  const sources = JSON.parse(story.sources) as Array<{name: string; url: string; framing: string}>;
  const coreFacts = JSON.parse(story.coreFacts) as string[];
  const verifiedPoints = JSON.parse(story.verifiedPoints) as string[];
  const disputedDetails = JSON.parse(story.disputedDetails) as string[];
  const framingDifferences = JSON.parse(story.framingDifferences) as Array<{outlet: string; framing: string}>;

  const conf = CONFIDENCE_CONFIG[story.confidenceLevel as keyof typeof CONFIDENCE_CONFIG] || CONFIDENCE_CONFIG.moderate;

  return (
    <div className="detail-panel bg-card border border-border rounded-xl overflow-hidden flex flex-col" style={{ maxHeight: "calc(100vh - 100px)" }} data-testid="panel-story-detail">
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-border">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-muted-foreground">{story.region}</span>
              <span className="text-muted-foreground">·</span>
              <span className="text-xs text-muted-foreground capitalize">{story.topic}</span>
            </div>
            <h2 className="text-base font-semibold leading-snug" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              {story.headline}
            </h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0 h-7 w-7"
            onClick={onClose}
            data-testid="button-close-detail"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Confidence indicator */}
        <div className="mt-3 flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className={`inline-block w-2 h-2 rounded-full ${conf.dot}`} />
            <span className="text-xs font-medium">{conf.label}</span>
          </div>
          <div className="flex-1 confidence-bar">
            <div className="confidence-bar-fill" style={{ width: conf.barWidth, background: conf.barColor }} />
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Users className="w-3.5 h-3.5" />
            {story.sourceCount} sources
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="flex-1 flex flex-col min-h-0">
        <TabsList className="mx-4 mt-3 mb-0 grid grid-cols-4 h-8 text-xs">
          <TabsTrigger value="overview" className="text-xs">Overview</TabsTrigger>
          <TabsTrigger value="facts" className="text-xs">Facts</TabsTrigger>
          <TabsTrigger value="framing" className="text-xs">Framing</TabsTrigger>
          <TabsTrigger value="sources" className="text-xs">Sources</TabsTrigger>
        </TabsList>

        <ScrollArea className="flex-1 px-4 pb-4">
          {/* Overview tab */}
          <TabsContent value="overview" className="mt-4 space-y-4">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Summary</h3>
              <p className="text-sm leading-relaxed">{story.summary}</p>
            </div>
            <div className="rounded-lg bg-primary/5 dark:bg-primary/10 border-l-2 border-primary px-4 py-3">
              <h3 className="text-xs font-semibold text-primary mb-1">Why it matters</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{story.whyItMatters}</p>
            </div>
            {story.changedInLast24h && (
              <div className="rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 px-4 py-3">
                <h3 className="text-xs font-semibold text-amber-700 dark:text-amber-400 mb-1 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5" />
                  What changed in the last 24 hours
                </h3>
                <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">{story.changedInLast24h}</p>
              </div>
            )}
            {story.isStillDeveloping && (
              <div className="flex items-start gap-2 text-xs text-muted-foreground bg-muted/50 rounded-lg px-3 py-2.5">
                <AlertTriangle className="w-3.5 h-3.5 mt-0.5 text-amber-500 shrink-0" />
                <span>This story is still developing. Details may change.</span>
              </div>
            )}
          </TabsContent>

          {/* Facts tab */}
          <TabsContent value="facts" className="mt-4 space-y-4">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2.5 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                Core facts reported
              </h3>
              <ul className="space-y-2">
                {coreFacts.map((fact, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-muted-foreground shrink-0" />
                    <span className="leading-relaxed">{fact}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2.5 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                Verified across multiple sources
              </h3>
              <ul className="space-y-2">
                {verifiedPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm">
                    <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 text-emerald-500 shrink-0" />
                    <span className="leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2.5 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                Disputed or uncertain
              </h3>
              <ul className="space-y-2">
                {disputedDetails.map((detail, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm">
                    <AlertTriangle className="w-3.5 h-3.5 mt-0.5 text-amber-500 shrink-0" />
                    <span className="leading-relaxed text-muted-foreground">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </TabsContent>

          {/* Framing tab */}
          <TabsContent value="framing" className="mt-4 space-y-3">
            <p className="text-xs text-muted-foreground leading-relaxed">
              The same events can be reported accurately from different angles. These are how different outlets framed this story.
            </p>
            {framingDifferences.map((diff, i) => (
              <div key={i} className="rounded-lg border border-border p-3 space-y-1.5">
                <div className="flex items-center gap-1.5">
                  <GitBranch className="w-3.5 h-3.5 text-muted-foreground" />
                  <span className="text-xs font-semibold">{diff.outlet}</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{diff.framing}</p>
              </div>
            ))}
          </TabsContent>

          {/* Sources tab */}
          <TabsContent value="sources" className="mt-4 space-y-3">
            <p className="text-xs text-muted-foreground leading-relaxed">
              Links open to original reporting. Inclusion does not imply endorsement of framing.
            </p>
            {sources.map((src, i) => (
              <a
                key={i}
                href={src.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 rounded-lg border border-border p-3 hover:bg-muted/50 transition-colors group"
                data-testid={`link-source-${i}`}
              >
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-semibold group-hover:text-primary transition-colors">{src.name}</span>
                    <ExternalLink className="w-3 h-3 text-muted-foreground" />
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{src.framing}</p>
                </div>
              </a>
            ))}
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  );
}
