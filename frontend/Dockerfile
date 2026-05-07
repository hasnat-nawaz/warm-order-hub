# ─── Stage 1: Build ───
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json ./
RUN npm install --ignore-scripts

COPY . .

ARG VITE_API_URL=http://localhost:8080
ENV VITE_API_URL=${VITE_API_URL}

RUN npm run build

# ─── Stage 2: Run SSR preview server ───
# TanStack Start builds an SSR bundle exporting a fetch() handler.
# We run a tiny Node HTTP server that forwards requests to that handler and
# serves dist/client static assets.
FROM node:20-alpine AS production

WORKDIR /app
ENV NODE_ENV=production

COPY package.json ./
RUN npm install --omit=dev --ignore-scripts

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server-node.mjs ./server-node.mjs

EXPOSE 80

CMD ["node", "./server-node.mjs"]
