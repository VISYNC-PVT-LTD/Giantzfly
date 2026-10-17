"use client";
import { useRef } from "react";
import { useScrollReveal } from "../../hooks/useScrollReveal";

const MARKETS = [
  {
    region: "North America",
    flag: "🇺🇸",
    detail: "USA & Canada — premium grocery, health-food, ethnic retail",
    active: true,
  },
  {
    region: "Europe",
    flag: "🇪🇺",
    detail: "UK, Germany, Netherlands, France — organic & private-label",
    active: true,
  },
  {
    region: "Africa",
    flag: "🌍",
    detail: "Nigeria, South Africa, Kenya — bulk commodity supply",
    active: true,
  },
  {
    region: "Middle East",
    flag: "🇦🇪",
    detail: "UAE, Saudi Arabia — premium retail and food-service",
    active: false,
  },
];

export default function ReachSection() {
  const labelRef = useRef(null);
  const headRef = useRef(null);
  const gridRef = useRef(null);

  useScrollReveal([
    { ref: labelRef, from: { opacity: 0, y: 20 }, duration: 0.6 },
    { ref: headRef, from: { opacity: 0, y: 50 }, duration: 1.0, delay: 0.1 },
    { ref: gridRef, from: { opacity: 0, y: 30 }, duration: 0.8, delay: 0.3 },
  ]);

  return (
    <section
      style={{
        background: "var(--porcelain)",
        paddingBlock: "var(--section-tight)",
        overflow: "hidden",
      }}
      aria-label="Export reach"
    >
      <div className="container">
        {/* Asymmetric 1fr / 1.4fr grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.4fr",
            gap: "clamp(3rem, 6vw, 8rem)",
            alignItems: "start",
          }}
        >
          {/* Left — heading block */}
          <div>
            <p
              ref={labelRef}
              className="label"
              style={{ color: "var(--saffron)", marginBottom: "1.5rem" }}
            >
              Export Reach
            </p>
            <h2
              ref={headRef}
              style={{
                fontFamily: "var(--font-montserrat)",
                fontSize: "var(--text-3xl)",
                fontWeight: 900,
                letterSpacing: "-0.04em",
                lineHeight: 0.9,
                color: "var(--ink)",
                marginBottom: "2rem",
              }}
            >
              INDIA
              <br />
              <span style={{ color: "var(--saffron)" }}>→ WORLD.</span>
            </h2>
            <p
              style={{
                fontFamily: "var(--font-montserrat)",
                fontSize: "var(--text-md)",
                color: "var(--ink-muted)",
                lineHeight: 1.7,
                maxWidth: "42ch",
              }}
            >
              From Nhava Sheva port, we ship to distributors, supermarket
              chains, and private-label brands across three continents.
            </p>

            {/* Port detail — operational */}
            <div
              style={{
                marginTop: "2.5rem",
                padding: "1.25rem 1.5rem",
                border: "1px solid oklch(14% 0.015 60 / 0.12)",
                background: "oklch(14% 0.015 60 / 0.03)",
              }}
            >
              <p
                className="label"
                style={{ color: "var(--ink-faint)", marginBottom: "0.5rem" }}
              >
                Port of Loading
              </p>
              <p
                style={{
                  fontFamily: "var(--font-montserrat)",
                  fontSize: "var(--text-md)",
                  fontWeight: 600,
                  color: "var(--ink)",
                }}
              >
                Nhava Sheva, Mumbai
              </p>
              <p
                style={{
                  fontFamily: "var(--font-montserrat)",
                  fontSize: "var(--text-sm)",
                  color: "var(--ink-muted)",
                  marginTop: "0.25rem",
                }}
              >
                Lead time: 21–35 days (door to door)
              </p>
            </div>
          </div>

          {/* Right — market cards */}
          <div ref={gridRef}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1px",
                background: "oklch(14% 0.015 60 / 0.1)",
                border: "1px solid oklch(14% 0.015 60 / 0.1)",
              }}
            >
              {MARKETS.map(({ region, flag, detail, active }) => (
                <div
                  key={region}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "auto 1fr auto",
                    alignItems: "center",
                    gap: "1.5rem",
                    padding: "1.5rem 1.75rem",
                    background: "var(--porcelain)",
                    transition: "background 200ms",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "var(--porcelain-2)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "var(--porcelain)")
                  }
                >
                  <span style={{ fontSize: "1.5rem" }} aria-hidden="true">
                    {flag}
                  </span>
                  <div>
                    <p
                      style={{
                        fontFamily: "var(--font-montserrat)",
                        fontSize: "var(--text-md)",
                        fontWeight: 600,
                        color: "var(--ink)",
                        marginBottom: "0.2rem",
                      }}
                    >
                      {region}
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--font-montserrat)",
                        fontSize: "var(--text-sm)",
                        color: "var(--ink-muted)",
                      }}
                    >
                      {detail}
                    </p>
                  </div>
                  <span
                    className="label"
                    style={{
                      color: active
                        ? "oklch(72% 0.18 142)"
                        : "var(--ink-faint)",
                      letterSpacing: "0.1em",
                    }}
                  >
                    {active ? "ACTIVE" : "GROWING"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}