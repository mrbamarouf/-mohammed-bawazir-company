"use client";
import { useSyncExternalStore } from "react";
const subscribe = (callback: () => void) => {
  window.addEventListener("popstate", callback);
  window.addEventListener("mbt-filters", callback);
  return () => { window.removeEventListener("popstate", callback); window.removeEventListener("mbt-filters", callback); };
};
const snapshot = () => window.location.search;
const serverSnapshot = () => "";
/** URL-backed filters survive language changes, refreshes and shared links. */
export function useQueryFilters(defaults: Record<string, string> = {}) {
  const query = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  const params = new URLSearchParams(query);
  const get = (key: string) => params.get(key) ?? defaults[key] ?? "";
  const update = (values: Record<string, string>) => {
    const url = new URL(window.location.href);
    for (const [key, value] of Object.entries(values)) {
      if (value && value !== defaults[key]) url.searchParams.set(key, value);
      else url.searchParams.delete(key);
    }
    window.history.replaceState(null, "", url.pathname + url.search + url.hash);
    window.dispatchEvent(new Event("mbt-filters"));
  };
  return { get, update };
}
