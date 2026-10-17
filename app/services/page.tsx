import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { services } from "./services-content";
import styles from "./services.module.css";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Packaging consultancy services, packaging material exports, private label product development and sustainable packaging from Giantzfly Exim LLP.",
};

const industries = [
  "Food & beverage",
  "FMCG & household",
  "Cosmetics & personal care",
  "Pharmaceuticals",
  "Agriculture & allied products",
];

const advantages = [
  "Industry expertise across packaging, sourcing and export",
  "One route from concept to market launch",
  "Qualified manufacturing network across India",
  "Cost and material optimisation",
  "Supplier qualification and quality assurance",
  "International compliance and logistics support",
];

export default function ServicesPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div
          className={styles.heroBg}
          style={{ backgroundImage: "url('/assets/backgrounds/services.jpg')" }}
          aria-hidden="true"
        />
        <div className={styles.heroVeil} aria-hidden="true" />
        <img
          src="/assets/decor/crate-lines.svg"
          alt=""
          className={styles.heroDecor}
          aria-hidden="true"
        />
        <div className="container">
          <div className={styles.heroInner}>
            <span className={styles.kicker}>Our Services</span>
            <h1 className={styles.title}>
              From packaging problem
              <br />
              to market-ready system.
            </h1>
            <p className={styles.tagline}>
              Consultancy, material exports, private-label development and
              sustainable packaging, connected through one commercial and
              technical workflow.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.body}>
        <img
          src="/assets/decor/spice-burst.svg"
          alt=""
          className={styles.bodyDecor}
          aria-hidden="true"
        />
        <div className="container">
          <div className={styles.prose}>
            <p>
              Packaging affects cost, shelf life, compliance, handling and
              whether a buyer trusts the product on arrival. Giantzfly Exim LLP
              supports manufacturers, brand owners, startups, exporters,
              importers, distributors and retailers from concept through design,
              sourcing, manufacturing coordination, quality assurance,
              documentation and logistics.
            </p>
          </div>

          <div className={styles.sectionHead}>
            <span className={styles.eyebrowDark}>Four service lines</span>
            <h2>Pick the engagement that matches where you are.</h2>
          </div>

          <div className={styles.serviceGrid}>
            {services.map((service, index) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className={styles.serviceCard}
              >
                <span className={styles.serviceIndex}>
                  0{index + 1} / Service
                </span>
                <h3>{service.label}</h3>
                <p>{service.tagline}</p>
                <span className={styles.serviceMore}>
                  View service <ArrowUpRight size={14} />
                </span>
              </Link>
            ))}
          </div>

          <div className={styles.sectionHead}>
            <span className={styles.eyebrowDark}>Industries served</span>
            <h2>Sectors we work with every week.</h2>
          </div>
          <ul className={styles.deliverables}>
            {industries.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <div className={styles.sectionHead}>
            <span className={styles.eyebrowDark}>Why work with us</span>
            <h2>What buyers get that a trading desk cannot offer.</h2>
          </div>
          <div className={styles.offerGrid}>
            {advantages.map((item, index) => (
              <article key={item} className={styles.offer}>
                <h3>0{index + 1}</h3>
                <p>{item}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.band}>
        <img
          src="/assets/backgrounds/services.jpg"
          alt=""
          className={styles.bandDecor}
          aria-hidden="true"
        />
        <div className="container">
          <div className={styles.bandInner}>
            <h2>Start with a packaging brief.</h2>
            <p>
              Tell us the product, the destination market and the volume. We
              come back with format options, material choices, indicative cost
              and a qualified vendor route.
            </p>
            <Link href="/contact" className={styles.bandBtn}>
              Start a packaging brief <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
