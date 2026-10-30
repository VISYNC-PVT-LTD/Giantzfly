import styles from "./CoreValues.module.css";

const VALUES = [
  {
    n: "01",
    title: "Integrity",
    copy: "We conduct business with honesty, fairness and accountability, building relationships on trust.",
  },
  {
    n: "02",
    title: "Quality",
    copy: "The highest standards in sourcing, processing, packaging and quality assurance, on every lot.",
  },
  {
    n: "03",
    title: "Reliability",
    copy: "Consistent product quality, timely deliveries and dependable partnerships you can plan around.",
  },
  {
    n: "04",
    title: "Transparency",
    copy: "Open communication and fair pricing, no moving numbers after a quotation is issued.",
  },
  {
    n: "05",
    title: "Innovation",
    copy: "Continuous improvement in products, packaging and supply-chain practices, backed by modern technology.",
  },
  {
    n: "06",
    title: "Partnership",
    copy: "Long-term relationships with customers, suppliers and stakeholders, built on collaboration and shared success.",
  },
];

export default function CoreValues() {
  return (
    <section
      id="core-values"
      className={styles.section}
      aria-labelledby="core-values-heading"
    >
      <div className="container-fluid">
        <div className={styles.head}>
          <span className={styles.eyebrow}>Our Core Values</span>
          <h2 id="core-values-heading" className={styles.heading}>
            What every shipment is built on.
          </h2>
        </div>

        <div className={styles.grid}>
          {VALUES.map((v) => (
            <article key={v.n} className={styles.card}>
              <span className={styles.num}>{v.n}</span>
              <h3 className={styles.cardTitle}>{v.title}</h3>
              <p className={styles.cardCopy}>{v.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
