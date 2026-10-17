"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./GlobalReach.module.css";

const stats = [
  {
    value: 41,
    suffix: "+",
    label: "Export lines",
    note: "Across five categories",
  },
  {
    value: 8,
    suffix: "",
    label: "Countries shipped",
    note: "Sea and air freight",
  },
  {
    value: 12,
    suffix: "+",
    label: "Sourcing origins",
    note: "Maharashtra and beyond",
  },
  {
    value: 98,
    suffix: "%",
    label: "On-time dispatch",
    note: "Against confirmed ETD",
  },
];

const countries = [
  { code: "AE", name: "United Arab Emirates", port: "Jebel Ali" },
  { code: "SA", name: "Saudi Arabia", port: "Jeddah" },
  { code: "GB", name: "United Kingdom", port: "Felixstowe" },
  { code: "DE", name: "Germany", port: "Hamburg" },
  { code: "NL", name: "Netherlands", port: "Rotterdam" },
  { code: "US", name: "United States", port: "New York" },
  { code: "SG", name: "Singapore", port: "Singapore" },
  { code: "AU", name: "Australia", port: "Melbourne" },
];

function useCountUp(target: number, active: boolean) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(target);
      return;
    }
    let frame = 0;
    const duration = 1100;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, active]);

  return value;
}

function Stat({
  value,
  suffix,
  label,
  note,
  active,
}: {
  value: number;
  suffix: string;
  label: string;
  note: string;
  active: boolean;
}) {
  const current = useCountUp(value, active);
  return (
    <div className={styles.stat}>
      <span className={styles.statValue}>
        {current}
        <em>{suffix}</em>
      </span>
      <strong className={styles.statLabel}>{label}</strong>
      <small className={styles.statNote}>{note}</small>
    </div>
  );
}

export default function GlobalReach() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.section} ref={ref}>
      <img
        src="/assets/decor/world-routes.svg"
        alt=""
        className={styles.routes}
        aria-hidden="true"
      />
      <div className="container">
        <div className={styles.head}>
          <span className={styles.eyebrow}>Where we ship</span>
          <h2 className={styles.heading}>
            India at the origin. Eight markets at the other end.
          </h2>
        </div>

        <div className={styles.statGrid}>
          {stats.map((item) => (
            <Stat key={item.label} {...item} active={active} />
          ))}
        </div>

        <div className={styles.countryRail}>
          {countries.map((country, index) => (
            <div
              key={country.code}
              className={styles.country}
              style={{ transitionDelay: `${index * 45}ms` }}
              data-visible={active}
            >
              <span className={styles.countryCode}>{country.code}</span>
              <strong>{country.name}</strong>
              <small>{country.port}</small>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
