"use client";
import { useRef } from "react";
import Link from "next/link";
import { useScrollReveal } from "../../hooks/useScrollReveal";

export default function QuoteCTA() {
  const headRef = useRef(null);
  const bodyRef = useRef(null);

  useScrollReveal([
    { ref: headRef, from: { opacity: 0, y: 50 }, duration: 1.0 },
    { ref: bodyRef, from: { opacity: 0, y: 25 }, duration: 0.8, delay: 0.25 },
  ]);

  return (
    <section
      data-theme="dark"
      style={{
        background: "var(--bg)",
        paddingBlock: "var(--section-tight)",
        position: "relative",
        overflow: "hidden",
      }}
      aria-label="Request a quote"
    >
      {/* Subtle large background text — texture not decoration */}
      <p
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "-0.2em",
          right: "-0.05em",
          fontFamily: "var(--font-montserrat)",
          fontSize: "clamp(8rem, 20vw, 22rem)",
          fontWeight: 900,
          letterSpacing: "-0.06em",
          color: "oklch(22% 0.07 255 / 0.04)",
          lineHeight: 1,
          userSelect: "none",
          pointerEvents: "none",
          whiteSpace: "nowrap",
        }}
      >
        ENQUIRE
      </p>

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        {/* Left-aligned — not centered (design rule) */}
        <p
          className="label"
          style={{ color: "var(--saffron)", marginBottom: "1.5rem" }}
        >
          Ready to source?
        </p>

        <h2
          ref={headRef}
          style={{
            fontFamily: "var(--font-montserrat)",
            fontSize: "var(--text-3xl)",
            fontWeight: 900,
            letterSpacing: "-0.04em",
            lineHeight: 0.95,
            color: "var(--navy)",
            marginBottom: "2rem",
            maxWidth: "18ch",
          }}
        >
          BUILD YOUR
          <br />
          EXPORT
          <br />
          <span style={{ color: "var(--saffron)" }}>ENQUIRY.</span>
        </h2>

        <div ref={bodyRef}>
          <p
            style={{
              fontFamily: "var(--font-montserrat)",
              fontSize: "var(--text-lg)",
              color: "var(--navy-muted)",
              lineHeight: 1.6,
              maxWidth: "52ch",
              marginBottom: "clamp(2rem, 3vw, 4rem)",
            }}
          >
            Select products, specify quantities and packaging requirements. We
            respond within 24 hours with pricing, lead time, and incoterm
            options.
          </p>

          {/* Two CTAs — WhatsApp (solid) + Build Enquiry (ghost) */}
          <div
            style={{
              display: "flex",
              gap: "1rem",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              WhatsApp Direct →
            </a>
            <Link href="/cart" className="btn-ghost">
              Build Enquiry List
            </Link>
          </div>

          {/* Reassurance — no fake urgency */}
          <p
            className="label"
            style={{
              color: "oklch(55% 0.010 60 / 0.5)",
              marginTop: "2rem",
              letterSpacing: "0.1em",
            }}
          >
            No MOQ pressure on first enquiry · All incoterms available · FOB /
            CIF / DDP
          </p>
        </div>
      </div>
    </section>
  );
}