/** @typedef {import("../types/index").Product} Product */
/** @typedef {Product & {quantityAvailable?: string, pricePerUnit?: string, hsCode?: string, shelfLife?: string, leadTime?: string}} CatalogProduct */

export const PRODUCT_CATEGORIES = [
  "whole-spices", "powder-spices", "vegetables", "dry-fruits", "makhana",
  "sprouted-atta", "dehydrated-fruits", "fruit-powders", "dehydrated-vegetables",
];

/** @param {unknown} value */
function text(value) {
  return typeof value === "string" ? value.trim() : "";
}

/** @param {unknown} value @returns {string[]} */
function strings(value) {
  return Array.isArray(value) ? [...new Set(value.map(text).filter(Boolean))] : [];
}

/** @param {unknown} value */
function imageUrl(value) {
  const url = text(value);
  if (/^\/(?!\/)/.test(url)) return url;
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" && parsed.hostname === "cdn.sanity.io" ? url : "";
  } catch {
    return "";
  }
}

/** Normalize a projected Sanity document (or a local Product), without borrowing local copy.
 * @param {unknown} value
 * @returns {CatalogProduct | null}
 */
export function normalizeProduct(value) {
  if (!value || typeof value !== "object") return null;
  const doc = /** @type {Record<string, unknown>} */ (value);
  const documentId = text(doc._id);
  if (/^(drafts|versions)\./.test(documentId)) return null;
  const id = text(doc.id) || documentId;
  const slug = typeof doc.slug === "object" && doc.slug
    ? text(/** @type {{current?: unknown}} */ (doc.slug).current)
    : text(doc.slug);
  const name = text(doc.name);
  const category = text(doc.category);
  if (!id || !name || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || !PRODUCT_CATEGORIES.includes(category)) return null;

  const description = text(doc.description);
  const secondary = imageUrl(doc.imageSecondary);
  return {
    id, slug, name,
    category: /** @type {Product["category"]} */ (category),
    origin: text(doc.origin),
    grade: text(doc.grade),
    shortDescription: text(doc.shortDescription) || description,
    description,
    aboutParagraphs: strings(doc.aboutParagraphs),
    packagingOptions: strings(doc.packagingOptions),
    moq: text(doc.moq),
    moqUnit: text(doc.moqUnit),
    moqOptions: strings(doc.moqOptions),
    certifications: strings(doc.certifications),
    tags: strings(doc.tags),
    exportMarkets: strings(doc.exportMarkets),
    featured: doc.featured === true,
    image: imageUrl(doc.image) || `/assets/categories/${category}.png`,
    ...(secondary ? { imageSecondary: secondary } : {}),
    badge: text(doc.badge) || undefined,
    productionArea: text(doc.productionArea) || undefined,
    valueAddition: text(doc.valueAddition) || undefined,
    quantityAvailable: text(doc.quantityAvailable) || undefined,
    pricePerUnit: text(doc.pricePerUnit) || undefined,
    hsCode: text(doc.hsCode) || undefined,
    shelfLife: text(doc.shelfLife) || undefined,
    leadTime: text(doc.leadTime) || undefined,
    exportPotential: typeof doc.exportPotential === "number" && Number.isFinite(doc.exportPotential)
      ? Math.min(5, Math.max(1, Math.round(doc.exportPotential))) : undefined,
  };
}

/** Invalid envelopes are failures; a valid empty array is an authoritative empty catalog.
 * @param {unknown} documents
 * @returns {CatalogProduct[]}
 */
export function normalizeCatalog(documents) {
  if (!Array.isArray(documents)) throw new TypeError("Expected a catalog array");
  const ids = new Set();
  const paths = new Set();
  return documents.map(normalizeProduct).filter((product) => {
    if (!product) return false;
    const path = `${product.category}/${product.slug}`;
    if (ids.has(product.id) || paths.has(path)) return false;
    ids.add(product.id);
    paths.add(path);
    return true;
  });
}

/** Read-result boundary, with an injected fetcher so fallback behavior can be tested offline.
 * @param {(() => Promise<unknown>) | null} fetchDocuments
 * @param {Product[]} fallbackProducts
 * @returns {Promise<{products: CatalogProduct[], source: "sanity" | "unconfigured" | "unavailable"}>}
 */
export async function loadCatalog(fetchDocuments, fallbackProducts) {
  if (!fetchDocuments) return { products: fallbackProducts, source: "unconfigured" };
  try {
    return { products: normalizeCatalog(await fetchDocuments()), source: "sanity" };
  } catch {
    return { products: fallbackProducts, source: "unavailable" };
  }
}

/** @param {Product[]} products @param {string} query @returns {Product[]} */
export function searchProducts(products, query) {
  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  return products.filter((product) => {
    const haystack = [product.name, product.category.replaceAll("-", " "), product.origin, product.grade, ...product.tags].join(" ").toLowerCase();
    return terms.every((term) => haystack.includes(term));
  });
}
