import { createFileRoute } from "@tanstack/react-router";
import { CatalogGrid } from "@/components/CatalogGrid";
import { PageHeader } from "@/components/PageHeader";
import { films } from "@/data/movies";
import { parseCatalogSearch } from "@/lib/search-params";

export const Route = createFileRoute("/filmes")({
  validateSearch: parseCatalogSearch,
  head: () => ({
    meta: [
      { title: "Filmes — Spider Cinema" },
      { name: "description", content: "Pesquise filmes por título, gênero e ano no catálogo Spider Cinema." },
      { property: "og:title", content: "Filmes — Spider Cinema" },
      { property: "og:description", content: "Pesquise filmes por título, gênero e ano no catálogo Spider Cinema." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  return (
    <main className="mx-auto max-w-[1440px] px-4 md:px-8">
      <PageHeader eyebrow="Catálogo" title="Filmes" text="Encontre seu próximo filme por título, ator, diretor, gênero ou ano." />
      <CatalogGrid source={films} state={search} onChange={(s) => navigate({ search: s, replace: true })} />
    </main>
  );
}
