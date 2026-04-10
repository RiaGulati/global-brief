import { useTheme } from "@/components/ThemeProvider";
import { Link } from "wouter";
import { Moon, Sun, Globe2, Clock, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NavBar() {
  const { theme, toggle } = useTheme();
  const now = new Date();
  const dateStr = now.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm" data-testid="navbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
        {/* Logo */}
        <Link href="/">
          <a className="flex items-center gap-2.5 group" data-testid="link-home">
            <svg aria-label="Global Brief logo" viewBox="0 0 32 32" fill="none" className="w-7 h-7 shrink-0">
              <circle cx="16" cy="16" r="13" stroke="currentColor" strokeWidth="1.8" className="text-primary"/>
              <ellipse cx="16" cy="16" rx="5" ry="13" stroke="currentColor" strokeWidth="1.2" className="text-primary" strokeDasharray="2 2"/>
              <line x1="3" y1="16" x2="29" y2="16" stroke="currentColor" strokeWidth="1.2" className="text-primary"/>
              <line x1="3" y1="11" x2="29" y2="11" stroke="currentColor" strokeWidth="0.8" className="text-muted-foreground" opacity="0.5"/>
              <line x1="3" y1="21" x2="29" y2="21" stroke="currentColor" strokeWidth="0.8" className="text-muted-foreground" opacity="0.5"/>
            </svg>
            <div>
              <span className="text-base font-bold tracking-tight" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                Global Brief
              </span>
              <span className="hidden sm:block text-xs text-muted-foreground leading-none mt-0.5">Source-transparent world news</span>
            </div>
          </a>
        </Link>

        {/* Center date */}
        <div className="hidden md:flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock className="w-3.5 h-3.5" />
          <span>{dateStr}</span>
          <span className="mx-1.5 text-border">·</span>
          <span className="text-primary font-medium">Last 24 hours</span>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <Link href="/digest">
            <a data-testid="link-digest">
              <Button variant="ghost" size="sm" className="hidden sm:flex items-center gap-1.5 text-xs h-8">
                <BookOpen className="w-3.5 h-3.5" />
                2-min Digest
              </Button>
            </a>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={toggle}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            data-testid="button-theme-toggle"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>
        </div>
      </div>
    </nav>
  );
}
