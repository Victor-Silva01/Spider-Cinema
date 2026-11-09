import { Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import type { Movie } from "@/data/movies";
import { Poster } from "./Poster";
import { FavoriteButton } from "./FavoriteButton";

export function MovieCard({ movie, className = "" }: { movie: Movie; className?: string }) {
  return (
    <Link to="/filme/$id" params={{ id: movie.id }} className={`group block rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring ${className}`}>
      <div className="relative overflow-hidden rounded-xl ring-1 ring-border transition duration-300 group-hover:-translate-y-1 group-hover:ring-primary/70 group-hover:shadow-glow">
        <Poster movie={movie} className="transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute right-2 top-2 opacity-100 transition md:opacity-0 md:group-hover:opacity-100 md:group-focus-visible:opacity-100">
          <FavoriteButton id={movie.id} />
        </div>
      </div>
      <div className="mt-2 space-y-0.5 px-0.5">
        <p className="line-clamp-2 text-sm font-semibold leading-snug group-hover:text-primary">{movie.title}</p>
        <p className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{movie.year}</span>
          {movie.rating != null && (
            <span className="flex items-center gap-1 text-foreground"><Star className="h-3 w-3 fill-primary text-primary" />{movie.rating.toFixed(1)}</span>
          )}
        </p>
      </div>
    </Link>
  );
}
