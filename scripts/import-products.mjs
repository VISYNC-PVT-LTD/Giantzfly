import fs from "fs";
import path from "path";
import mime from "mime";
import { createClient } from "@sanity/client";

import { products } from "../data/products.ts";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: "2025-01-01",
  useCdn: false,
});

async function uploadImage(imagePath) {
  const fullPath = path.join(process.cwd(), "public", imagePath);

  if (!fs.existsSync(fullPath)) {
    console.log(`Missing image: ${fullPath}`);
    return null;
  }

  const asset = await client.assets.upload(
    "image",
    fs.createReadStream(fullPath),
    {
      filename: path.basename(fullPath),
      contentType: mime.getType(fullPath),
    },
  );

  return {
    _type: "image",
    asset: {
      _type: "reference",
      _ref: asset._id,
    },
  };
}

async function migrate() {
  for (const product of products) {
    console.log(`Importing ${product.name}`);

    let imageField = null;

    if (product.image) {
      imageField = await uploadImage(product.image);
    }

    await client.createOrReplace({
      _id: `product-${product.id}`,
      _type: "product",

      id: product.id,
      name: product.name,

      slug: {
        _type: "slug",
        current: product.slug,
      },

      category: product.category,
      origin: product.origin,
      grade: product.grade,

      shortDescription: product.shortDescription,
      description: product.description,

      packagingOptions: product.packagingOptions,

      moq: product.moq,
      moqUnit: product.moqUnit,

      certifications: product.certifications,
      tags: product.tags,
      exportMarkets: product.exportMarkets,

      featured: product.featured,
      badge: product.badge,

      image: imageField,
    });
  }

  console.log("Migration complete");
}

migrate().catch(console.error);