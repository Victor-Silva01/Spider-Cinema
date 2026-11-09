import { Play } from "lucide-react";
import { useCallback, useState } from "react";
import trailersImg from "@/assets/trailers.jpg";
import { movies } from "@/data/movies";
import { TrailerModal } from "./TrailerModal";

export function TrailersBanner({ onExplore }: { onExplore?: () => void }) {
  return (
    <section className="relative isolate overflow-hidden rounded-2xl ring-1 ring-border">
      <img src={trailersImg} alt="" loading="lazy" width={1920} height={832} className="absolute inset-0 -z-10 h-full w-full object-cover" />
      <div className="absolute inset-0 -z-10 bg-hero-gradient" />
      <div className="flex flex-col gap-4 p-8 md:flex-row md:items-center md:gap-6 md:p-12">
        <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full border-2 border-primary text-primary"><Play className="h-7 w-7 fill-current" /></span>
        <div className="space-y-2">
          <h2 className="font-display text-3xl uppercase tracking-wide md:text-4xl">Trailers e vídeos</h2>
          <p className="max-w-md text-sm text-foreground/80">Assista aos trailers oficiais dos maiores lançamentos, direto do YouTube.</p>
          {onExplore && (
            <button onClick={onExplore} className="mt-2 inline-flex h-11 items-center rounded-lg bg-primary px-6 text-sm font-bold text-primary-foreground hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">Explorar</button>
          )}
        </div>
      </div>
    </section>
  );
}

export function TrailerGrid({ limit }: { limit?: number }) {
  const [sel, setSel] = useState<{ id: string; title: string } | null>(null);
  const close = useCallback(() => setSel(null), []);
  const list = movies.filter((m) => m.trailerId).slice(0, limit);
  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((m) => (
          <button key={m.id} onClick={() => setSel({ id: m.trailerId!, title: m.title })} className="group text-left focus-visible:outline-none">
            <div className="relative aspect-video overflow-hidden rounded-xl ring-1 ring-border transition group-hover:ring-primary group-focus-visible:ring-2 group-focus-visible:ring-ring">
              <img src={`https://i.ytimg.com/vi/${m.trailerId}/hqdefault.jpg`} alt="" loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              <span className="absolute inset-0 grid place-items-center bg-background/30 transition group-hover:bg-background/10">
                <span className="grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-glow transition group-hover:scale-110"><Play className="h-6 w-6 fill-current" /></span>
              </span>
            </div>
            <p className="mt-2 font-semibold group-hover:text-primary">{m.title}</p>
            <p className="text-xs text-muted-foreground">Trailer oficial • {m.year}</p>
          </button>
        ))}
      </div>
      <TrailerModal videoId={sel?.id ?? null} title={sel?.title ?? ""} onClose={close} />
    </>
  );
}
