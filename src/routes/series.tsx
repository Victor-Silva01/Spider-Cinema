import { createFileRoute } from "@tanstack/react-router";
import { CatalogGrid } from "@/components/CatalogGrid";
import { PageHeader } from "@/components/PageHeader";
import { series } from "@/data/movies";
import { parseCatalogSearch } from "@/lib/search-params";

export const Route = createFileRoute("/series")({
  validateSearch: parseCatalogSearch,
  head: () => ({
    meta: [
      { title: "Séries — Spider Cinema" },
      { name: "description", content: "Séries da Marvel e do universo do Homem-Aranha no Spider Cinema." },
      { property: "og:title", content: "Séries — Spider Cinema" },
      { property: "og:description", content: "Séries da Marvel e do universo do Homem-Aranha no Spider Cinema." },
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
      <PageHeader eyebrow="Catálogo" title="Séries" text="Séries de heróis, multiversos e muita ação." />
      <CatalogGrid source={series} state={search} onChange={(s) => navigate({ search: s, replace: true })} />
    </main>
  );
}
