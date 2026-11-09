import { useState } from "react";
import type { Movie } from "@/data/movies";
import { SpiderIcon } from "./Logo";

export function Poster({ movie, className = "" }: { movie: Movie; className?: string }) {
  const [failed, setFailed] = useState(false);
  return (
    <div
      className={`relative aspect-[2/3] overflow-hidden bg-card ${className}`}
    >
      {movie.poster && !failed ? (
        <img src={movie.poster} alt={`Pôster de ${movie.title}`} loading="lazy" decoding="async" width={400} height={600} className="absolute inset-0 h-full w-full object-cover" onError={() => setFailed(true)} />
      ) : (
        <>
      <SpiderIcon className="absolute -right-6 -top-4 h-36 w-36 rotate-12 text-foreground/10" />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background via-background/70 to-transparent p-3 pt-16">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">{movie.year}</p>
        <p className="break-words font-display text-sm uppercase leading-snug text-foreground">{movie.originalTitle}</p>
      </div>
        </>
      )}
    </div>
  );
}
