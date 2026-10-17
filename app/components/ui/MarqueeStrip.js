"use client";
import { motion } from "framer-motion";

const ITEMS = [
  "FSSAI LICENSED",
  "APEDA CERTIFIED",
  "IEC REGISTERED",
  "USDA ORGANIC",
  "EU CERTIFIED",
  "SPICES BOARD",
  "NHAVA SHEVA PORT",
  "USA · EU · AFRICA",
  "15+ YEARS EXPORT",
  "500+ MT/YEAR",
  "PREMIUM GRADE",
  "BULK SUPPLY",
  "PRIVATE LABEL",
];

export default function MarqueeStrip({
  dark = false,
  speed = 35,
  separator = "◆",
}) {
  const items = [...ITEMS, ...ITEMS]; // duplicate for seamless loop
  const totalWidth = items.length * 220; // approx px per item

  return (
    <div
      aria-hidden="true"
      style={{
        background: dark ? "var(--surface-0)" : "var(--ink)",
        borderTop: `1px solid ${dark ? "var(--surface-border)" : "oklch(100% 0 0 / 0.06)"}`,
        borderBottom: `1px solid ${dark ? "var(--surface-border)" : "oklch(100% 0 0 / 0.06)"}`,
        paddingBlock: "1.1rem",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <motion.div
        animate={{ x: [0, -totalWidth / 2] }}
        transition={{
          duration: speed,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop",
        }}
        style={{
          display: "flex",
          whiteSpace: "nowrap",
          willChange: "transform",
        }}
      >
        {items.map((item, i) => (
          <span
            key={i}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "1.5rem",
              paddingInline: "1.5rem",
              fontFamily: "var(--font-montserrat)",
              fontSize: "var(--text-xs)",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: dark
                ? "oklch(97% 0.008 85 / 0.45)"
                : "oklch(97% 0.008 85 / 0.5)",
            }}
          >
            {item}
            <span style={{ color: "var(--saffron)", fontSize: "0.5em" }}>
              {separator}
            </span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
