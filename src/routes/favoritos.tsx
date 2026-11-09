import { Link, createFileRoute } from "@tanstack/react-router";
import { Heart, X } from "lucide-react";
import { MovieCard } from "@/components/MovieCard";
import { PageHeader } from "@/components/PageHeader";
import { getMovie, type Movie } from "@/data/movies";
import { useFavorites } from "@/lib/favorites";

export const Route = createFileRoute("/favoritos")({
  head: () => ({
    meta: [
      { title: "Meus favoritos — Spider Cinema" },
      { name: "description", content: "Sua lista pessoal de filmes e séries favoritos no Spider Cinema." },
      { property: "og:title", content: "Meus favoritos — Spider Cinema" },
      { property: "og:description", content: "Sua lista pessoal de filmes e séries favoritos." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  const { ids, toggle } = useFavorites();
  const list = ids.map(getMovie).filter(Boolean) as Movie[];
  return (
    <main className="mx-auto max-w-[1440px] px-4 md:px-8">
      <PageHeader eyebrow="Sua lista" title="Favoritos" text="Os títulos que você salvou ficam guardados neste navegador." />
      {list.length === 0 ? (
        <div className="relative flex flex-col items-center gap-4 overflow-hidden rounded-2xl border border-border bg-card/60 px-6 py-20 text-center">
          <span className="grid h-20 w-20 place-items-center rounded-full bg-secondary"><Heart className="h-9 w-9 text-spider" /></span>
          <h2 className="text-2xl font-bold">Sua lista está vazia</h2>
          <p className="max-w-md text-muted-foreground">Toque no coração de qualquer filme para guardá-lo aqui e assistir depois.</p>
          <Link to="/universo-aranha" className="mt-2 inline-flex h-12 items-center rounded-lg bg-primary px-6 text-sm font-bold text-primary-foreground shadow-glow hover:brightness-110">Explorar o Universo Aranha</Link>
        </div>
      ) : (
        <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 lg:grid-cols-6">
          {list.map((m) => (
            <li key={m.id} className="space-y-2">
              <MovieCard movie={m} />
              <button onClick={() => toggle(m.id)} className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive"><X className="h-3 w-3" /> Remover</button>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
