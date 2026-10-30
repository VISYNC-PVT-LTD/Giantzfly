// Push the local catalog, certificates and contact defaults into Sanity.
// Usage: npm run sanity:sync            (dry run, prints the plan)
//        npm run sanity:sync -- --write (applies it)
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { createClient } from "@sanity/client";

import { products } from "../data/products.ts";
import { certificatePlaceholders } from "../data/certificates.mjs";
import { DEFAULT_SITE_SETTINGS } from "../lib/settings-normalize.mjs";

dotenv.config({ path: ".env.local", quiet: true });

const write = process.argv.includes("--write");
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: "2025-01-01",
  useCdn: false,
});

const uploaded = new Map();
const CONTENT_TYPES = { ".webp": "image/webp", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg" };

// Sanity deduplicates identical files, so re-running reuses existing assets.
async function image(publicPath) {
  if (!publicPath) return undefined;
  const fullPath = path.join(process.cwd(), "public", publicPath);
  if (!fs.existsSync(fullPath)) {
    console.warn(`  missing image ${publicPath}`);
    return undefined;
  }
  if (!uploaded.has(fullPath)) {
    for (let attempt = 1; ; attempt++) {
      try {
        const asset = await client.assets.upload("image", fs.createReadStream(fullPath), {
          filename: path.basename(fullPath),
          contentType: CONTENT_TYPES[path.extname(fullPath).toLowerCase()],
        });
        uploaded.set(fullPath, asset._id);
        break;
      } catch (error) {
        if (attempt >= 4) throw error;
        console.warn(`  retry ${attempt} ${publicPath}: ${error.code ?? error.message}`);
        await new Promise((resolve) => setTimeout(resolve, attempt * 2000));
      }
    }
  }
  return { _type: "image", asset: { _type: "reference", _ref: uploaded.get(fullPath) } };
}

const withKeys = (items) => items.map((item, i) => ({ _key: `p${i}`, ...item }));

async function productDoc(p) {
  return {
    _id: `product-${p.id}`,
    _type: "product",
    id: p.id,
    name: p.name,
    slug: { _type: "slug", current: p.slug },
    category: p.category,
    origin: p.origin,
    productionArea: p.productionArea,
    grade: p.grade,
    shortDescription: p.shortDescription,
    description: p.description,
    aboutParagraphs: p.aboutParagraphs,
    packagingOptions: p.packagingOptions,
    moq: p.moq,
    moqUnit: p.moqUnit,
    moqOptions: p.moqOptions,
    pricePerUnit: p.pricePerUnit,
    certifications: p.certifications,
    tags: p.tags,
    exportMarkets: p.exportMarkets,
    exportPotential: p.exportPotential,
    valueAddition: p.valueAddition,
    featured: p.featured,
    badge: p.badge,
    image: await image(p.image),
    imageSecondary: await image(p.imageSecondary),
  };
}

async function certificateDoc(c) {
  const [first, ...rest] = c.pages ?? [c.imageUrl];
  const pages = [];
  for (const page of rest) pages.push(await image(page));
  return {
    _id: `certificate-${c.id.replace(/^local-/, "")}`,
    _type: "certificate",
    title: c.title,
    image: await image(first),
    pages: withKeys(pages.filter(Boolean)),
    publishOnWebsite: true,
  };
}

async function main() {
  const localIds = new Set(products.map((p) => `product-${p.id}`));
  const remote = await client.fetch(`*[_type == "product"]._id`);
  const stale = remote.filter((id) => !localIds.has(id.replace(/^drafts\./, "")));

  console.log(`Products: ${products.length} local, ${remote.length} in Sanity, ${stale.length} stale`);
  console.log(`Certificates: ${certificatePlaceholders.length}`);
  console.log("Site settings:", DEFAULT_SITE_SETTINGS);
  if (stale.length) console.log("Not in local data (left untouched, remove in Studio if unwanted):", stale);
  if (!write) {
    console.log("\nDry run. Re-run with --write to apply.");
    return;
  }

  for (const p of products) {
    console.log(`product ${p.id} ${p.name}`);
    await client.createOrReplace(await productDoc(p));
  }
  for (const c of certificatePlaceholders) {
    console.log(`certificate ${c.title}`);
    await client.createOrReplace(await certificateDoc(c));
  }
  await client.createIfNotExists({ _id: "siteSettings", _type: "siteSettings", ...DEFAULT_SITE_SETTINGS });

  console.log("Sync complete.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
