import "server-only";

import { loadPublicCertificates } from "@/data/certificates.mjs";
import { getSanityClient } from "@/sanity/lib/client";

export function getPublicCertificates() {
  return loadPublicCertificates(getSanityClient());
}
