import { allGenres, allYears } from "@/data/movies";

export type FilterValues = { genre?: string | undefined; year?: number | undefined; rating?: number | undefined };

const sel = "h-11 w-full appearance-none rounded-lg border border-input bg-card px-3 text-sm focus:border-primary focus:outline-none";

export function MovieFilters({ value, onChange }: { value: FilterValues; onChange: (v: FilterValues) => void }) {
  return (
    <div className="grid grid-cols-3 gap-3">
      <label className="space-y-1.5 text-sm font-medium">
        Gênero
        <select className={sel} value={value.genre ?? ""} onChange={(e) => onChange({ ...value, genre: e.target.value || undefined })}>
          <option value="">Todos</option>
          {allGenres.map((g) => <option key={g}>{g}</option>)}
        </select>
      </label>
      <label className="space-y-1.5 text-sm font-medium">
        Ano
        <select className={sel} value={value.year ?? ""} onChange={(e) => onChange({ ...value, year: e.target.value ? Number(e.target.value) : undefined })}>
          <option value="">Todos</option>
          {allYears.map((y) => <option key={y}>{y}</option>)}
        </select>
      </label>
      <label className="space-y-1.5 text-sm font-medium">
        Avaliação
        <select className={sel} value={value.rating ?? ""} onChange={(e) => onChange({ ...value, rating: e.target.value ? Number(e.target.value) : undefined })}>
          <option value="">Todas</option>
          {[9, 8, 7, 6].map((r) => <option key={r} value={r}>{r}+</option>)}
        </select>
      </label>
    </div>
  );
}
