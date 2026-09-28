import fs from "node:fs/promises";
import sharp from "sharp";
const brands = JSON.parse(await fs.readFile("content/brands.json"));
const all = JSON.parse(await fs.readFile("audit/redesign/clean-assets.json"));
for (const [name, items] of [
  [
    "brands",
    brands
      .filter((b) => b.image)
      .map((b) => ({ path: b.image, title: b.slug })),
  ],
  [
    "products",
    all
      .filter((a) => a.path.includes("/products/"))
      .map((a) => ({ ...a, title: a.source.split("/").pop() })),
  ],
]) {
  for (let k = 0; k < items.length; k += 60) {
    const cells = [];
    const count = Math.min(60, items.length - k);
    for (let i = 0; i < count; i++) {
      const x = (i % 6) * 220,
        y = Math.floor(i / 6) * 165;
      const a = items[k + i];
      const b = await sharp("public" + a.path)
        .resize(196, 125, { fit: "inside", withoutEnlargement: true })
        .toBuffer({ resolveWithObject: true });
      cells.push({
        input: b.data,
        left: x + Math.floor((220 - b.info.width) / 2),
        top: y + Math.floor((125 - b.info.height) / 2),
      });
      const text =
        String(k + i) + " " + a.title.slice(0, 28).replace(/[<&]/g, "");
      cells.push({
        input: Buffer.from(
          `<svg width="220" height="30"><text x="5" y="20" font-size="12">${text}</text></svg>`,
        ),
        left: x,
        top: y + 128,
      });
    }
    await sharp({
      create: {
        width: 1320,
        height: Math.ceil(count / 6) * 165,
        channels: 4,
        background: "#d6dbd7",
      },
    })
      .composite(cells)
      .jpeg({ quality: 90 })
      .toFile(`audit/redesign/clean-${name}-${k / 60}.jpg`);
  }
}
