import Link from "next/link";
import styles from "./AboutUs.module.css";

const POINTS = [
  {
    title: "Who We Are",
    copy: "Giantzfly Exim LLP was established to build a professionally managed Indian export business — delivering quality products and dependable international trade solutions to buyers worldwide.",
  },
  {
    title: "What We Do",
    copy: "We source, process, package and export agricultural produce, spices, dry fruits, makhana, and herbal & wellness products — plus private-label and packaging development for export-ready brands.",
  },
  {
    title: "Our Business Approach",
    copy: "Reliable sourcing, quality control, responsible packaging, competitive pricing and efficient supply-chain coordination — built into dependable solutions for international buyers.",
  },
  {
    title: "From India to the World",
    copy: "From farm gate to your shelf, we connect trusted Indian manufacturers and growers with importers, distributors and retailers across the Gulf, Europe, North America and APAC.",
  },
];

export default function AboutUs() {
  return (
    <section id="about-us" className={styles.section} aria-labelledby="about-us-heading">
      <div className="container-fluid">
        <div className={styles.head}>
          <span className={styles.eyebrow}>About Us</span>
          <h2 id="about-us-heading" className={styles.heading}>
            An India-based export house, built around one promise.
          </h2>
          <p className={styles.lead}>
            Giantzfly Exim LLP is a globally focused export and international
            trade company dedicated to delivering premium-quality Indian
            products and innovative packaging solutions to customers across
            the world.
          </p>
        </div>

        <div className={styles.grid}>
          {POINTS.map((p) => (
            <article key={p.title} className={styles.card}>
              <h3 className={styles.cardTitle}>{p.title}</h3>
              <p className={styles.cardCopy}>{p.copy}</p>
            </article>
          ))}
        </div>

        <Link href="/about" className={styles.cta}>
          Read the full story
          <span className={styles.ctaArrow} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
