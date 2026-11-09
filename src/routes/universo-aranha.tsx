import { createFileRoute } from "@tanstack/react-router";
import { MovieCard } from "@/components/MovieCard";
import { PageHeader } from "@/components/PageHeader";
import { movies } from "@/data/movies";

export const Route = createFileRoute("/universo-aranha")({
  head: () => ({
    meta: [
      { title: "Universo Aranha — Spider Cinema" },
      { name: "description", content: "Todos os filmes e séries do Homem-Aranha, de 2002 ao Aranhaverso, em ordem de lançamento." },
      { property: "og:title", content: "Universo Aranha — Spider Cinema" },
      { property: "og:description", content: "Todos os filmes e séries do Homem-Aranha em ordem de lançamento." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  const list = movies.filter((m) => m.collections.includes("spider")).sort((a, b) => a.year - b.year);
  return (
    <main className="mx-auto max-w-[1440px] px-4 md:px-8">
      <PageHeader eyebrow="Todas as sagas" title="Universo Aranha" text="Todos os heróis. Um só universo. Em ordem de lançamento." />
      <ol className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {list.map((m, i) => (
          <li key={m.id} className="relative">
            <span className="absolute -left-1 -top-4 z-10 font-display text-4xl text-primary/80">{String(i + 1).padStart(2, "0")}</span>
            <MovieCard movie={m} />
          </li>
        ))}
      </ol>
    </main>
  );
}
