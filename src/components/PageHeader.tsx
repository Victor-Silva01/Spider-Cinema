export function PageHeader({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <header className="mb-10 animate-rise space-y-2 pt-28">
      <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">{eyebrow}</p>
      <h1 className="font-display text-4xl uppercase tracking-wide sm:text-5xl md:text-6xl">{title}</h1>
      <p className="max-w-2xl text-muted-foreground">{text}</p>
    </header>
  );
}
