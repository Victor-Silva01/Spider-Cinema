import { X } from "lucide-react";
import { useEffect, useRef } from "react";

export function TrailerModal({ videoId, title, onClose }: { videoId: string | null; title: string; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!videoId) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [videoId, onClose]);
  if (!videoId) return null;
  return (
    <div role="dialog" aria-modal="true" aria-label={`Trailer: ${title}`} className="fixed inset-0 z-50 grid place-items-center bg-background/90 p-4 backdrop-blur-md animate-in fade-in" onClick={onClose}>
      <div className="w-full max-w-5xl animate-in zoom-in-95" onClick={(e) => e.stopPropagation()}>
        <div className="mb-3 flex items-center justify-between">
          <p className="font-semibold">{title} <span className="text-muted-foreground">— trailer oficial</span></p>
          <button ref={closeRef} onClick={onClose} aria-label="Fechar trailer" className="grid h-10 w-10 place-items-center rounded-full bg-card hover:bg-accent focus-visible:outline-2 focus-visible:outline-ring">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="aspect-video overflow-hidden rounded-xl ring-1 ring-border">
          <iframe className="h-full w-full" src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`} title={`Trailer de ${title}`} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen />
        </div>
      </div>
    </div>
  );
}
