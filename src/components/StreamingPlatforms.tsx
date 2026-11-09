import { ExternalLink } from "lucide-react";
import type { Movie } from "@/data/movies";

export function StreamingPlatforms({ movie }: { movie: Movie }) {
  const search = `https://www.justwatch.com/br/busca?q=${encodeURIComponent(movie.originalTitle)}`;
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-bold uppercase tracking-wider text-primary">Disponível em</h3>
      {movie.providers?.length ? (
        <div className="flex flex-wrap gap-2">
          {movie.providers.map((p) => (
            <a key={p.name} href={p.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary">{p.name}<ExternalLink className="h-3 w-3" /></a>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">
          Informação de disponibilidade ainda não carregada.{" "}
          <a href={search} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-foreground underline underline-offset-4 hover:text-primary">
            Consultar plataformas legais no JustWatch <ExternalLink className="h-3 w-3" />
          </a>
        </p>
      )}
    </div>
  );
}
