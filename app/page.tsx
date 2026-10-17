

import Link from "next/link";
import HomeSubNav from "@/components/sections/HomeSubNav";
import WorldMap from "@/components/sections/WorldMap";
import HomeAccordion from "@/components/sections/HomeAccordion";
// import BusinessProcess from "@/components/sections/BusinessProcess";
// import ProofRoom from "@/app/components/home/ProofRoom";
import FinalCTA from "@/components/sections/FinalCTA";
import Reviews from "@/components/sections/Reviews";
import styles from "./home.module.css";

export default function HomePage() {
  return (
    <>
      <section className="page-hero page-hero--image">
        <div className="page-hero__media" aria-hidden="true">
          <div className="page-hero__bg" />
          <div className="page-hero__overlay" />
        </div>
        <div className="container page-hero__shell">
          <div className="page-hero__content">
            <span className="eyebrow page-hero__eyebrow">B2B Export Catalog · India</span>
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
            <div className={`chip-row page-hero__chips ${styles.heroChips}`}>
              <span className="chip">FSSAI Certified</span>
              <span className="chip">APEDA Registered</span>
              <span className="chip">Private Label Options</span>
              <span className="chip">EXW / FOB / CIF</span>
            </div>
          </div>
        </div>
      </section>
    <HomeAccordion />
      <HomeSubNav />
      <WorldMap />
      {/* <ProofRoom /> */}
      {/* <BusinessProcess /> */}
      <FinalCTA />
      <Reviews />
    </>
  );
}