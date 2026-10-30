// Public configuration only. Missing configuration must not break an offline build.
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION?.trim() || "2026-06-16";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() || "";
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim() || "";

export const isSanityConfigured =
  /^[a-z0-9]+$/.test(projectId) &&
  /^[a-z0-9][a-z0-9_-]*$/.test(dataset) &&
  /^\d{4}-\d{2}-\d{2}$/.test(apiVersion);
