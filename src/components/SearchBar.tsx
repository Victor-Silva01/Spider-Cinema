import { Search, X } from "lucide-react";

export function SearchBar({ value, onChange, onSubmit, autoFocus }: { value: string; onChange: (v: string) => void; onSubmit?: () => void; autoFocus?: boolean }) {
  return (
    <form role="search" onSubmit={(e) => { e.preventDefault(); onSubmit?.(); }} className="relative">
      <input
        autoFocus={autoFocus}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Digite o nome do filme, ator ou diretor..."
        aria-label="Pesquisar por título"
        className="h-12 w-full rounded-lg border border-input bg-background/60 pl-4 pr-20 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none"
      />
      {value && (
        <button type="button" onClick={() => onChange("")} aria-label="Limpar pesquisa" className="absolute right-11 top-3.5 text-muted-foreground hover:text-foreground"><X className="h-5 w-5" /></button>
      )}
      <button type="submit" aria-label="Pesquisar" className="absolute right-1.5 top-1.5 grid h-9 w-9 place-items-center rounded-md text-muted-foreground hover:bg-accent hover:text-primary">
        <Search className="h-5 w-5" />
      </button>
    </form>
  );
}
