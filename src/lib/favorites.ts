import { useCallback, useSyncExternalStore } from "react";

const KEY = "spider-cinema:favorites";
const EMPTY: string[] = [];
const listeners = new Set<() => void>();
let cache: string[] | null = null;

function read(): string[] {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) || "[]");
    return Array.isArray(v) ? v.filter((x) => typeof x === "string") : [];
  } catch {
    return [];
  }
}
function get() {
  if (cache === null) cache = read();
  return cache;
}
function set(next: string[]) {
  cache = next;
  localStorage.setItem(KEY, JSON.stringify(next));
  listeners.forEach((l) => l());
}
function subscribe(l: () => void) {
  listeners.add(l);
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) {
      cache = read();
      l();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(l);
    window.removeEventListener("storage", onStorage);
  };
}

export function toggleFavorite(id: string) {
  const cur = get();
  set(cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]);
}

export function useFavorites() {
  const ids = useSyncExternalStore(subscribe, get, () => EMPTY);
  const isFavorite = useCallback((id: string) => ids.includes(id), [ids]);
  return { ids, isFavorite, toggle: toggleFavorite };
}
