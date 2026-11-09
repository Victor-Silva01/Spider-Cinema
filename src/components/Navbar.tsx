import { Link, useNavigate } from "@tanstack/react-router";
import { Heart, Menu, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { useFavorites } from "@/lib/favorites";

const links = [
  { to: "/", label: "Início" },
  { to: "/filmes", label: "Filmes" },
  { to: "/series", label: "Séries" },
  { to: "/universo-aranha", label: "Universo Aranha" },
  { to: "/trailers", label: "Trailers" },
  { to: "/favoritos", label: "Favoritos" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const { ids } = useFavorites();

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setOpen(false);
    navigate({ to: "/filmes", search: { q: q.trim() || undefined } });
  };

  return (
    <header className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${scrolled || open ? "border-b border-border bg-background/75 backdrop-blur-xl" : "bg-gradient-to-b from-background/90 to-transparent"}`}>
      <nav className="mx-auto flex h-16 max-w-[1440px] items-center gap-6 px-4 md:px-8">
        <Logo />
        <ul className="ml-4 hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                className="relative rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring data-[status=active]:text-primary data-[status=active]:after:absolute data-[status=active]:after:inset-x-3 data-[status=active]:after:-bottom-0.5 data-[status=active]:after:h-0.5 data-[status=active]:after:bg-primary"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="ml-auto flex items-center gap-2">
          <form onSubmit={submit} className="relative hidden md:block" role="search">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar filmes, atores, diretores..."
              aria-label="Buscar"
              className="h-10 w-64 rounded-lg border border-input bg-card/60 pl-3 pr-10 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none xl:w-72"
            />
            <button type="submit" aria-label="Pesquisar" className="absolute right-1 top-1 grid h-8 w-8 place-items-center rounded-md text-muted-foreground hover:text-primary">
              <Search className="h-4 w-4" />
            </button>
          </form>
          <Link to="/favoritos" aria-label={`Favoritos (${ids.length})`} className="relative grid h-10 w-10 place-items-center rounded-full hover:bg-accent focus-visible:outline-2 focus-visible:outline-ring">
            <Heart className="h-5 w-5" />
            {ids.length > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">{ids.length}</span>
            )}
          </Link>
          <button onClick={() => setOpen((o) => !o)} aria-label={open ? "Fechar menu" : "Abrir menu"} aria-expanded={open} className="grid h-10 w-10 place-items-center rounded-full hover:bg-accent lg:hidden">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>
      {open && (
        <div className="animate-rise border-t border-border px-4 pb-6 pt-4 lg:hidden">
          <form onSubmit={submit} className="relative mb-4 md:hidden" role="search">
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar..." aria-label="Buscar" className="h-11 w-full rounded-lg border border-input bg-card pl-3 pr-10 text-sm focus:border-primary focus:outline-none" />
            <button type="submit" aria-label="Pesquisar" className="absolute right-2 top-2.5 text-muted-foreground"><Search className="h-5 w-5" /></button>
          </form>
          <ul className="grid gap-1">
            {links.map((l) => (
              <li key={l.to}>
                <Link to={l.to} onClick={() => setOpen(false)} activeOptions={{ exact: l.to === "/" }} className="block rounded-lg px-3 py-3 text-base hover:bg-accent data-[status=active]:text-primary">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
