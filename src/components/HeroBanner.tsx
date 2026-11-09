import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, Info, Play, Star } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { type Movie, formatRuntime } from "@/data/movies";
import { TrailerModal } from "./TrailerModal";

export function HeroBanner({ items }: { items: Movie[] }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [trailer, setTrailer] = useState<string | null>(null);
  const m = items[i]!;
  const go = useCallback((d: number) => setI((x) => (x + d + items.length) % items.length), [items.length]);
  const close = useCallback(() => setTrailer(null), []);

  useEffect(() => {
    if (paused || trailer) return;
    const t = setInterval(() => go(1), 8000);
    return () => clearInterval(t);
  }, [paused, trailer, go]);

  return (
    <section
      className="relative isolate min-h-[480px] overflow-hidden rounded-2xl ring-1 ring-border sm:min-h-[560px] lg:min-h-[600px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carrossel"
      aria-label="Filmes em destaque"
    >
      <div key={m.id} className="absolute inset-0 -z-10">
        {m.backdrop ? (
          <img src={m.backdrop} alt="" width={1920} height={1080} className="h-full w-full animate-slowzoom object-cover object-right" />
        ) : (
          <div className="h-full w-full animate-slowzoom" style={{ backgroundImage: `radial-gradient(80% 90% at 75% 30%, oklch(0.55 0.22 ${m.hue}) 0%, oklch(0.22 0.1 ${m.hue}) 50%, oklch(0.1 0.02 ${m.hue}) 100%)` }} />
        )}
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="absolute inset-0 bg-fade-gradient" />
      </div>

      <div key={`t-${m.id}`} className="flex min-h-[480px] max-w-2xl flex-col justify-end gap-5 p-6 pb-16 sm:min-h-[560px] md:p-12 md:pb-20 lg:min-h-[600px]">
        <p className="animate-rise text-xs font-bold uppercase tracking-[0.3em] text-primary">Em destaque</p>
        <h1 className="animate-rise font-display text-4xl uppercase leading-[0.95] tracking-wide sm:text-5xl md:text-7xl" style={{ animationDelay: "80ms" }}>
          {m.title}
        </h1>
        <div className="flex animate-rise flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground" style={{ animationDelay: "140ms" }}>
          {m.rating != null ? (
            <span className="flex items-center gap-1 text-foreground"><Star className="h-4 w-4 fill-primary text-primary" />{m.rating.toFixed(1)}{m.voteCount ? ` (${m.voteCount})` : ""}</span>
          ) : (
            <span className="rounded border border-border px-1.5 py-0.5 text-xs">Avaliação indisponível</span>
          )}
          <span>{m.year}</span>
          {formatRuntime(m.runtime) && <span>• {formatRuntime(m.runtime)}</span>}
          <span>• {m.genres.join(", ")}</span>
        </div>
        <p className="line-clamp-3 max-w-xl animate-rise text-base leading-relaxed text-foreground/85" style={{ animationDelay: "200ms" }}>{m.synopsis}</p>
        <div className="flex animate-rise flex-wrap gap-3" style={{ animationDelay: "260ms" }}>
          <button
            onClick={() => m.trailerId && setTrailer(m.trailerId)}
            disabled={!m.trailerId}
            className="inline-flex h-12 items-center gap-2 rounded-lg bg-primary px-6 text-sm font-bold text-primary-foreground shadow-glow transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:opacity-50"
          >
            <Play className="h-4 w-4 fill-current" /> {m.trailerId ? "Assistir ao trailer" : "Trailer indisponível"}
          </button>
          <Link to="/filme/$id" params={{ id: m.id }} className="inline-flex h-12 items-center gap-2 rounded-lg border border-foreground/30 bg-background/30 px-6 text-sm font-semibold backdrop-blur transition hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-ring">
            <Info className="h-4 w-4" /> Mais detalhes
          </Link>
        </div>
      </div>

      <div className="absolute bottom-6 left-6 flex items-center gap-2 md:left-12">
        {items.map((it, idx) => (
          <button key={it.id} onClick={() => setI(idx)} aria-label={`Destaque ${idx + 1}: ${it.title}`} aria-current={idx === i} className={`h-1.5 rounded-full transition-all ${idx === i ? "w-10 bg-primary" : "w-4 bg-foreground/40 hover:bg-foreground/70"}`} />
        ))}
      </div>
      <div className="absolute bottom-4 right-4 flex gap-2 md:bottom-6 md:right-6">
        <button onClick={() => go(-1)} aria-label="Destaque anterior" className="grid h-10 w-10 place-items-center rounded-full bg-background/50 backdrop-blur hover:text-primary"><ChevronLeft className="h-5 w-5" /></button>
        <button onClick={() => go(1)} aria-label="Próximo destaque" className="grid h-10 w-10 place-items-center rounded-full bg-background/50 backdrop-blur hover:text-primary"><ChevronRight className="h-5 w-5" /></button>
      </div>
      <TrailerModal videoId={trailer} title={m.title} onClose={close} />
    </section>
  );
}
