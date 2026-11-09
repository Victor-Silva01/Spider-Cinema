import { Link } from "@tanstack/react-router";

export function SpiderIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <ellipse cx="16" cy="12" rx="3" ry="3.2" fill="currentColor" stroke="none" />
      <path d="M16 15.5c-3 0-4.2 2.6-4.2 5.4S13.6 27 16 27s4.2-3.2 4.2-6.1-1.2-5.4-4.2-5.4Z" fill="currentColor" stroke="none" />
      <path d="M13.5 11 9 6 6 7M18.5 11 23 6l3 1M12.5 14 6 12.5 3 15M19.5 14l6.5-1.5 3 2.5M12 18l-6 2-2 4M20 18l6 2 2 4M12.5 21.5 8 25l-1 4M19.5 21.5 24 25l1 4" />
    </svg>
  );
}

export function Logo() {
  return (
    <Link to="/" className="group flex items-center gap-2 rounded-md focus-visible:outline-2 focus-visible:outline-ring" aria-label="Spider Cinema — início">
      <SpiderIcon className="h-8 w-8 text-primary transition-transform duration-500 group-hover:rotate-[20deg]" />
      <span className="font-display text-2xl leading-none tracking-wide">
        SPIDER<span className="text-primary">CINEMA</span>
      </span>
    </Link>
  );
}
