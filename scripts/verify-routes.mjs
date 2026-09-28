import fs from "node:fs/promises";
const manifest = JSON.parse(await fs.readFile(".next/prerender-manifest.json"));
const routes = Object.keys(manifest.routes).filter(
  (r) => r.startsWith("/en") || r.startsWith("/ar"),
);
let next = 0;
const failures = [];
await Promise.all(
  Array.from({ length: 5 }, async () => {
    while (next < routes.length) {
      const route = routes[next++];
      const response = await fetch("http://localhost:3001" + route);
      if (!response.ok) failures.push({ route, status: response.status });
      await response.arrayBuffer();
    }
  }),
);
await fs.writeFile(
  "audit/redesign/route-check.json",
  JSON.stringify({ routes: routes.length, failures }, null, 2),
);
console.log(routes.length, "bilingual routes;", failures.length, "failures");
