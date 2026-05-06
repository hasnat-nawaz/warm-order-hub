import { z } from "zod";

const API_URL = (import.meta.env.VITE_API_URL as string | undefined) ?? "http://localhost:8080";

export function getApiUrl(path: string) {
  return `${API_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export async function apiFetch<T>(
  path: string,
  opts?: {
    method?: string;
    token?: string | null;
    body?: unknown;
    schema?: z.ZodType<T>;
  },
): Promise<T> {
  const res = await fetch(getApiUrl(path), {
    method: opts?.method ?? (opts?.body ? "POST" : "GET"),
    headers: {
      "content-type": "application/json",
      ...(opts?.token ? { authorization: `Bearer ${opts.token}` } : {}),
    },
    body: opts?.body ? JSON.stringify(opts.body) : undefined,
  });

  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = json?.error?.message ?? `Request failed (${res.status})`;
    throw new Error(msg);
  }
  const data = json as T;
  return opts?.schema ? opts.schema.parse(data) : data;
}
