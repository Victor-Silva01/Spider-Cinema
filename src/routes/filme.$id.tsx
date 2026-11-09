import { createFileRoute, notFound } from "@tanstack/react-router";
import { MovieDetails } from "@/components/MovieDetails";
import { getMovie } from "@/data/movies";

export const Route = createFileRoute("/filme/$id")({
  loader: ({ params }) => {
    const movie = getMovie(params.id);
    if (!movie) throw notFound();
    return { movie };
  },
  head: ({ loaderData }) => {
    const m = loaderData?.movie;
    const title = m ? `${m.title} (${m.year}) — Spider Cinema` : "Título não encontrado — Spider Cinema";
    const desc = m?.synopsis ?? "Este título não está no catálogo.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "video.movie" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: () => {
    const { movie } = Route.useLoaderData();
    return <main><MovieDetails key={movie.id} movie={movie} /></main>;
  },
});
