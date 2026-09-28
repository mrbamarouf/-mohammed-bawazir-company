/** Faithful source-pixel preparation requested by the owner. No logo redraw, generative fill or upscale. */
import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
const read = async (p) => JSON.parse(await fs.readFile(p, "utf8"));
const brands = await read("audit/redesign/source-brands.json"),
  products = await read("audit/redesign/source-products.json"),
  candidates = await read("audit/redesign/logo-candidates.json");
const manifest = [];
const out = "public/assets/clean";
await fs.mkdir(out + "/brands", { recursive: true });
await fs.mkdir(out + "/products", { recursive: true });
async function clean(src, dest, crop, threshold = 245) {
  let im = sharp(src).ensureAlpha();
  if (crop) im = im.extract(crop);
  const { data, info } = await im.raw().toBuffer({ resolveWithObject: true });
  const { width: w, height: h } = info;
  if (dest.endsWith("bull-dose.webp")) {
    threshold = 235;
    // The published logo sits inside a decorative circle. These lower corners
    // contain only that old frame; the inspected bull artwork ends centrally.
    for (let y = 0; y < h; y++)
      for (let x = 0; x < w; x++)
        if (y > 140 && (x < 42 || x > 139)) data[(y * w + x) * 4 + 3] = 0;
  }

  // Only remove near-white pixels reachable from the perimeter. Internal white lettering/packaging survives.
  const seen = new Uint8Array(w * h),
    queue = new Int32Array(w * h);
  let start = 0,
    end = 0;
  const add = (i) => {
    if (seen[i]) return;
    seen[i] = 1;
    const j = i * 4;
    if (
      data[j + 3] < 12 ||
      (data[j] >= threshold &&
        data[j + 1] >= threshold &&
        data[j + 2] >= threshold)
    ) {
      queue[end++] = i;
    }
  };
  for (let x = 0; x < w; x++) {
    add(x);
    add((h - 1) * w + x);
  }
  for (let y = 0; y < h; y++) {
    add(y * w);
    add(y * w + w - 1);
  }
  while (start < end) {
    const i = queue[start++];
    data[i * 4 + 3] = 0;
    const x = i % w,
      y = Math.floor(i / w);
    if (x) add(i - 1);
    if (x < w - 1) add(i + 1);
    if (y) add(i - w);
    if (y < h - 1) add(i + w);
  }
  let l = w,
    t = h,
    r = 0,
    b = 0;
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++)
      if (data[(y * w + x) * 4 + 3] > 12) {
        l = Math.min(l, x);
        r = Math.max(r, x);
        t = Math.min(t, y);
        b = Math.max(b, y);
      }
  if (l >= r || t >= b) throw new Error("Empty cutout " + src);
  // Keep original pixels, modest transparent safety margin; never resample/upscale.
  await sharp(data, { raw: info })
    .extract({ left: l, top: t, width: r - l + 1, height: b - t + 1 })
    .extend({
      top: 6,
      bottom: 6,
      left: 6,
      right: 6,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .webp({ lossless: true })
    .toFile(dest);
  const m = await sharp(dest).metadata();
  manifest.push({
    source: src,
    path: dest.replace(/^public/, ""),
    width: m.width,
    height: m.height,
    crop: crop || null,
    removedEdgePixels: end,
    method:
      "edge-connected near-white alpha; original RGB pixels preserved; no upscaling",
  });
  return dest.replace(/^public/, "");
}
const rect = (left, top, width, height) => ({ left, top, width, height });
// Coordinates reviewed against official originals; old decorative website frames are excluded.
const specs = {
  reem: [171],
  "catch-me": [175],
  "tropicana-slim": [
    "public/assets/company/d1771fc-tspic.jpeg",
    rect(20, 20, 296, 216),
  ],
  wings: ["public/assets/company/cd35186-2-1.jpg", rect(20, 20, 296, 216)],
  lool: ["public/assets/brands/3bb7aa5-client1.png", rect(20, 20, 296, 216)],
  fantastic: [
    "public/assets/brands/082dec5-clientFantastic.png",
    rect(20, 20, 296, 216),
  ],
  nutrisari: ["public/assets/company/723afae-NS.jpg", rect(36, 86, 192, 88)],
  "bull-dose": ["public/assets/company/c3331dd-BD.jpg", rect(46, 46, 176, 166)],
  mayora: [35, rect(44, 46, 174, 133)],
  anchor: ["public/assets/brands/a7035bd-cleint5.png", rect(20, 20, 296, 216)],
  "ali-cafe": [
    "public/assets/brands/a687e86-client6.png",
    rect(20, 20, 296, 216),
  ],
  delicio: [100],
  "al-ghurair": [172],
  mdsf: ["public/assets/company/d652dc8-3.png", rect(165, 165, 180, 165)],
  reckitt: ["public/assets/company/91237ec-2.png", rect(131, 171, 252, 145)],
  mymi: [34, rect(35, 70, 198, 120)],
  axis: [27, rect(47, 64, 180, 125)],
  bright: [177],
  "indo-coal": ["public/assets/company/98c5ac2-4.jpg", rect(20, 20, 296, 216)],
  falcon: ["public/assets/company/6252b22-3.jpg", rect(20, 20, 296, 216)],
  "golden-coal": [
    "public/assets/brands/71cd3a6-clientbig6.png",
    rect(20, 20, 296, 216),
  ],
  "tropicana-coal": [
    "public/assets/brands/0149dea-client14.png",
    rect(20, 20, 296, 216),
  ],
};
for (const b of brands) {
  if (b.slug === "medcity") {
    b.image = "";
    continue;
  } // Existing file says Madinat Dawaa, not Medcity; conflicting source artwork withheld.
  let [src, crop] = specs[b.slug] || [b.image ? "public" + b.image : ""];
  if (typeof src === "number") src = candidates[src].path;
  if (!src) continue;
  const meta = await sharp(src).metadata();
  if (
    !crop &&
    b.image &&
    !(b.slug in specs) &&
    meta.width === 336 &&
    meta.height === 256
  )
    crop = rect(20, 20, 296, 216);
  b.image = await clean(src, out + "/brands/" + b.slug + ".webp", crop);
}
const extras = [
  ["elmore", "Elmore", "إلمور", "personal-care", 173],
  ["viva", "Viva", "فيفا", "beverages", 29, rect(39, 74, 190, 114)],
  ["exotica", "Exotica", "إكزوتيكا", "beverages", 86],
  ["tiger-pro", "Tiger Pro", "تايجر برو", "beverages", 87],
  ["alkareem", "Al Kareem", "الكريم", "food", 178],
];
for (const [slug, en, ar, division, i, crop] of extras) {
  brands.push({
    slug,
    name: { en, ar },
    division,
    image: await clean(
      candidates[i].path,
      out + "/brands/" + slug + ".webp",
      crop,
    ),
    source:
      "https://www.mbtksa.com/about-us-2/our-company/iconic-brand-history/",
    categoryIds: [],
    description: {
      en: "Brand artwork preserved in MBT’s published portfolio and historical media. Contact MBT for current availability.",
      ar: "علامة محفوظة ضمن محفظة MBT وموادها التاريخية المنشورة. للتوافر الحالي، يرجى التواصل مع الشركة.",
    },
  });
}
// Authentic group wordmarks already have transparent originals. Preserve the official MBT cartouche.
await fs.mkdir(out + "/company", { recursive: true });
await sharp(candidates[55].path)
  .trim({ threshold: 2 })
  .png()
  .toFile(out + "/company/mbt.png");
for (const [name, i] of [
  ["promo", 54],
  ["whitegate", 53],
  ["mbtech", 44],
])
  await clean(candidates[i].path, out + "/company/" + name + ".webp");
const map = {};
for (const p of products) {
  if (!p.image || map[p.image]) continue;
  const src = "public" + p.image;
  const hash = crypto
    .createHash("sha1")
    .update(p.image)
    .digest("hex")
    .slice(0, 12);
  try {
    const m = await sharp(src).metadata();
    if (!m.width || !m.height) continue;
    if (src.includes("f52765c-")) {
      const dest = out + "/products/" + hash + ".webp";
      await sharp(src).webp({ lossless: true }).toFile(dest);
      map[p.image] = dest.replace(/^public/, "");
      manifest.push({
        source: src,
        path: map[p.image],
        width: m.width,
        height: m.height,
        method:
          "Original retained: near-white packaging cannot be separated safely",
      });
    } else map[p.image] = await clean(src, out + "/products/" + hash + ".webp");
  } catch (e) {
    console.log("Kept original:", src, e.message);
  }
}
for (const p of products) {
  if (map[p.image]) {
    p.originalImage = p.image;
    p.image = map[p.image];
  }
}
// Larger source-native Reem packshots for the homepage shelf; do not blow up 300px WordPress previews.
for (const i of [145, 147, 148, 149, 151, 152, 153, 163])
  await clean(candidates[i].path, out + "/products/reem-" + i + ".webp");
await fs.writeFile("content/brands.json", JSON.stringify(brands, null, 2));
await fs.writeFile("content/products.json", JSON.stringify(products, null, 2));
await fs.writeFile(
  "audit/redesign/clean-assets.json",
  JSON.stringify(manifest, null, 2),
);
console.log(
  "Prepared",
  manifest.length,
  "assets;",
  brands.length,
  "brands;",
  products.length,
  "product records preserved",
);
