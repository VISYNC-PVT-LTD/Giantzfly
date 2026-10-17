"use client";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import styles from "./ProofRoom.module.css";

const STATS = [
  {
    value: 15,
    suffix: "+",
    label: "Years Exporting",
    description: "Operating since 2010",
  },
  {
    value: 3,
    suffix: "",
    label: "Continents Reached",
    description: "USA · Europe · Africa",
  },
  {
    value: 500,
    suffix: "+",
    label: "Metric Tons / Year",
    description: "Consistent bulk supply",
  },
  {
    value: 15,
    suffix: "",
    label: "Product Lines",
    description: "Spices · Makhana · Dry Fruits",
  },
];

const CERT_IMAGES = [
  {
    src: "/assets/certificates/cert1.jpg",
    name: "FSSAI License",
    note: "Food Safety & Standards Authority of India",
  },
  {
    src: "/assets/certificates/cert2.jpg",
    name: "APEDA Registration",
    note: "Agri & Processed Food Products Export Dev. Authority",
  },
  {
    src: "/assets/certificates/cert1.jpeg",
    name: "Spice Board CRES",
    note: "Spices Board of India",
  },
  {
    src: "/assets/certificates/cert2.jpg",
    name: "IEC",
    note: "Importer Exporter Code",
  },
  {
    src: "/assets/certificates/cert1.jpg",
    name: "RCMC",
    note: "Registration-Cum-Membership Certificate",
  },
  {
    src: "/assets/certificates/cert1.jpeg",
    name: "ICEGATE",
    note: "Indian Customs Electronic Gateway",
  },
];

function AnimatedStat({ value, suffix, trigger }) {
  const [display, setDisplay] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!trigger || started.current) return;
    started.current = true;

    // Respect prefers-reduced-motion
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) {
      setDisplay(value);
      return;
    }

    const duration = 1800;
    const start = performance.now();

    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out expo
      const eased = 1 - Math.pow(2, -10 * progress);
      setDisplay(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [trigger, value]);

  return (
    <span>
      {display}
      {suffix}
    </span>
  );
}

function StatCard({ stat }) {
  const ref = useRef(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true);
          obs.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        padding: "clamp(2rem, 3vw, 3.5rem) clamp(1.5rem, 2.5vw, 3rem)",
        border: "1px solid var(--surface-border)",
        background: "var(--surface-1)",
        transition: "background 300ms",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.background = "var(--surface-2)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.background = "var(--surface-1)")
      }
    >
      <p
        style={{
          fontFamily: "var(--font-montserrat)",
          fontSize: "var(--text-4xl)",
          fontWeight: 900,
          letterSpacing: "-0.04em",
          lineHeight: 0.9,
          color: "var(--saffron)",
          marginBottom: "0.75rem",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        <AnimatedStat
          value={stat.value}
          suffix={stat.suffix}
          trigger={triggered}
        />
      </p>
      <p
        style={{
          fontFamily: "var(--font-montserrat)",
          fontSize: "var(--text-md)",
          fontWeight: 600,
          color: "var(--navy)",
          marginBottom: "0.4rem",
        }}
      >
        {stat.label}
      </p>
      <p
        style={{
          fontFamily: "var(--font-montserrat)",
          fontSize: "var(--text-sm)",
          color: "var(--ink-faint)",
        }}
      >
        {stat.description}
      </p>
    </div>
  );
}

export default function ProofRoom() {
  const titleRef = useRef(null);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") setLightboxIndex(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex]);

  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      gsap.from(el, {
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: "expo.out",
        scrollTrigger: { trigger: el, start: "top 85%" },
      });
    };

    init();
  }, []);

  return (
    <section
      id="certifications"
      style={{
        background: "var(--bg)",
        paddingBlock: "clamp(3rem, 6vw, 5rem)",
      }}
      aria-label="Proof — export credentials and stats"
    >
      <div className="container-fluid">
        {/* Section header */}
        <div
          ref={titleRef}
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "2rem",
            marginBottom: "clamp(3rem, 4vw, 5rem)",
          }}
        >
          <div>
            <p
              className="label"
              style={{ color: "var(--saffron)", marginBottom: "1rem" }}
            >
              Why Buyers Trust Us
            </p>
            <h2
              style={{
                fontFamily: "var(--font-montserrat)",
                fontSize: "var(--text-3xl)",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                color: "var(--navy)",
                lineHeight: 1,
              }}
            >
              THE PROOF
              <br />
              <span style={{ color: "var(--saffron)" }}>ROOM.</span>
            </h2>
          </div>
          <p
            style={{
              fontFamily: "var(--font-montserrat)",
              fontSize: "var(--text-md)",
              color: "var(--ink-faint)",
              maxWidth: "40ch",
              lineHeight: 1.65,
            }}
          >
            Numbers don't lie. Every certification, every metric, every shipment
            — documented and auditable.
          </p>
        </div>

        {/* Stats — bento-style, not uniform 3-col */}
        <div
          className={styles.statsGrid}
          style={{
            marginBottom: "clamp(3rem, 4vw, 5rem)",
          }}
        >
          {STATS.map((stat) => (
            <StatCard key={stat.label} stat={stat} />
          ))}
        </div>

        {/* Certifications */}
        <div>
          <p
            className="label"
            style={{ color: "var(--ink-faint)", marginBottom: "1.5rem" }}
          >
            Certifications & Registrations
          </p>
          <div className={styles.certGrid}>
            {CERT_IMAGES.map((cert, i) => (
              <figure key={`${cert.name}-${i}`} className={styles.certFigure}>
                <div className={styles.certPhoto}>
                  <Image
                    src={cert.src}
                    alt={cert.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    style={{ objectFit: "cover" }}
                  />
                  <button
                    type="button"
                    className={styles.certButton}
                    aria-label={`Zoom in on ${cert.name}`}
                    onClick={() => setLightboxIndex(i)}
                  />
                </div>
                <figcaption className={styles.certCaption}>
                  <strong>{cert.name}</strong>
                  <span>{cert.note}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>

      {lightboxIndex !== null && (
        <div
          className={styles.lightboxOverlay}
          role="dialog"
          aria-modal="true"
          onClick={() => setLightboxIndex(null)}
        >
          <figure className={styles.lightboxFigure} onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className={styles.lightboxClose}
              onClick={() => setLightboxIndex(null)}
            >
              Close ✕
            </button>
            <Image
              src={CERT_IMAGES[lightboxIndex].src}
              alt={CERT_IMAGES[lightboxIndex].name}
              fill
              sizes="90vw"
              style={{ objectFit: "contain" }}
            />
            <figcaption className={styles.lightboxCaption}>
              {CERT_IMAGES[lightboxIndex].name} — {CERT_IMAGES[lightboxIndex].note}
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}