"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "../../../lib/cart";

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);
  const { items } = useCart();

  useEffect(() => {
    // Show after scrolled past hero
    const onScroll = () =>
      setVisible(window.scrollY > window.innerHeight * 0.5);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const count = items.length;

  return (
    <Link
      href="/cart"
      aria-label={`Open Quote Cart — ${count} item${count !== 1 ? "s" : ""}`}
      style={{
        position: "fixed",
        bottom: "clamp(1.5rem, 3vw, 3rem)",
        right: "clamp(1.25rem, 3vw, 3rem)",
        zIndex: 90,
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        padding: "0.875rem 1.5rem",
        background: "var(--saffron)",
        color: "var(--bg)",
        fontFamily: "var(--font-montserrat)",
        fontSize: "var(--text-xs)",
        fontWeight: 800,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        boxShadow: "0 8px 32px oklch(72% 0.18 68 / 0.35)",
        transition:
          "opacity 300ms cubic-bezier(0.16, 1, 0.3, 1), transform 300ms cubic-bezier(0.16, 1, 0.3, 1)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(12px)",
        pointerEvents: visible ? "auto" : "none",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "var(--turmeric)";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "var(--saffron)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {count > 0 && (
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "20px",
            height: "20px",
            background: "var(--ink)",
            color: "var(--saffron)",
            borderRadius: "50%",
            fontSize: "11px",
            fontWeight: 800,
          }}
        >
          {count}
        </span>
      )}
      Open Quote Cart
    </Link>
  );
}
