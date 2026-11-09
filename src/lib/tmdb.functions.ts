import { createServerFn } from "@tanstack/react-start";

// TMDB integration. The token lives only on the server (TMDB_API_TOKEN,
// a v4 "API Read Access Token"). When it is missing, callers fall back to
// the demonstration catalog in src/data/movies.ts.
const BASE = "https://api.themoviedb.org/3";

async function tmdb<T>(path: string): Promise<T | null> {
  const token = process.env["TMDB_API_TOKEN"];
  if (!token) return null;
  const res = await fetch(`${BASE}${path}${path.includes("?") ? "&" : "?"}language=pt-BR`, {
    headers: { Authorization: `Bearer ${token}`, accept: "application/json" },
  });
  if (!res.ok) throw new Error(`TMDB respondeu ${res.status}`);
  return (await res.json()) as T;
}

export const getTmdbStatus = createServerFn({ method: "GET" }).handler(async () => ({
  configured: Boolean(process.env["TMDB_API_TOKEN"]),
}));

export const searchTmdb = createServerFn({ method: "GET" })
  .inputValidator((d: { query: string }) => ({ query: String(d.query).slice(0, 100) }))
  .handler(async ({ data }) => {
    const r = await tmdb<{ results: unknown[] }>(`/search/movie?query=${encodeURIComponent(data.query)}`);
    return r ? { configured: true, results: r.results as never[] } : { configured: false, results: [] as never[] };
  });
