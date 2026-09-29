import geometry from "@/content/saudi-geometry.json";

// One unchanged geographic dataset and projection for both compositions.
// Preserve every polygon/ring, including the coastal islands.
export const saudiViewBox = { x: -45, y: 0, width: 790, height: 650 };
export const projectSaudi = (lon: number, lat: number) => [
  (lon - 34) * 32,
  (33 - lat) * 34,
];
export const saudiPaths = geometry.coordinates.map(polygon => polygon.map(ring =>
  ring.map(([lon, lat], i) => `${i ? "L" : "M"}${projectSaudi(lon, lat).map(v => v.toFixed(1)).join(",")}`).join(" ") + "Z",
).join(" "));
