import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { TrailerGrid } from "@/components/TrailersSection";

export const Route = createFileRoute("/trailers")({
  head: () => ({
    meta: [
      { title: "Trailers oficiais — Spider Cinema" },
      { name: "description", content: "Assista aos trailers oficiais do Homem-Aranha, Marvel e grandes lançamentos." },
      { property: "og:title", content: "Trailers oficiais — Spider Cinema" },
      { property: "og:description", content: "Trailers oficiais do Homem-Aranha, Marvel e grandes lançamentos." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <main className="mx-auto max-w-[1440px] px-4 md:px-8">
      <PageHeader eyebrow="Vídeos" title="Trailers" text="Trailers oficiais incorporados do YouTube. Clique para assistir." />
      <TrailerGrid />
    </main>
  ),
});
