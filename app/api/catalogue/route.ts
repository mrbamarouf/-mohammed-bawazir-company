import { products } from "@/lib/data";
import { catalogueResult } from "@/lib/catalogue";
export function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const requestedLimit = Number(params.get("limit") || 24);
  const limit = Number.isFinite(requestedLimit) ? Math.max(24, Math.min(408, requestedLimit)) : 24;
  return Response.json(catalogueResult(products, { q: (params.get("q") || "").slice(0, 200), brand: params.get("brand") || "", division: params.get("division") || "", category: params.get("category") || "", limit }), { headers: { "Cache-Control": "public, max-age=60, s-maxage=3600" } });
}
