import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, type ReactNode } from "react";
import type { Movie } from "@/data/movies";
import { MovieCard } from "./MovieCard";

type Props = {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  movies: Movie[];
  seeAll?: "/filmes" | "/series" | "/universo-aranha" | "/trailers";
};

export function MovieCarousel({ title, subtitle, icon, movies, seeAll }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) => ref.current?.scrollBy({ left: dir * ref.current.clientWidth * 0.85, behavior: "smooth" });

  return (
    <section className="group/c relative" aria-label={title}>
      <div className="mb-4 flex items-end justify-between gap-4">
        <div className="flex items-center gap-3">
          {icon}
          <div>
            <h2 className="text-xl font-bold tracking-tight md:text-2xl">{title}</h2>
            {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {seeAll && (
            <Link to={seeAll} className="mr-2 hidden items-center gap-1 text-sm text-muted-foreground hover:text-primary sm:flex">
              Ver todos <ArrowRight className="h-4 w-4" />
            </Link>
          )}
          <button onClick={() => scroll(-1)} aria-label={`Anterior: ${title}`} className="grid h-9 w-9 place-items-center rounded-full border border-border transition hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-ring">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button onClick={() => scroll(1)} aria-label={`Próximo: ${title}`} className="grid h-9 w-9 place-items-center rounded-full border border-border transition hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-ring">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div ref={ref} className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-4 pt-1 md:-mx-0 md:px-0">
        {movies.map((m) => (
          <MovieCard key={m.id} movie={m} className="w-[42%] shrink-0 snap-start sm:w-[28%] md:w-[20%] lg:w-[15.5%]" />
        ))}
      </div>
    </section>
  );
}
