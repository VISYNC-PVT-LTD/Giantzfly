import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { createClient } from "@sanity/client";

dotenv.config({ path: ".env.local" });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: "2025-01-01",
  useCdn: false,
});

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function parseReviews(raw) {
  return raw
    .split(/^---$/m)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => {
      const review = {};
      for (const line of block.split("\n")) {
        if (!line.trim() || line.trim().startsWith("#")) continue;
        const idx = line.indexOf(":");
        if (idx === -1) continue;
        const key = line.slice(0, idx).trim();
        const value = line.slice(idx + 1).trim();
        review[key] = value;
      }
      return review;
    })
    .filter((r) => r.name && r.text);
}

async function upload() {
  const filePath = path.join(process.cwd(), "data", "reviews.txt");
  const raw = fs.readFileSync(filePath, "utf-8");
  const reviews = parseReviews(raw);

  console.log(`Found ${reviews.length} review(s) in data/reviews.txt`);

  for (const [i, r] of reviews.entries()) {
    const id = `review-${slugify(r.name)}-${i}`;
    console.log(`Uploading ${id} (${r.name})`);

    await client.createOrReplace({
      _id: id,
      _type: "review",
      name: r.name,
      company: r.company || "",
      country: r.country || "",
      rating: r.rating ? Number(r.rating) : 5,
      text: r.text,
      date: r.date || new Date().toISOString().slice(0, 10),
    });
  }

  console.log("Done.");
}

upload().catch(console.error);
