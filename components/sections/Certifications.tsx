import styles from "./Certifications.module.css";

const certifications = [
  {
    code: "FSSAI LICENSE",
    name: "Food Safety & Standards Authority of India",
    note: "Licensed Food Business Operator",
  },
  {
    code: "APEDA REGISTRATION",
    name: "Agricultural & Processed Food Products Export Development Authority",
    note: "Registered Exporter",
  },
  {
    code: "SPICES BOARD CRES",
    name: "Spices Board of India",
    note: "Certificate Of Registration As Exporter (CRES) · Registered Spice Exporter",
  },
  {
    code: "IEC",
    name: "Importer Exporter Code",
    note: "Issued By Directorate General Of Foreign Trade (DGFT)",
  },
  {
    code: "RCMC",
    name: "Registration-Cum-Membership Certificate",
    note: "Registered With The Relevant Export Promotion Council",
  },
  {
    code: "ICEGATE REGISTRATION",
    name: "Indian Customs Electronic Gateway",
    note: "Registered For Customs-Related Processes",
  },
];

const incoterms = ["EXW", "FOB", "CIF", "CFR"];

export default function Certifications() {
  return (
    <section className={styles.section}>
      <img
        src="/assets/decor/compass-arc.svg"
        alt=""
        className={styles.decor}
        aria-hidden="true"
      />
      <div className="container">
        <div className={styles.head}>
          <span className={styles.eyebrow}>Compliance</span>
          <h2 className={styles.heading}>
            Paperwork that clears customs the first time.
          </h2>
          <p className={styles.lead}>
            Registrations, testing and documentation are prepared before
            loading, not chased after the container leaves.
          </p>
        </div>

        <div className={styles.grid}>
          {certifications.map((item) => (
            <article key={item.code} className={styles.card}>
              <span className={styles.badge}>{item.code}</span>
              <strong>{item.name}</strong>
              <small>{item.note}</small>
            </article>
          ))}
        </div>

        <div className={styles.terms}>
          <span className={styles.termsLabel}>Incoterms supported</span>
          <div className={styles.termsList}>
            {incoterms.map((term) => (
              <span key={term} className={styles.term}>
                {term}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
