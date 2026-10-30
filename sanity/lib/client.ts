import { createClient } from "next-sanity";
import { apiVersion, dataset, isSanityConfigured, projectId } from "../env";

export const client = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      perspective: "published",
      // Next's server fetch cache supplies the 60-second freshness window.
      useCdn: false,
      timeout: 8000,
      maxRetries: 0,
    })
  : null;

/** Shared by catalog, settings, reviews, and certificate loaders. Read-only, no token. */
export function getSanityClient() {
  return client;
}
