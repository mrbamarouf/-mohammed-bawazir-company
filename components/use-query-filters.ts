"use client";
import { useSyncExternalStore } from "react";

// Safari limits History API writes. Keep selections immediate, but coalesce URL
// writes; Next.js also synchronizes each native write with its router state.
let pending: URL | null = null;
let timer: ReturnType<typeof setTimeout> | null = null;
let lastWrite = 0;
const notify = () => window.dispatchEvent(new Event("mbt-filters"));
export const querySearch = () => pending?.pathname === window.location.pathname
  ? pending.search : window.location.search;
const cancelPending = () => {
  if (timer) clearTimeout(timer);
  timer = null;
  pending = null;
};
const commit = () => {
  timer = null;
  const next = pending;
  pending = null;
  if (next?.pathname === window.location.pathname) {
    window.history.replaceState(null, "", next.pathname + next.search + next.hash);
    lastWrite = Date.now();
  }
  notify();
};
const subscribe = (callback: () => void) => {
  const onHistory = () => { cancelPending(); callback(); };
  const onNavigate = (event: MouseEvent) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>("a[href]") : null;
    if (!link || link.hasAttribute("download") || (link.target && link.target !== "_self")) return;
    const destination = new URL(link.href);
    if (destination.origin === window.location.origin &&
      (destination.pathname !== window.location.pathname || destination.search !== window.location.search)) cancelPending();
  };
  // Run after React's link handler has consumed the pending query. A delayed
  // replaceState must not cancel an in-flight route change on a slow network.
  window.addEventListener("click", onNavigate);
  window.addEventListener("popstate", onHistory);
  window.addEventListener("mbt-filters", callback);
  return () => {
    window.removeEventListener("click", onNavigate);
    window.removeEventListener("popstate", onHistory);
    window.removeEventListener("mbt-filters", callback);
  };
};
const serverSnapshot = () => "";
/** URL-backed filters survive language changes, refreshes and shared links. */
export function useQueryFilters(defaults: Record<string, string> = {}) {
  const query = useSyncExternalStore(subscribe, querySearch, serverSnapshot);
  const params = new URLSearchParams(query);
  const get = (key: string) => params.get(key) ?? defaults[key] ?? "";
  const update = (values: Record<string, string>) => {
    const url = new URL(window.location.href);
    url.search = querySearch();
    for (const [key, value] of Object.entries(values)) {
      if (value && value !== defaults[key]) url.searchParams.set(key, value);
      else url.searchParams.delete(key);
    }
    if (url.search === querySearch()) return;
    pending = url;
    if (timer) clearTimeout(timer);
    const delay = Math.max(0, 300 - (Date.now() - lastWrite));
    if (delay) { timer = setTimeout(commit, delay); notify(); }
    else commit();
  };
  return { get, update };
}
