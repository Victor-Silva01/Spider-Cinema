import type { CatalogState } from "@/components/CatalogGrid";

export function parseCatalogSearch(s: Record<string, unknown>): CatalogState {
  const num = (v: unknown) => (v != null && v !== "" && !Number.isNaN(Number(v)) ? Number(v) : undefined);
  return {
    q: typeof s["q"] === "string" && s["q"] ? s["q"] : undefined,
    genre: typeof s["genre"] === "string" && s["genre"] ? s["genre"] : undefined,
    year: num(s["year"]),
    rating: num(s["rating"]),
  };
}
