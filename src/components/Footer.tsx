import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-6 px-4 py-10 md:flex-row md:items-center md:justify-between md:px-8">
        <div className="space-y-2">
          <Logo />
          <p className="max-w-md text-sm text-muted-foreground">
            Catálogo de filmes e trailers oficiais. Não hospedamos filmes completos — assista apenas em plataformas legais.
          </p>
        </div>
        <p className="text-xs text-muted-foreground">
          Dados de filmes preparados para TMDB. Este produto usa a API do TMDB, mas não é endossado nem certificado pelo TMDB.
        </p>
      </div>
    </footer>
  );
}
