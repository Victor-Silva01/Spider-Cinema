import { Link } from "@tanstack/react-router";
import { ArrowLeft, Play, Star } from "lucide-react";
import { useCallback, useState } from "react";
import { type Movie, formatRuntime, related } from "@/data/movies";
import { Poster } from "./Poster";
import { FavoriteButton } from "./FavoriteButton";
import { TrailerModal } from "./TrailerModal";
import { StreamingPlatforms } from "./StreamingPlatforms";
import { MovieCard } from "./MovieCard";

const tabs = ["Sobre", "Elenco", "Trailers", "Relacionados"] as const;

export function MovieDetails({ movie }: { movie: Movie }) {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Sobre");
  const [trailer, setTrailer] = useState<string | null>(null);
  const close = useCallback(() => setTrailer(null), []);
  const rel = related(movie);
  const initials = (n: string) => n.split(" ").map((p) => p[0]).slice(0, 2).join("");

  return (
    <article>
      <div className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          {movie.backdrop ? (
            <img src={movie.backdrop} alt="" width={1920} height={1080} className="h-full w-full object-cover opacity-70" />
          ) : (
            <div className="h-full w-full" style={{ backgroundImage: `radial-gradient(70% 90% at 80% 20%, oklch(0.5 0.2 ${movie.hue}) 0%, oklch(0.18 0.08 ${movie.hue}) 55%, oklch(0.1 0.01 ${movie.hue}) 100%)` }} />
          )}
          <div className="absolute inset-0 bg-hero-gradient" />
          <div className="absolute inset-0 bg-fade-gradient" />
        </div>
        <div className="mx-auto max-w-[1440px] px-4 pb-12 pt-24 md:px-8 md:pt-28">
          <Link to="/" className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"><ArrowLeft className="h-4 w-4" /> Voltar</Link>
          <div className="flex flex-col gap-8 md:flex-row md:items-end">
            <Poster movie={movie} className="w-44 shrink-0 animate-rise rounded-xl shadow-2xl ring-1 ring-border md:w-64" />
            <div className="max-w-3xl animate-rise space-y-4">
              <h1 className="font-display text-3xl uppercase leading-[0.95] tracking-wide sm:text-4xl md:text-6xl">{movie.title}</h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                {movie.rating != null ? (
                  <span className="flex items-center gap-1 text-foreground"><Star className="h-4 w-4 fill-primary text-primary" />{movie.rating.toFixed(1)}</span>
                ) : (
                  <span className="rounded border border-border px-1.5 py-0.5 text-xs">Avaliação indisponível</span>
                )}
                <span>{movie.year}</span>
                {formatRuntime(movie.runtime) && <span>• {formatRuntime(movie.runtime)}</span>}
                <span>• {movie.genres.join(", ")}</span>
                {movie.type === "series" && <span className="rounded bg-secondary px-2 py-0.5 text-xs">Série</span>}
              </div>
              <p className="text-base leading-relaxed text-foreground/85">{movie.synopsis}</p>
              <p className="text-sm"><span className="text-muted-foreground">Direção:</span> {movie.director}</p>
              <div className="flex flex-wrap gap-3">
                <button onClick={() => movie.trailerId && setTrailer(movie.trailerId)} disabled={!movie.trailerId} className="inline-flex h-12 items-center gap-2 rounded-lg bg-primary px-6 text-sm font-bold text-primary-foreground shadow-glow hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:opacity-50">
                  <Play className="h-4 w-4 fill-current" /> {movie.trailerId ? "Assistir ao trailer" : "Trailer indisponível"}
                </button>
                <FavoriteButton id={movie.id} variant="full" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1440px] px-4 md:px-8">
        <div role="tablist" aria-label="Seções do filme" className="no-scrollbar flex gap-6 overflow-x-auto border-b border-border">
          {tabs.map((t) => (
            <button key={t} role="tab" aria-selected={tab === t} onClick={() => setTab(t)} className={`relative whitespace-nowrap py-3 text-sm font-semibold transition-colors ${tab === t ? "text-primary after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:bg-primary" : "text-muted-foreground hover:text-foreground"}`}>
              {t}
            </button>
          ))}
        </div>
        <div role="tabpanel" className="animate-rise py-8" key={tab}>
          {tab === "Sobre" && (
            <div className="grid gap-10 md:grid-cols-[2fr_1fr]">
              <div className="space-y-6">
                <dl className="grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
                  <div><dt className="text-muted-foreground">Título original</dt><dd className="font-medium">{movie.originalTitle}</dd></div>
                  <div><dt className="text-muted-foreground">Lançamento</dt><dd className="font-medium">{movie.year}</dd></div>
                  <div><dt className="text-muted-foreground">Duração</dt><dd className="font-medium">{formatRuntime(movie.runtime) ?? "—"}</dd></div>
                  <div><dt className="text-muted-foreground">Direção</dt><dd className="font-medium">{movie.director}</dd></div>
                </dl>
                <div className="flex flex-wrap gap-4">
                  {movie.cast.slice(0, 4).map((c) => (
                    <div key={c.name} className="flex items-center gap-3">
                      <span className="grid h-12 w-12 place-items-center rounded-full bg-secondary text-sm font-bold text-primary">{initials(c.name)}</span>
                      <div className="text-sm"><p className="font-semibold">{c.name}</p><p className="text-muted-foreground">{c.role}</p></div>
                    </div>
                  ))}
                </div>
              </div>
              <StreamingPlatforms movie={movie} />
            </div>
          )}
          {tab === "Elenco" && (
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {movie.cast.map((c) => (
                <li key={c.name} className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-secondary font-bold text-primary">{initials(c.name)}</span>
                  <div><p className="font-semibold">{c.name}</p><p className="text-sm text-muted-foreground">{c.role}</p></div>
                </li>
              ))}
              <li className="flex items-center gap-3 rounded-xl border border-dashed border-border p-4 text-sm"><span className="text-muted-foreground">Direção:</span> {movie.director}</li>
            </ul>
          )}
          {tab === "Trailers" && (
            movie.trailerId ? (
              <button onClick={() => setTrailer(movie.trailerId!)} className="group relative block aspect-video w-full max-w-3xl overflow-hidden rounded-xl ring-1 ring-border focus-visible:outline-2 focus-visible:outline-ring">
                <img src={`https://i.ytimg.com/vi/${movie.trailerId}/hqdefault.jpg`} alt={`Miniatura do trailer de ${movie.title}`} loading="lazy" className="h-full w-full object-cover transition group-hover:scale-105" />
                <span className="absolute inset-0 grid place-items-center bg-background/40"><span className="grid h-16 w-16 place-items-center rounded-full bg-primary text-primary-foreground shadow-glow"><Play className="h-7 w-7 fill-current" /></span></span>
              </button>
            ) : (
              <p className="text-muted-foreground">Nenhum trailer oficial disponível para este título no momento.</p>
            )
          )}
          {tab === "Relacionados" && (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
              {rel.map((r) => <MovieCard key={r.id} movie={r} />)}
            </div>
          )}
        </div>
        {tab !== "Relacionados" && (
          <section className="mt-4">
            <h2 className="mb-4 text-xl font-bold">Você pode gostar</h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
              {rel.slice(0, 6).map((r) => <MovieCard key={r.id} movie={r} />)}
            </div>
          </section>
        )}
      </div>
      <TrailerModal videoId={trailer} title={movie.title} onClose={close} />
    </article>
  );
}
