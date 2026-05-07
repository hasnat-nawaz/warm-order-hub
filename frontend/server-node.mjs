import http from "node:http";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Readable } from "node:stream";

import server from "./dist/server/server.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT ?? 80);
const HOST = process.env.HOST ?? "0.0.0.0";
const clientDir = path.join(__dirname, "dist", "client");

const MIME: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8",
};

function toHeaders(nodeHeaders: http.IncomingHttpHeaders) {
  const h = new Headers();
  for (const [k, v] of Object.entries(nodeHeaders)) {
    if (v == null) continue;
    if (Array.isArray(v)) h.set(k, v.join(","));
    else h.set(k, v);
  }
  return h;
}

function safeJoin(base: string, reqPath: string) {
  const rel = reqPath.replace(/^\/+/, "");
  const full = path.join(base, rel);
  if (!full.startsWith(base)) return null;
  return full;
}

async function tryServeStatic(url: URL) {
  // Serve built client assets + a couple root files that exist in dist/client.
  const p = url.pathname;
  const isStatic =
    p === "/wrangler.json" ||
    p === "/.assetsignore" ||
    p.startsWith("/assets/") ||
    /\.(js|css|png|jpg|jpeg|gif|svg|webp|ico|json|txt)$/.test(p);

  if (!isStatic) return null;

  const filePath = safeJoin(clientDir, p);
  if (!filePath) return new Response("Not found", { status: 404 });

  try {
    const buf = await readFile(filePath);
    const ext = path.extname(filePath).toLowerCase();
    return new Response(buf, {
      status: 200,
      headers: {
        "content-type": MIME[ext] ?? "application/octet-stream",
        // cache-busting assets are hashed; safe to cache aggressively
        "cache-control": p.startsWith("/assets/") ? "public, max-age=31536000, immutable" : "no-cache",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}

const srv = http.createServer(async (req, res) => {
  try {
    const host = req.headers.host ?? `localhost:${PORT}`;
    const url = new URL(req.url ?? "/", `http://${host}`);

    const staticResp = await tryServeStatic(url);
    const request = new Request(url, {
      method: req.method,
      headers: toHeaders(req.headers),
      body: req.method && ["GET", "HEAD"].includes(req.method) ? undefined : req,
      // @ts-expect-error node fetch accepts duplex
      duplex: "half",
    });

    const response = staticResp ?? (await server.fetch(request));

    res.statusCode = response.status;
    response.headers.forEach((value, key) => res.setHeader(key, value));

    if (!response.body) return res.end();
    Readable.fromWeb(response.body).pipe(res);
  } catch (e) {
    res.statusCode = 500;
    res.setHeader("content-type", "text/plain; charset=utf-8");
    res.end("Internal Server Error");
  }
});

srv.listen(PORT, HOST, () => {
  // eslint-disable-next-line no-console
  console.log(`Frontend listening on http://${HOST}:${PORT}`);
});

