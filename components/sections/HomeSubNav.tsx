"use client";

import Link from "next/link";
import styles from "./HomeSubNav.module.css";

const LINKS = [
  {
    href: "/about",
    label: "About Us",
    note: "Who we are and what we carry",
    n: "01",
  },
  {
    href: "/about/director",
    label: "Meet a Director",
    note: "The person who signs off",
    n: "02",
  },
  {
    href: "/about/mission",
    label: "Our Mission",
    note: "The standard on every lot",
    n: "03",
  },
  {
    href: "/about/vision",
    label: "Our Vision",
    note: "Where we are taking this",
    n: "04",
  },
];

export default function HomeSubNav() {
  return (
    <nav className={styles.strip} aria-label="Company overview">
      <div className={styles.container}>
        <p className={styles.intro}>
          <span className={styles.introKicker}>Browse the company</span>
          <span className={styles.introText}>
            Four short reads before you send a specification.
          </span>
        </p>

        <div className={styles.links}>
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className={styles.link}>
              <span className={styles.num}>{l.n}</span>
              <span className={styles.label}>{l.label}</span>
              <span className={styles.note}>{l.note}</span>
              <span className={styles.arrow} aria-hidden="true" />
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
