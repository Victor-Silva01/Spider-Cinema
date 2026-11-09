import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Flame, Sparkles, Star } from "lucide-react";
import { useState } from "react";
import { HeroBanner } from "@/components/HeroBanner";
import { MovieCarousel } from "@/components/MovieCarousel";
import { MovieCard } from "@/components/MovieCard";
import { MovieFilters, type FilterValues } from "@/components/MovieFilters";
import { SearchBar } from "@/components/SearchBar";
import { SpiderIcon } from "@/components/Logo";
import { TrailerGrid, TrailersBanner } from "@/components/TrailersSection";
import { byCollection, featuredIds, getMovie, related, type Movie } from "@/data/movies";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Spider Cinema — Homem-Aranha, Marvel e trailers oficiais" },
      { name: "description", content: "Plataforma premium de filmes: universo Homem-Aranha, Marvel Studios, lançamentos e trailers oficiais." },
      { property: "og:title", content: "Spider Cinema — Homem-Aranha, Marvel e trailers" },
      { property: "og:description", content: "Universo Homem-Aranha, Marvel Studios, lançamentos e trailers oficiais em um só lugar." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function SearchPanel() {
  const [q, setQ] = useState("");
  const [f, setF] = useState<FilterValues>({});
  const navigate = useNavigate();
  const go = () => navigate({ to: "/filmes", search: { q: q.trim() || undefined, ...f } });
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-card/70 p-6">
      <SpiderIcon className="absolute -right-8 -top-8 h-40 w-40 text-foreground/5" />
      <h2 className="text-2xl font-bold">Encontre seu filme favorito</h2>
      <p className="mb-5 text-sm text-muted-foreground">Busque por título, ator, diretor ou gênero.</p>
      <div className="space-y-4">
        <SearchBar value={q} onChange={setQ} onSubmit={go} />
        <MovieFilters value={f} onChange={setF} />
        <button onClick={go} className="h-11 w-full rounded-lg bg-primary text-sm font-bold text-primary-foreground transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">Buscar</button>
      </div>
    </div>
  );
}

function MiniGrid({ title, icon, movies }: { title: string; icon: React.ReactNode; movies: Movie[] }) {
  return (
    <div className="rounded-2xl border border-border bg-card/40 p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="flex items-center gap-2 font-bold">{icon}{title}</h2>
        <Link to="/filmes" className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary">Ver todos <ArrowRight className="h-3 w-3" /></Link>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {movies.map((m) => <MovieCard key={m.id} movie={m} />)}
      </div>
    </div>
  );
}

function Index() {
  const featured = featuredIds.map(getMovie).filter(Boolean) as Movie[];
  const highlights = byCollection("highlight").sort((a, b) => b.year - a.year);
  const nwh = featured[0];
  if (!nwh) return null;

  return (
    <main className="mx-auto max-w-[1440px] space-y-14 px-4 pt-20 md:px-8">
      <div className="grid gap-6 xl:grid-cols-[1fr_400px]">
        <HeroBanner items={featured} />
        <aside className="grid gap-6 md:grid-cols-2 xl:grid-cols-1 xl:content-start">
          <SearchPanel />
          <MiniGrid title="Em alta" icon={<Flame className="h-4 w-4 text-spider" />} movies={highlights.slice(0, 4)} />
        </aside>
      </div>

      <MovieCarousel
        title="Universo do Homem-Aranha"
        subtitle="Todas as sagas. Todos os heróis. Um só universo."
        icon={<SpiderIcon className="h-9 w-9 text-spider" />}
        movies={byCollection("spider").sort((a, b) => a.year - b.year)}
        seeAll="/universo-aranha"
      />
      <MovieCarousel
        title="Marvel Studios"
        subtitle="Os maiores heróis do universo em um só lugar."
        icon={<span className="grid h-9 place-items-center rounded bg-spider px-2 font-display text-sm tracking-wider text-foreground">MARVEL</span>}
        movies={byCollection("marvel").filter((m) => !m.collections.includes("spider"))}
        seeAll="/filmes"
      />
      <MovieCarousel
        title="Lançamentos e destaques"
        subtitle="O que está em alta agora."
        icon={<Star className="h-7 w-7 fill-primary text-primary" />}
        movies={highlights}
        seeAll="/filmes"
      />

      <section className="space-y-6">
        <TrailersBanner />
        <TrailerGrid limit={3} />
        <div className="text-center">
          <Link to="/trailers" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">Ver todos os trailers <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>

      <MovieCarousel
        title="Você pode gostar"
        subtitle={`Porque você viu ${nwh.title}`}
        icon={<Sparkles className="h-7 w-7 text-primary" />}
        movies={related(nwh, 10)}
      />
    </main>
  );
}
