import Link from "next/link";
import { isSanityConfigured } from "@/sanity/env";

export const metadata = {
  title: "Content management",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <main className="container section">
      <p className="eyebrow">Giantzfly / content management</p>
      <h1>Manage the catalog and contact details</h1>
      <p>Editing takes place in Sanity Studio. Sign in with a Sanity account that has access to this project.</p>

      {!isSanityConfigured ? (
        <section className="section">
          <h2>Setup required</h2>
          <p>The site is using the local catalog and default contact details because Sanity configuration is missing or invalid.</p>
          <ol>
            <li>Set <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> and <code>NEXT_PUBLIC_SANITY_DATASET</code> to your existing Sanity project and dataset.</li>
            <li>Restart the development server or redeploy after changing environment variables.</li>
            <li>Allow this site&apos;s origin in your Sanity project&apos;s CORS settings for authenticated Studio access.</li>
            <li>Open Studio and sign in using your authorized Sanity account.</li>
          </ol>
        </section>
      ) : (
        <p>Sanity configuration is present. Studio will verify your account and project access when you sign in.</p>
      )}

      <section className="section">
        <h2>Open Sanity Studio</h2>
        <ul>
          <li><Link href="/studio/structure/products">Products — add, edit, publish or unpublish export lines</Link></li>
          <li><Link href="/studio/structure/siteSettings">Contact &amp; site settings — email, phone / WhatsApp and business location</Link></li>
          <li><Link href="/studio/structure/certificates">Certificates — manage certificate documents</Link></li>
          <li><Link href="/studio/structure/reviews">Reviews — manage buyer feedback</Link></li>
        </ul>
        <p>Publish changes in Studio to make them public. The website refreshes published content on an approximately 60-second server revalidation cycle; refresh again after that window if needed.</p>
        <p>Draft products are not public. A successfully loaded empty CMS catalog stays empty; local products are used only when Sanity is unconfigured or unavailable.</p>
        <Link href="/products" className="btn btn-secondary">View the public catalog</Link>
      </section>
    </main>
  );
}
