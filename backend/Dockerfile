# ─── Stage 1: Build ───
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts

COPY tsconfig.json ./
COPY src/ ./src/
COPY scripts/ ./scripts/
COPY db/ ./db/

RUN npm run build

# ─── Stage 2: Production ───
FROM node:20-alpine AS production

WORKDIR /app

ENV NODE_ENV=production

COPY package.json package-lock.json ./
RUN npm ci --omit=dev --ignore-scripts

COPY --from=builder /app/dist/ ./dist/
COPY db/ ./db/
COPY scripts/ ./scripts/

EXPOSE 8080

CMD ["node", "dist/src/index.js"]
