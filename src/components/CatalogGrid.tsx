import { SearchX } from "lucide-react";
import { useEffect, useState } from "react";
import { type Movie, filterMovies } from "@/data/movies";
import { MovieCard } from "./MovieCard";
import { MovieFilters, type FilterValues } from "./MovieFilters";
import { SearchBar } from "./SearchBar";

export type CatalogState = FilterValues & { q?: string | undefined };

export function CatalogGrid({ source, state, onChange }: { source: Movie[]; state: CatalogState; onChange: (s: CatalogState) => void }) {
  const [q, setQ] = useState(state.q ?? "");
  const [loading, setLoading] = useState(false);
  useEffect(() => setQ(state.q ?? ""), [state.q]);

  // debounce text search into the URL
  useEffect(() => {
    if ((state.q ?? "") === q) return;
    setLoading(true);
    const t = setTimeout(() => { onChange({ ...state, q: q || undefined }); setLoading(false); }, 300);
    return () => clearTimeout(t);
  }, [q]); // eslint-disable-line react-hooks/exhaustive-deps

  let results: Movie[] = [];
  let error: string | null = null;
  try { results = filterMovies(source, state); } catch { error = "Não foi possível carregar os resultados. Tente novamente."; }
  const active = Boolean(state.q || state.genre || state.year || state.rating);

  return (
    <div className="space-y-8">
      <div className="grid gap-4 rounded-2xl border border-border bg-card/60 p-5 md:grid-cols-[1.4fr_1fr] md:items-end">
        <SearchBar value={q} onChange={setQ} />
        <MovieFilters value={state} onChange={(v) => onChange({ ...v, q: state.q })} />
      </div>
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span aria-live="polite">{loading ? "Buscando..." : `${results.length} título(s)`}</span>
        {active && (
          <button onClick={() => { setQ(""); onChange({}); }} className="font-semibold text-primary hover:underline">Limpar filtros</button>
        )}
      </div>
      {state.rating && (
        <p className="rounded-lg border border-border bg-card p-3 text-sm text-muted-foreground">
          As avaliações aparecem quando a conexão com o TMDB é configurada. Nos dados de demonstração, nenhum título tem nota.
        </p>
      )}
      {error ? (
        <p role="alert" className="rounded-xl border border-destructive/50 p-6 text-center">{error}</p>
      ) : loading ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
          {Array.from({ length: 6 }).map((_, i) => <div key={i} className="aspect-[2/3] animate-pulse rounded-xl bg-card" />)}
        </div>
      ) : results.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-16 text-center">
          <SearchX className="h-12 w-12 text-muted-foreground" />
          <p className="text-lg font-semibold">Nenhum título encontrado</p>
          <p className="text-sm text-muted-foreground">Tente outro nome ou ajuste os filtros.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-4 lg:grid-cols-6">
          {results.map((m) => <MovieCard key={m.id} movie={m} />)}
        </div>
      )}
    </div>
  );
}
