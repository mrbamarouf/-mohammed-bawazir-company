import fs from "node:fs/promises";
import path from "node:path";

async function files(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const groups = await Promise.all(
    entries.map((entry) => {
      const name = path.join(dir, entry.name);
      return entry.isDirectory() ? files(name) : [name];
    }),
  );
  return groups.flat();
}
const references = new Set();
for (const dir of ["app", "components", "content", "lib"]) {
  for (const file of await files(dir)) {
    if (!/\.(tsx?|css|json)$/.test(file)) continue;
    const text = await fs.readFile(file, "utf8");
    for (const match of text.matchAll(
      /\/assets\/[a-zA-Z0-9_./%-]+\.(?:avif|webp|png|jpe?g|gif|svg|pdf|woff2?|ttf)/g,
    ))
      references.add(match[0]);
  }
}
const derivatives = JSON.parse(
  await fs.readFile("audit/redesign/clean-assets.json", "utf8"),
);
for (const item of derivatives) references.add(item.path);
const missingFiles = [];
for (const ref of references) {
  try {
    await fs.access("public" + ref);
  } catch {
    missingFiles.push(ref);
  }
}
const stats = await Promise.all(
  (await files("public/assets")).map((file) => fs.stat(file)),
);
const report = {
  method:
    "Literal runtime references in app/components/content/lib plus every prepared derivative; all retained public assets counted separately.",
  runtimeReferences: references.size,
  missingFiles,
  assetFiles: stats.length,
  totalBytes: stats.reduce((sum, stat) => sum + stat.size, 0),
  maxFileBytes: Math.max(...stats.map((stat) => stat.size)),
};
await fs.writeFile(
  "audit/asset-validation.json",
  JSON.stringify(report, null, 2),
);
console.log(report);
if (missingFiles.length) process.exitCode = 1;
