import { cache } from "react";
import { getSanityClient } from "@/sanity/lib/client";
import { normalizeSiteSettings } from "./settings-normalize.mjs";

export type SiteSettings = ReturnType<typeof normalizeSiteSettings>;
export const defaultSiteSettings = normalizeSiteSettings(null);

export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  const client = getSanityClient();
  if (!client) return defaultSiteSettings;
  try {
    const document = await client.fetch<unknown>(
      `*[_type == "siteSettings" && _id == "siteSettings"][0]{contactEmail, contactPhone, origin}`,
      {},
      { next: { revalidate: 60, tags: ["site-settings"] } },
    );
    return normalizeSiteSettings(document);
  } catch {
    return defaultSiteSettings;
  }
});
