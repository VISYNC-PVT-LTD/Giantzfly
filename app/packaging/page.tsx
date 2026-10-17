import Link from "next/link";
import {
  ArrowUpRight,
  BadgeCheck,
  Boxes,
  FileCheck2,
  FlaskConical,
  Globe2,
  Leaf,
  PackageSearch,
  Palette,
  Ship,
  Store,
  Wrench,
} from "lucide-react";
import styles from "./packaging.module.css";

const consultancy = [
  [
    Palette,
    "Design & development",
    "Concept development, structural design, material selection, specifications and optimisation studies.",
  ],
  [
    Wrench,
    "Cost reduction",
    "Material consumption analysis, packaging redesign, vendor rationalisation and supply-chain optimisation.",
  ],
  [
    FileCheck2,
    "Compliance support",
    "Food-contact requirements, labels, export standards and sustainability requirements.",
  ],
  [
    FlaskConical,
    "Testing & validation",
    "Transport simulation, performance assessment, shelf-life support and packaging audits.",
  ],
  [
    PackageSearch,
    "Vendor qualification",
    "Supplier identification, vendor audits, qualification systems and approved-vendor management.",
  ],
];
const privateLabel = [
  "Product sourcing",
  "Formula development",
  "Packaging development",
  "Label design support",
  "Regulatory documentation",
  "Production coordination",
  "Export support",
];
const industries = [
  "Food & beverage",
  "FMCG & household",
  "Cosmetics & personal care",
  "Pharmaceuticals",
  "Agriculture & allied products",
];
const advantages = [
  "Industry expertise across packaging, sourcing and export",
  "One-stop route from concept to market launch",
  "Qualified manufacturing network across India",
  "Cost and material optimisation",
  "Supplier qualification and quality assurance",
  "International compliance and logistics support",
];

export default function PackagingPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroArt}>
          <img
            src="/assets/illustrations/packaging-page-hero.svg"
            alt="Packaging system components"
          />
        </div>
        <div className="container">
          <p className={styles.kicker}>GiantzFly packaging practice</p>
          <h1>
            From packaging problem
            <br />
            to market-ready system.
          </h1>
          <p>
            Consultancy, material exports and private-label product
            development—connected through one commercial and technical workflow.
          </p>
          <div className={styles.heroActions}>
            <Link href="/contact">
              Start a packaging brief <ArrowUpRight size={18} />
            </Link>
            <span>India → global markets</span>
          </div>
        </div>
      </section>

      <section className={styles.manifesto}>
        <div className="container">
          <div className={styles.split}>
            <p className={styles.kicker}>Why this practice exists</p>
            <div>
              <h2>
                Packaging affects cost, shelf life, compliance, handling and
                whether a buyer trusts the product.
              </h2>
              <p>
                GiantzFly Exim LLP supports manufacturers, brand owners,
                startups, exporters, importers, distributors and retailers from
                concept through design, sourcing, manufacturing coordination,
                quality assurance, documentation and logistics.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.consultancy}>
        <div className="container">
          <div className={styles.titleRow}>
            <div>
              <p className={styles.kicker}>01 / Consultancy</p>
              <h2>Make every layer answer a real requirement.</h2>
            </div>
            <img
              src="/assets/illustrations/consultancy-tools.svg"
              alt="Packaging consultancy tools"
            />
          </div>
          <div className={styles.consultancyGrid}>
            {consultancy.map(([Icon, title, text], i) => {
              const I = Icon as typeof Palette;
              return (
                <article key={String(title)}>
                  <span>0{i + 1}</span>
                  <I size={25} />
                  <h3>{String(title)}</h3>
                  <p>{String(text)}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className={styles.exports}>
        <div className="container">
          <div className={styles.exportGrid}>
            <div>
              <p className={styles.kicker}>02 / Material exports</p>
              <h2>A supplier network, not a PDF catalogue.</h2>
              <p>
                Flexible pouches, paper systems, plastic containers, glass,
                metal and eco-conscious alternatives sourced from qualified
                Indian manufacturers.
              </p>
              <Link href="/#packaging">
                Explore interactive materials <ArrowUpRight size={16} />
              </Link>
            </div>
            <div className={styles.exportArt}>
              <img
                src="/assets/illustrations/export-materials.svg"
                alt="Packaging material formats"
              />
              <div>
                <Boxes />
                <span>
                  Flexible · Paper · Rigid
                  <br />
                  Glass · Metal · Sustainable
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.private}>
        <div className="container">
          <div className={styles.split}>
            <div>
              <p className={styles.kicker}>03 / Private label</p>
              <h2>Launch the product and the pack as one brand system.</h2>
              <p>
                Food, dry fruits, spices, makhana, snacks, health foods,
                personal care, herbal products and Ayurvedic formulations.
              </p>
            </div>
            <div className={styles.checks}>
              {privateLabel.map((x, i) => (
                <div key={x}>
                  <span>0{i + 1}</span>
                  <p>{x}</p>
                  <BadgeCheck size={17} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.exportSupport}>
        <div className="container">
          <div className={styles.supportCard}>
            <div>
              <Ship size={36} />
              <p className={styles.kicker}>Export management</p>
              <h2>Ready after production—not finished at production.</h2>
            </div>
            <div className={styles.supportItems}>
              {[
                "International buyer sourcing",
                "Quality inspection",
                "Export documentation",
                "Freight coordination",
                "Customs-clearance support",
                "Supply-chain management",
              ].map((x) => (
                <span key={x}>{x}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.industries}>
        <div className="container">
          <div className={styles.titleRow}>
            <div>
              <p className={styles.kicker}>Industries served</p>
              <h2>Built to cross category boundaries.</h2>
            </div>
            <Globe2 size={82} />
          </div>
          <div className={styles.industryGrid}>
            {industries.map((x, i) => (
              <article key={x}>
                <span>0{i + 1}</span>
                <h3>{x}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.why}>
        <div className="container">
          <div className={styles.split}>
            <div>
              <p className={styles.kicker}>Why GiantzFly</p>
              <h2>Commercial thinking with packaging discipline.</h2>
              <div className={styles.sustain}>
                <Leaf />
                <p>
                  Sustainable formats considered against actual barrier,
                  shelf-life and supply constraints—not as decoration.
                </p>
              </div>
            </div>
            <div className={styles.checks}>
              {advantages.map((x, i) => (
                <div key={x}>
                  <span>0{i + 1}</span>
                  <p>{x}</p>
                  <BadgeCheck size={17} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.bottom}>
        <div className="container">
          <div>
            <Store />
            <p className={styles.kicker}>
              Your product deserves a usable route
            </p>
            <h2>
              Bring the brief.
              <br />
              We’ll connect the system.
            </h2>
            <Link href="/contact">
              Discuss packaging <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
