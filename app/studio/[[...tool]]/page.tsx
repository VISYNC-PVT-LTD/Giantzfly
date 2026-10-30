/**
 * This route is responsible for the built-in authoring environment using Sanity Studio.
 * All routes under your studio path is handled by this file using Next.js' catch-all routes:
 * https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes
 *
 * You can learn more about the next-sanity package here:
 * https://github.com/sanity-io/next-sanity
 */

import { NextStudio } from "next-sanity/studio";
import config from "../../../sanity.config";
import { isSanityConfigured } from "@/sanity/env";
import Link from "next/link";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  if (!isSanityConfigured) {
    return (
      <main className="container section">
        <h1>Sanity Studio needs configuration</h1>
        <p>Set NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET in your deployment environment, then restart or redeploy.</p>
        <p>The website is currently using its local catalog and contact defaults.</p>
        <Link href="/admin" className="btn btn-primary">View setup details</Link>
      </main>
    );
  }
  return <NextStudio config={config} />;
}
