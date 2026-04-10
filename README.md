# Global Brief

> Source-transparent world news. Facts separated from framing.

Global Brief compiles important global news from the last 24 hours, cross-referenced across multiple international sources. It shows what's confirmed, what's disputed, where outlets frame the same events differently, and why each story matters — without claiming to be unbiased.

---

## What it does

- **Dashboard** with region and topic filters, view modes (All / Common Ground / Still Developing), and a "What changed in the last 24 hours" strip
- **Story cards** with neutral summaries, confidence levels, and source counts
- **Detail panel** — tabs for Overview, Facts (verified/disputed), Framing differences by outlet, and links to original sources
- **2-minute Digest** — plain-language daily briefing with embedded video explainer scripts and scene directions
- **Dark/light mode** toggle
- **Mobile-friendly** layout

---

## Tech stack

| Layer | Tech |
|---|---|
| Frontend | React 18, Vite, Tailwind CSS v3, shadcn/ui, TanStack Query |
| Backend | Express.js (Node 20) |
| Database | SQLite via better-sqlite3 + Drizzle ORM |
| Routing | Wouter (hash-based, iframe-safe) |
| Fonts | Playfair Display (Google), Inter (Google) |

---

## Getting started

### Prerequisites

- Node.js 20+
- npm 9+

### 1. Clone and install

```bash
git clone https://github.com/YOUR_USERNAME/global-brief.git
cd global-brief
npm install
```

### 2. Set up environment

```bash
cp .env.example .env
# Edit .env if needed — defaults work out of the box
```

### 3. Initialize the database

```bash
npx drizzle-kit push
```

This creates `data.db` (SQLite) with the stories table. The app seeds itself with sample stories on first run.

### 4. Run in development

```bash
npm run dev
```

Open [http://localhost:5000](http://localhost:5000). The server hot-reloads on changes.

---

## Production build

```bash
npm run build
node dist/index.cjs
```

The app serves on port 5000 (or `$PORT` if set).

---

## Updating the news stories

Stories live in [`server/seed.ts`](server/seed.ts). Each story is a structured object with:

- `headline` — plain, neutral title
- `summary` — 2-3 sentence factual description
- `whyItMatters` — one sentence on stakes
- `region` — e.g. `"Middle East"`, `"Europe"`
- `topic` — e.g. `"conflict"`, `"economy"`, `"science"`
- `confidenceLevel` — `"high"` | `"moderate"` | `"low"`
- `sourceCount` — integer
- `sources` — JSON array: `[{ name, url, framing }]`
- `coreFacts` — JSON array of factual claims
- `verifiedPoints` — JSON array of multi-source confirmed facts
- `disputedDetails` — JSON array of contested/uncertain points
- `framingDifferences` — JSON array: `[{ outlet, framing }]`
- `isCommonGround` — boolean (verified across 3+ independent sources)
- `isStillDeveloping` — boolean
- `changedInLast24h` — string describing what's new

To refresh stories:

1. Delete `data.db`
2. Update `server/seed.ts` with new stories
3. Run `npx drizzle-kit push`
4. Restart the server — it re-seeds automatically

---

## Deploy

### Railway (easiest — one click)

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template)

1. Push this repo to GitHub
2. Connect Railway to your repo
3. Railway auto-detects Node.js and runs `npm run build` then `node dist/index.cjs`
4. Set env vars: `NODE_ENV=production`, `PORT=5000`

The `railway.json` config is already included.

---

### Render

1. Push to GitHub
2. Create a new **Web Service** on [render.com](https://render.com)
3. Connect your repo
4. Render uses `render.yaml` automatically — build and start commands are pre-configured
5. Add a **Disk** (1 GB, mounted at `/app`) to persist the SQLite database

---

### Fly.io

```bash
fly launch --no-deploy
fly deploy
```

`fly.toml` is pre-configured. The app runs on port 5000.

---

### Docker

```bash
# Build and run
docker compose up --build

# Or standalone
docker build -t global-brief .
docker run -p 5000:5000 global-brief
```

For persistence, mount a volume so `data.db` survives container restarts:

```bash
docker run -p 5000:5000 -v $(pwd)/data:/app global-brief
```

---

### Self-hosted VPS (nginx + PM2)

```bash
# Install dependencies and build
npm ci
npm run build

# Install PM2 globally
npm install -g pm2

# Start with PM2
pm2 start dist/index.cjs --name global-brief

# nginx reverse proxy config:
# proxy_pass http://localhost:5000;
```

---

## Project structure

```
global-brief/
├── client/
│   ├── index.html
│   └── src/
│       ├── App.tsx
│       ├── index.css
│       ├── components/
│       │   ├── NavBar.tsx
│       │   ├── StoryCard.tsx
│       │   ├── StoryDetailPanel.tsx
│       │   ├── ThemeProvider.tsx
│       │   └── ui/            ← shadcn/ui components
│       ├── pages/
│       │   ├── Home.tsx       ← main dashboard
│       │   ├── DigestView.tsx ← 2-minute digest
│       │   └── StoryDetail.tsx
│       └── lib/
│           └── queryClient.ts
├── server/
│   ├── index.ts     ← Express entry point
│   ├── routes.ts    ← API routes
│   ├── storage.ts   ← Drizzle queries
│   ├── db.ts        ← SQLite connection
│   └── seed.ts      ← Sample stories (edit to update news)
├── shared/
│   └── schema.ts    ← Drizzle schema + Zod types
├── .env.example
├── .gitignore
├── Dockerfile
├── docker-compose.yml
├── fly.toml
├── railway.json
├── render.yaml
├── drizzle.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── vite.config.ts
```

---

## API

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/stories` | All stories. Query params: `region`, `topic`, `view` (`common-ground` \| `developing`) |
| `GET` | `/api/stories/:id` | Single story by ID |
| `GET` | `/api/digest` | Top 5 stories, truncated for digest |

---

## License

MIT — use freely, credit appreciated.

---

*Built with [Perplexity Computer](https://www.perplexity.ai/computer). News data sourced from Democracy Now!, Financial Times, Global News, Euronews, NBC News, Al Jazeera, Reuters, New York Times, NASA, CBS News, and others.*
