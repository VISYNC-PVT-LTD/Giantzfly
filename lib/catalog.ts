import { categories, products } from "@/data/products";
import type { ProductCategory } from "@/types";

export function getProductsByCategory(category: ProductCategory) {
  return products.filter((product) => product.category === category);
}

export function getProductBySlug(category: string, slug: string) {
  return products.find(
    (product) => product.category === category && product.slug === slug,
  );
}

export function getCategoryMeta(category: string) {
  return categories.find((item) => item.slug === category);
}