import styles from "./WhyChooseUs.module.css";

const REASONS = [
  {
    title: "Quality-Focused Sourcing",
    copy: "High-quality products from trusted suppliers, backed by rigorous checks before every shipment.",
  },
  {
    title: "Reliable Supply Network",
    copy: "Dependable logistics partners so shipments are delivered safely and on schedule, every time.",
  },
  {
    title: "Export-Oriented Approach",
    copy: "Export documentation, compliance and logistics managed by a team that understands global trade.",
  },
  {
    title: "Customized Solutions",
    copy: "Retail-ready packs to bulk industrial packaging, tailored to your brand and target market.",
  },
  {
    title: "Transparent Communication",
    copy: "Honest pricing and straight answers, no surprises once your order is confirmed.",
  },
  {
    title: "Long-Term Partnerships",
    copy: "One responsive team, end to end, from product selection and sampling through after-sales support.",
  },
];

export default function WhyChooseUs() {
  return (
    <section
      id="why-choose-us"
      className={styles.section}
      aria-labelledby="why-choose-heading"
    >
      <div className="container-fluid">
        <div className={styles.head}>
          <span className={styles.eyebrow}>Why Giantzfly</span>
          <h2 id="why-choose-heading" className={styles.heading}>
            Why Choose Giantzfly Exim LLP?
          </h2>
          <p className={styles.lead}>
            We combine quality, reliability and global expertise to deliver
            products and services that meet international expectations.
          </p>
        </div>

        <div className={styles.grid}>
          {REASONS.map((r, i) => (
            <article key={r.title} className={styles.card}>
              <span className={styles.num}>{String(i + 1).padStart(2, "0")}</span>
              <h3 className={styles.cardTitle}>{r.title}</h3>
              <p className={styles.cardCopy}>{r.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
