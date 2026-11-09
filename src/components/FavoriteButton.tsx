import { Heart } from "lucide-react";
import { useFavorites } from "@/lib/favorites";

export function FavoriteButton({ id, variant = "icon" }: { id: string; variant?: "icon" | "full" }) {
  const { isFavorite, toggle } = useFavorites();
  const fav = isFavorite(id);
  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(id);
  };
  if (variant === "full")
    return (
      <button onClick={onClick} aria-pressed={fav} className="inline-flex h-12 items-center gap-2 rounded-lg border border-foreground/30 px-5 text-sm font-semibold transition hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-ring">
        <Heart className={`h-5 w-5 ${fav ? "fill-spider text-spider" : ""}`} />
        {fav ? "Remover dos favoritos" : "Adicionar aos favoritos"}
      </button>
    );
  return (
    <button onClick={onClick} aria-pressed={fav} aria-label={fav ? "Remover dos favoritos" : "Adicionar aos favoritos"} className="grid h-9 w-9 place-items-center rounded-full bg-background/70 backdrop-blur transition hover:scale-110 focus-visible:outline-2 focus-visible:outline-ring">
      <Heart className={`h-4 w-4 ${fav ? "fill-spider text-spider" : ""}`} />
    </button>
  );
}
