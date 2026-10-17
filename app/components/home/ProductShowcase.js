"use client";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

/* Stacking Cards — from 21st.dev Stacking Card pattern.
   Each card: sticky top-0, scales down as next card enters.
   Parallax: bg image moves at different rate than foreground text. */

const SLIDES = [
  {
    id: "turmeric",
    index: "01",
    tag: "SPICES",
    title: "Turmeric",
    headline: "3.5% Curcumin",
    copy: "Sourced from Erode, Tamil Nadu — the world's turmeric capital. ASTA graded, steam sterilised, export-certified.",
    specs: [
      ["Origin", "Erode, TN"],
      ["Grade", "Finger Premium"],
      ["MOQ", "5 MT"],
      ["HS Code", "0910.30"],
    ],
    bg: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=1800&q=80&fit=crop",
    bgPos: "center 60%",
    color: "oklch(63% 0.16 56)", // turmeric
    cardBg: "oklch(16% 0.013 58)", // surface-1
  },
  {
    id: "makhana",
    index: "02",
    tag: "FOX NUTS",
    title: "Makhana",
    headline: "Grade A Large",
    copy: "Darbhanga, Bihar. GI-Protected origin. Natural puffed lotus seeds — low calorie, high protein, allergen-free.",
    specs: [
      ["Origin", "Darbhanga, Bihar"],
      ["Grade", "A Large"],
      ["MOQ", "2 MT"],
      ["Cert", "FSSAI · APEDA"],
    ],
    bg: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=1800&q=80&fit=crop",
    bgPos: "center center",
    color: "oklch(80% 0.12 80)",
    cardBg: "oklch(14% 0.011 60)",
  },
  {
    id: "cashew",
    index: "03",
    tag: "DRY FRUITS",
    title: "Cashews",
    headline: "W-320 Premium",
    copy: "Kollam, Kerala. Hand-sorted W-320 grade — the benchmark for white wholes globally. Vacuum-packed, shelf-stable 18 months.",
    specs: [
      ["Origin", "Kollam, Kerala"],
      ["Grade", "W-320"],
      ["MOQ", "5 MT"],
      ["Pack", "10kg Vaccum"],
    ],
    bg: "https://images.unsplash.com/photo-1599599810694-b5b37304c041?w=1800&q=80&fit=crop",
    bgPos: "center 40%",
    color: "oklch(78% 0.10 90)",
    cardBg: "oklch(18% 0.012 58)",
  },
  {
    id: "pepper",
    index: "04",
    tag: "SPICES",
    title: "Black Pepper",
    headline: "Malabar Bold 550 GL",
    copy: "Wayanad, Kerala. Heavy bold pepper at 550 grammes per litre. ASTA piperine-certified for EU pharma and food buyers.",
    specs: [
      ["Origin", "Wayanad, Kerala"],
      ["Grade", "Malabar Bold"],
      ["MOQ", "3 MT"],
      ["GL", "550+"],
    ],
    bg: "https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=1800&q=80&fit=crop",
    bgPos: "center 50%",
    color: "oklch(65% 0.06 60)",
    cardBg: "oklch(12% 0.010 58)",
  },
];

