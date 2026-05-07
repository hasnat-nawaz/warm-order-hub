# ─── Stage 1: Build ───
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json ./
RUN npm install --ignore-scripts

COPY . .

ARG VITE_API_URL=http://localhost:8080
ENV VITE_API_URL=${VITE_API_URL}

RUN npm run build

# ─── Stage 2: Serve with nginx ───
FROM nginx:stable-alpine AS production

# Remove default nginx page
RUN rm -rf /usr/share/nginx/html/*

# TanStack Start/Vite build outputs `dist/client` (browser) + `dist/server` (SSR).
# We serve the browser bundle via nginx.
COPY --from=builder /app/dist/client /usr/share/nginx/html

# Custom nginx config for SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
