# Global Brief — Dockerfile
# Uses node:20 (Debian-based) so better-sqlite3 compiles without issues

FROM node:20-slim AS builder

WORKDIR /app

# Install build tools needed for better-sqlite3 (node-gyp)
RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

# Install ALL deps (including devDeps needed for build)
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build

# ── Production image ────────────────────────────────────────────────────────────
FROM node:20-slim AS runner

WORKDIR /app

ENV NODE_ENV=production

# Install build tools again for better-sqlite3 in production install
RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

# Copy built output and package files
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

# Install production deps (better-sqlite3 needs to compile here too)
RUN npm ci --omit=dev

EXPOSE 3000

CMD ["node", "dist/index.cjs"]
