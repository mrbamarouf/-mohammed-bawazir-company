/** Quiet, consistent navigation symbols. Direction is handled by the surrounding layout. */
export function MobileIcon({ name, className = "" }: { name: string; className?: string }) {
  const paths: Record<string, string> = {
    home: "m3 10 9-7 9 7M5 9v12h5v-7h4v7h5V9",
    products: "M5 7h14v14H5zM9 7V4h6v3M9 11v3m6-3v3",
    brands: "M4 5h7v7H4zM14 5h6v7h-6zM4 15h7v6H4zM14 15h6v6h-6z",
    more: "M4 5h3v3H4zM11 5h3v3h-3zM18 5h3v3h-3zM4 12h3v3H4zM11 12h3v3h-3zM18 12h3v3h-3zM4 19h3v2H4m7 0h3v2h-3m7-2h3v2h-3",
    about: "M5 21V7l7-4 7 4v14M3 21h18M9 9h1m4 0h1m-6 4h1m4 0h1m-5 8v-4h4v4",
    business: "M3 8h18v13H3zM8 8V4h8v4M3 13h18m-11 0v3h4v-3",
    distribution: "m3 5 6-2 6 2 6-2v16l-6 2-6-2-6 2zm6-2v16m6-14v16",
    news: "M5 3h14v18H5zM8 7h8M8 11h8m-8 4h3m2 0h3m-8 3h3m2 0h3",
    contact: "M3 6h18v13H3zm0 0 9 7 9-7",
    careers: "M8 8a4 4 0 1 0 8 0 4 4 0 0 0-8 0M5 21v-3a7 7 0 0 1 14 0v3",
    warehouse: "M3 9 12 3l9 6v12H3zm4 12v-8h10v8M7 17h10M7 9h10",
    fleet: "M2 6h12v12H2zm12 5h4l4 4v3h-8M5 18a2 2 0 1 0 4 0m8 0a2 2 0 1 0 4 0",
    space: "M4 4h16v16H4zM4 9h3M4 14h3M9 4v3m5-3v3m6 7h-3m-3 6v-3",
    outlets: "M3 9h18l-2-6H5zm1 0v12h16V9M8 21v-7h8v7M3 9a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0",
    food: "M6 5c-5 4-2 16 6 16S23 9 18 5c-2-1-4 0-6 1-2-1-4-2-6-1M12 6V2m0 3c2-3 4-3 5-3",
    beverages: "M7 7h10l-1 14H8zM6 7h12M12 7V3l5-1",
    household: "M7 8h10v13H7zM9 8V4h6v4m-3-4V2h5M10 12h4",
    'personal-care': "M6 10h5v11H6zM7 10V6h3v4m5-3h5v14h-5zm1 0V3h3v4",
    pharma: "M9 3h6v6h6v6h-6v6H9v-6H3V9h6z",
    tobacco: "M3 12h18v6H3zm13 0v6M7 9V7m4 2V5",
  };
  return <svg className={`mobile-icon ${className}`} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name] || paths.about} /></svg>;
}