/* Single stacking card component */
function StackCard({ slide, i, progress, total }) {
  const cardRef = useRef(null);

  /* Each card reads its own scroll progress for image parallax */
  const { scrollYProgress: localProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  /* Image moves slower than scroll — parallax depth */
  const imgY = useTransform(localProgress, [0, 1], ["0%", "20%"]);
  const imgScale = useTransform(localProgress, [0, 1], [1.1, 1.0]);

  /* Card scales down as next card overlaps (stacking effect) */
  const targetScale = 1 - (total - i) * 0.04;
  const scale = useTransform(progress, [i / total, 1], [1, targetScale]);

  return (
    <div
      ref={cardRef}
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "sticky",
        top: 0,
      }}
    >
      <motion.div
        style={{
          scale,
          transformOrigin: "top center",
          top: `${i * 28}px`,
          position: "relative",
          width: "min(92vw, 1400px)",
          height: "min(82vh, 680px)",
          overflow: "hidden",
          background: slide.cardBg,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
        }}
      >
        {/* ── LEFT: parallax image ── */}
        <div style={{ position: "relative", overflow: "hidden" }}>
          <motion.div
            style={{
              y: imgY,
              scale: imgScale,
              position: "absolute",
              inset: "-15% 0",
              transformOrigin: "center",
            }}
          >
            <Image
              src={slide.bg}
              alt={slide.title}
              fill
              sizes="50vw"
              style={{ objectFit: "cover", objectPosition: slide.bgPos }}
              priority={i < 2}
              loading={i < 2 ? "eager" : "lazy"}
            />
          </motion.div>

          {/* Depth overlay — darker on edges */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 1,
              background:
                "linear-gradient(to right, oklch(11% 0.012 58 / 0.2) 0%, transparent 60%)",
              pointerEvents: "none",
            }}
          />

          {/* Index badge — floats at separate depth */}
          <div
            style={{
              position: "absolute",
              bottom: "2rem",
              left: "2rem",
              zIndex: 2,
              fontFamily: "var(--font-montserrat)",
              fontSize: "clamp(4rem, 8vw, 8rem)",
              fontWeight: 900,
              lineHeight: 1,
              color: "oklch(97% 0.008 85 / 0.07)",
              letterSpacing: "-0.05em",
              userSelect: "none",
            }}
          >
            {slide.index}
          </div>
        </div>

        {/* ── RIGHT: content ── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "clamp(2rem, 2vw, 2rem)",
            height: "100%",
            overflow: "hidden",
          }}
        >
          {/* Scrollable content area */}
          <div style={{ flex: 1, overflow: "auto", marginBottom: "2rem" }}>
            <div>
              <span
                className="label"
                style={{
                  color: slide.color,
                  letterSpacing: "0.2em",
                  marginBottom: "clamp(1rem, 2vw, 2rem)",
                  display: "block",
                }}
              >
                {slide.tag}
              </span>
              <h2
                style={{
                  fontFamily: "var(--font-montserrat)",
                  fontSize: "clamp(2rem, 4vw, 4rem)",
                  fontWeight: 900,
                  letterSpacing: "-0.04em",
                  lineHeight: 0.9,
                  color: "var(--porcelain)",
                  marginBottom: ".5rem",
                }}
              >
                {slide.title}
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-montserrat)",
                  fontSize: "var(--text-lg)",
                  fontWeight: 500,
                  fontStyle: "italic",
                  color: slide.color,
                  marginBottom: "clamp(1rem, 1vw, 1rem)",
                  letterSpacing: "-0.01em",
                }}
              >
                {slide.headline}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-montserrat)",
                  fontSize: "var(--text-md)",
                  color: "oklch(97% 0.008 85 / 0.6)",
                  lineHeight: 1.65,
                  maxWidth: "44ch",
                  marginBottom: "2rem",
                }}
              >
                {slide.copy}
              </p>
            </div>

            {/* Specs table — 2×2 grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1px",
                background: "oklch(100% 0 0 / 0.06)",
              }}
            >
              {slide.specs.map(([label, val]) => (
                <div
                  key={label}
                  style={{
                    padding: "0.875rem 1rem",
                    background: "oklch(100% 0 0 / 0.03)",
                  }}
                >
                  <p
                    className="label"
                    style={{
                      color: "oklch(97% 0.008 85 / 0.35)",
                      fontSize: "8px",
                      marginBottom: "0.35rem",
                    }}
                  >
                    {label}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-montserrat)",
                      fontSize: "var(--text-sm)",
                      color: "var(--porcelain)",
                      fontWeight: 600,
                    }}
                  >
                    {val}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Buttons — fixed at bottom, always visible */}
          <div style={{ display: "flex", gap: "1rem", flexShrink: 0 }}>
            <Link
              href="/cart"
              className="btn-primary"
              style={{ fontSize: "var(--text-xs)" }}
            >
              Add to Enquiry
            </Link>
            <Link
              href={`/products`}
              className="btn-ghost"
              style={{
                fontSize: "var(--text-xs)",
                color: "var(--porcelain)",
                borderColor: "oklch(100% 0 0 / 0.15)",
              }}
            >
              View All
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function ProductShowcase() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={containerRef}
      data-theme="light"
      style={{
        background: "var(--bg)",
        /* Each card = 100vh, +1 for breathing room */
        minHeight: `${(SLIDES.length + 0.5) * 100}vh`,
        paddingBottom: "4rem",
      }}
      aria-label="Product showcase"
    >
      {/* Section label — pinned top */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          pointerEvents: "none",
          padding: "clamp(1.25rem, 2vw, 2rem) clamp(1.5rem, 4vw, 6rem)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <p
          className="label"
          style={{ color: "var(--saffron)", letterSpacing: "0.2em" }}
        >
          Export Catalog — Scroll
        </p>
        <p
          className="label"
          style={{
            color: "oklch(97% 0.008 85 / 0.3)",
            letterSpacing: "0.15em",
          }}
        >
          {SLIDES.length} Products
        </p>
      </div>

      {SLIDES.map((slide, i) => (
        <StackCard
          key={slide.id}
          slide={slide}
          i={i}
          total={SLIDES.length}
          progress={scrollYProgress}
        />
      ))}
    </section>
  );
}