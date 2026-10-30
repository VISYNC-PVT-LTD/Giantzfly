import { cache } from "react";
import { categories, products as localProducts } from "@/data/products";
import { getSanityClient } from "@/sanity/lib/client";
import { allProductsQuery } from "@/sanity/lib/queries";
import { loadCatalog } from "./catalog-normalize.mjs";

export type CatalogProduct = Awaited<ReturnType<typeof loadCatalog>>["products"][number];

export type CatalogResult = {
  products: CatalogProduct[];
  source: "sanity" | "unconfigured" | "unavailable";
};

// React cache deduplicates reads within a render. Next fetch revalidates across requests.
export const getCatalog = cache(async (): Promise<CatalogResult> => {
  const client = getSanityClient();
  // A successful CMS response is authoritative, including an empty array.
  return loadCatalog(client ? () => client.fetch<unknown>(allProductsQuery, {}, {
    next: { revalidate: 60, tags: ["products"] },
  }) : null, localProducts);
});

export async function getProducts() {
  return (await getCatalog()).products;
}

export async function getProductsByCategory(category: string) {
  return (await getProducts()).filter((product) => product.category === category);
}

export async function getProductBySlug(category: string, slug: string) {
  return (await getProducts()).find(
    (product) => product.category === category && product.slug === slug,
  );
}

export async function getRelatedProducts(category: string, slug: string, limit = 3) {
  return (await getProductsByCategory(category))
    .filter((product) => product.slug !== slug).slice(0, limit);
}

export function getCategoryMeta(category: string) {
  return categories.find((item) => item.slug === category);
}

export { categories };
export { searchProducts } from "./catalog-normalize.mjs";
