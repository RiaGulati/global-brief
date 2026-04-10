import { useQuery } from "@tanstack/react-query";
import { useParams, useLocation } from "wouter";
import { apiRequest } from "@/lib/queryClient";
import type { Story } from "@shared/schema";
import NavBar from "@/components/NavBar";
import StoryDetailPanel from "@/components/StoryDetailPanel";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";

export default function StoryDetail() {
  const params = useParams<{ id: string }>();
  const [, navigate] = useLocation();
  const id = parseInt(params.id || "0");

  const { data: story, isLoading } = useQuery<Story>({
    queryKey: ["/api/stories", id],
    queryFn: () => apiRequest("GET", `/api/stories/${id}`).then(r => r.json()),
    enabled: !!id,
  });

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to all stories
        </button>
        {isLoading ? (
          <div className="rounded-xl border border-border p-6 space-y-3">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-20 w-full" />
          </div>
        ) : story ? (
          <StoryDetailPanel story={story} onClose={() => navigate("/")} />
        ) : (
          <p className="text-muted-foreground">Story not found.</p>
        )}
      </div>
    </div>
  );
}
