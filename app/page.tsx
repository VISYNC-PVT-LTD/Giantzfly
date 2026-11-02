import Link from "next/link";
import { ArrowUpRight, Globe2 } from "lucide-react";


import Certifications from "@/components/sections/Certifications";
import WorldMap from "@/components/sections/WorldMap";
import HomeAccordion from "@/components/sections/HomeAccordion";
// import BusinessProcess from "@/components/sections/BusinessProcess";
// import ProofRoom from "@/app/components/home/ProofRoom";
import FinalCTA from "@/components/sections/FinalCTA";
import Reviews from "@/components/sections/Reviews";
import { getPublicCertificates } from "@/lib/certificates";
import styles from "./home.module.css";

export default async function HomePage() {
  const certificates = await getPublicCertificates();

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroMedia} aria-hidden="true">
          <img src="/assets/hero.webp" alt="" fetchPriority="high" />
        </div>
        <div className={`container ${styles.heroGrid}`}>
          <div className={styles.heroCopy}>
            <p className={styles.heroEyebrow}>
              <Globe2 size={15} strokeWidth={2} aria-hidden="true" />
              B2B Export Catalog, India
            </p>
            <h1 className={styles.heroTitle}>
              <span>From Indian Origins</span>
              <span className={styles.heroAccent}>to Global Markets.</span>
            </h1>
            <p className={styles.heroText}>
              Farm-direct. Lab-certified. Export-ready for your shelf. We supply
              Indian spices, makhana, and dry fruits to importers, distributors,
              supermarket buyers, and sourcing teams.
            </p>
            <div className={styles.heroActions}>
              <Link href="/products" className={styles.heroPrimary}>
                Explore Catalog <ArrowUpRight size={18} strokeWidth={2} />
              </Link>
              <Link href="/contact" className={styles.heroSecondary}>
                Request a Quote
              </Link>
            </div>
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
