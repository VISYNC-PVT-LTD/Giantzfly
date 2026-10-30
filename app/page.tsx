

import Certifications from "@/components/sections/Certifications";
import WorldMap from "@/components/sections/WorldMap";
import HomeAccordion from "@/components/sections/HomeAccordion";
// import BusinessProcess from "@/components/sections/BusinessProcess";
// import ProofRoom from "@/app/components/home/ProofRoom";
import FinalCTA from "@/components/sections/FinalCTA";
import Reviews from "@/components/sections/Reviews";
import { getPublicCertificates } from "@/lib/certificates";

export default async function HomePage() {
  const certificates = await getPublicCertificates();

  return (
    <>
      <section className="page-hero page-hero--image">
        <div className="page-hero__media" aria-hidden="true">
          <div className="page-hero__bg" />
          <div className="page-hero__overlay" />
        </div>
        <div className="container page-hero__shell">
          <div className="page-hero__content">
            <span className="eyebrow page-hero__eyebrow">B2B Export Catalog, India</span>
            <h1 className="page-hero__title">
              From Indian Origins{" "}
              <br />
              to Global Markets.
            </h1>
            <p className="page-hero__text">
              Farm-direct. Lab-certified. Export-ready for your shelf. We supply
              Indian spices, makhana, and dry fruits to importers, distributors,
              supermarket buyers, and sourcing teams.
            </p>
          </div>
        </div>
      </section>
      <HomeAccordion />
      <Certifications certificates={certificates} />
      <WorldMap />
      {/* <ProofRoom /> */}
      {/* <BusinessProcess /> */}
      <FinalCTA />
      <Reviews />
    </>
  );
}
