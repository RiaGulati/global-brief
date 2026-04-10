# Global Brief — Dockerfile
# Multi-stage build: build the app, then run it in a lean image

# ── Stage 1: Build ─────────────────────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source
COPY . .

# Build frontend + backend
RUN npm run build

# ── Stage 2: Production runtime ─────────────────────────────────────────────────
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=5000

# Only copy what's needed to run
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

# Install production deps only (for better-sqlite3)
RUN npm ci --omit=dev

# Expose the app port
EXPOSE 5000

# SQLite DB persists in /app/data.db — mount a volume here for persistence
# VOLUME ["/app"]

CMD ["node", "dist/index.cjs"]
