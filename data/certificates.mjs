/**
 * Public display data only.
 *
 * @typedef {{ id: string, title: string, imageUrl: string | null, pages?: ReadonlyArray<string> }} PublicCertificate
 */

/**
 * Local copies used when the CMS has no published certificates.
 * Identity documents (PAN, TAN, bank letter) are deliberately not listed.
 * @type {ReadonlyArray<PublicCertificate>}
 */
export const certificatePlaceholders = Object.freeze(
  [
    ["iec", "IEC", 1],
    ["fssai", "FSSAI", 8],
    ["gst", "GST", 3],
    ["icegate", "ICEGATE", 1],
    ["udyam", "Udyam", 3],
    ["rcmc", "RCMC", 2],
  ].map(([id, title, count]) => {
    const pages = Array.from({ length: count }, (_, i) => `/assets/certificates/web/${id}-${i + 1}.webp`);
    return Object.freeze({ id: `local-${id}`, title, imageUrl: pages[0], pages: Object.freeze(pages) });
  }),
);

// Filter before projection: never request private documents or draft/release
// versions. Do not add document numbers, asset metadata or original filenames.
export const publicCertificatesQuery = `
  *[
    _type == "certificate" &&
    publishOnWebsite == true &&
    !(_id in path("drafts.**")) &&
    !(_id in path("versions.**")) &&
    defined(title) && defined(image.asset)
  ] | order(title asc) {
    _id,
    title,
    "imageUrl": image.asset->url,
    "pageUrls": pages[].asset->url
  }
`;

/** @param {unknown} value */
function publicImageUrl(value) {
  if (typeof value !== "string") return null;
  try {
    const url = new URL(value);
    if (
      url.protocol !== "https:" ||
      url.hostname !== "cdn.sanity.io" ||
      !url.pathname.startsWith("/images/") ||
      url.username || url.password || url.port
    ) return null;
    return url.href;
  } catch {
    return null;
  }
}

/**
 * Accepts a narrow query-client interface so the privacy boundary and offline
 * fallback can be checked without connecting to Sanity.
 * @param {{ fetch: (query: string, params: Record<string, never>, options: { perspective: "published", useCdn: boolean, cache: "no-store" }) => Promise<unknown> } | null} client
 * @returns {Promise<ReadonlyArray<PublicCertificate>>}
 */
export async function loadPublicCertificates(client) {
  if (!client) return certificatePlaceholders;

  try {
    const records = await client.fetch(publicCertificatesQuery, {}, {
      perspective: "published",
      useCdn: false,
      cache: "no-store",
    });
    if (!Array.isArray(records)) return certificatePlaceholders;

    /** @type {PublicCertificate[]} */
    const certificates = records.flatMap((record) => {
      if (
        !record || typeof record._id !== "string" ||
        record._id.startsWith("drafts.") || record._id.startsWith("versions.") ||
        typeof record.title !== "string" || !record.title.trim()
      ) return [];

      const imageUrl = publicImageUrl(record.imageUrl);
      const extra = Array.isArray(record.pageUrls) ? record.pageUrls.map(publicImageUrl) : [];
      const pages = [imageUrl, ...extra].filter((url) => url !== null);
      return [{
        id: record._id,
        title: record.title.trim(),
        imageUrl,
        ...(pages.length > 1 ? { pages } : {}),
      }];
    });

    return certificates.length ? certificates : certificatePlaceholders;
  } catch {
    return certificatePlaceholders;
  }
}
