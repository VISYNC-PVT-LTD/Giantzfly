import Image from "next/image";
import Link from "next/link";
import styles from "./MeetDirectors.module.css";

const DIRECTORS = [
  {
    name: "Dattaram Manohar Sawant",
    role: "Founder & Director",
    credentials:
      "B.Sc. (Physics) · MBA (Operations) · Diploma in Packaging Technology",
    profile:
      "12+ years in packaging and operations across pharma, biopharma and skincare. Founded Giantzfly Exim LLP to connect India's finest products with global markets.",
  },
  {
    name: "Omkar Vijay Kadam",
    role: "Co-Founder & Director",
    credentials: "Bachelor of Civil Engineering",
    profile:
      "Civil engineer turned business-development lead, with 5 years building client relationships and driving export sales growth.",
  },
];

export default function MeetDirectors() {
  return (
    <section
      id="meet-directors"
      className={styles.section}
      aria-labelledby="meet-directors-heading"
    >
      <div className="container-fluid">
        <div className={styles.head}>
          <span className={styles.eyebrow}>Leadership</span>
          <h2 id="meet-directors-heading" className={styles.heading}>
            Meet Our Directors
          </h2>
        </div>

        <div className={styles.grid}>
          {DIRECTORS.map((d) => (
            <article key={d.name} className={styles.card}>
              <div className={styles.photoWrap}>
                <Image
                  src="/assets/director.jpg"
                  alt={d.name}
                  fill
                  sizes="(max-width: 680px) 100vw, 320px"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className={styles.body}>
                <h3 className={styles.name}>{d.name}</h3>
                <span className={styles.role}>{d.role}</span>
                <p className={styles.credentials}>{d.credentials}</p>
                <p className={styles.profile}>{d.profile}</p>
                <Link href="/about/director" className={styles.cta}>
                  Full profile
                  <span className={styles.ctaArrow} aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
