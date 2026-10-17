"use client";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useScrollReveal } from "../../hooks/useScrollReveal";

export default function ProductTakeover() {
  const labelRef = useRef(null);
  const nameRef = useRef(null);
  const detailRef = useRef(null);

  useScrollReveal([
    { ref: labelRef, from: { opacity: 0, y: 20 }, duration: 0.6 },
    { ref: nameRef, from: { opacity: 0, y: 50 }, duration: 1.0, delay: 0.1 },
    { ref: detailRef, from: { opacity: 0, x: 30 }, duration: 0.9, delay: 0.3 },
  ]);

  return (
    <section
      data-theme="dark"
      style={{
        position: "relative",
        minHeight: "85vh",
        display: "flex",
        alignItems: "stretch",
        overflow: "hidden",
        background: "var(--surface-0)",
      }}
      aria-label="Featured product — Turmeric Finger"
    >
      {/* Full-bleed product image — left side */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
        }}
      >
        <Image
          src={FEATURED.image}
          alt={`${FEATURED.name} — ${FEATURED.subtitle}`}
          fill
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center 30%" }}
          loading="lazy"
          decoding="async"
        />
        {/* Overlay: dark from right where text lives */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(
              to right,
              oklch(11% 0.012 58 / 0.15) 0%,
              oklch(11% 0.012 58 / 0.6) 40%,
              oklch(11% 0.012 58 / 0.97) 70%,
              oklch(11% 0.012 58 / 1) 100%
            )`,
          }}
        />
      </div>

      {/* Content — right-side, not centered */}
      <div
        className="container"
        style={{
          position: "relative",
          zIndex: 5,
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          paddingBlock: "var(--section-generous)",
        }}
      >
        <div
          style={{
            maxWidth: "min(580px, 100%)",
          }}
        >
          {/* Category micro-label */}
          <p
            ref={labelRef}
            className="label"
            style={{ color: "var(--saffron)", marginBottom: "1.5rem" }}
          >
            Featured Product · {FEATURED.origin}
          </p>

          {/* Enormous product name — declaration, not a card */}
          <h2
            ref={nameRef}
            style={{
              fontFamily: "var(--font-montserrat)",
              fontSize: "var(--text-4xl)",
              fontWeight: 900,
              letterSpacing: "-0.04em",
              lineHeight: 0.9,
              color: "var(--porcelain)",
              marginBottom: "0.5rem",
            }}
          >
            {FEATURED.name}
          </h2>
          <p
            style={{
              fontFamily: "var(--font-montserrat)",
              fontSize: "var(--text-lg)",
              color: "var(--saffron)",
              fontWeight: 500,
              marginBottom: "2rem",
            }}
          >
            {FEATURED.subtitle}
          </p>

          {/* Buyer narrative — editorial (landonorris.com approach) */}
          <p
            style={{
              fontFamily: "var(--font-montserrat)",
              fontSize: "var(--text-md)",
              color: "oklch(97% 0.008 85 / 0.7)",
              lineHeight: 1.65,
              marginBottom: "2.5rem",
              maxWidth: "48ch",
            }}
          >
            {FEATURED.statement}
          </p>

          {/* Specs — operational/log style (obsidianassembly.com) */}
          <div
            ref={detailRef}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1px",
              background: "var(--surface-border)",
              border: "1px solid var(--surface-border)",
              marginBottom: "2.5rem",
            }}
          >
            {FEATURED.specs.map(({ label, value }) => (
              <div
                key={label}
                style={{
                  padding: "1rem 1.25rem",
                  background: "var(--surface-1)",
                }}
              >
                <p
                  className="label"
                  style={{ color: "var(--ink-faint)", marginBottom: "0.4rem" }}
                >
                  {label}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-montserrat)",
                    fontSize: "var(--text-md)",
                    fontWeight: 600,
                    color: "var(--navy)",
                  }}
                >
                  {value}
                </p>
              </div>
            ))}
          </div>

          {/* MOQ + CTA */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "2rem",
              flexWrap: "wrap",
            }}
          >
            <div>
              <p
                className="label"
                style={{ color: "var(--ink-faint)", marginBottom: "0.25rem" }}
              >
                Minimum Order
              </p>
              <p
                style={{
                  fontFamily: "var(--font-montserrat)",
                  fontSize: "var(--text-xl)",
                  fontWeight: 700,
                  color: "var(--saffron)",
                  letterSpacing: "-0.02em",
                }}
              >
                {FEATURED.moq}
              </p>
            </div>
            <Link href={FEATURED.href} className="btn-primary">
              View Full Specs →
            </Link>
          </div>

          {/* Cert tags */}
          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              marginTop: "2rem",
              flexWrap: "wrap",
            }}
          >
            {FEATURED.certs.map((c) => (
              <span
                key={c}
                className="label"
                style={{
                  padding: "0.3rem 0.75rem",
                  border: "1px solid var(--surface-border)",
                  color: "var(--ink-faint)",
                }}
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}