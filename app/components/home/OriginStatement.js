"use client";
import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const LEAD_TEXT =
  "From India's finest growing belts to your retail shelf — no middlemen, no compromise.";

function MagicText({ text, style = {} }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "end 0.6"],
  });
  const words = text.split(" ");

  return (
    <p ref={containerRef} style={style}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = (i + 1) / words.length;
        const opacity = useTransform(scrollYProgress, [start, end], [0.15, 1]);
        return (
          <motion.span
            key={i}
            style={{ opacity, display: "inline-block", marginRight: "0.3em" }}
          >
            {word}
          </motion.span>
        );
      })}
    </p>
  );
}

export default function OriginStatement() {
  const anchorRef = useRef(null);
  const blockRef = useRef(null);

  /* Block-wipe on "SOURCED." */
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let ctx;
    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      if (!anchorRef.current) return;

      const el = anchorRef.current;
      el.style.position = "relative";
      el.style.overflow = "hidden";

      const block = document.createElement("div");
      block.style.cssText = `
        position:absolute; inset:0;
        background:var(--porcelain);
        transform-origin:left center;
        scaleX:0;
        z-index:2;
      `;
      el.appendChild(block);
      gsap.set(block, { scaleX: 0 });

      ctx = gsap.context(() => {
        gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        })
          .to(block, { scaleX: 1, transformOrigin: "left center", duration: 0.8, ease: "expo.inOut" })
          .set(el.querySelector(".anchor-word"), { opacity: 1 })
          .to(block, { scaleX: 0, transformOrigin: "right center", duration: 0.7, ease: "expo.inOut" });

        gsap.set(el.querySelector(".anchor-word"), { opacity: 0 });
      });
    };
    init();
    return () => ctx?.revert();
  }, []);

  return (
    <section
      style={{
        background: "var(--porcelain)",
        paddingBlock: "var(--section-generous)",
        overflow: "hidden",
      }}
      aria-label="Origin statement"
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr",
            gap: "clamp(2rem, 4vw, 6rem)",
            alignItems: "end",
          }}
        >
          {/* Left — block-wipe anchor word */}
          <div>
            <p
              className="label"
              style={{ color: "var(--saffron)", marginBottom: "clamp(1rem, 2vw, 2rem)" }}
            >
              Our Mandate
            </p>
            <div ref={anchorRef}>
              <p
                className="anchor-word"
                style={{
                  fontFamily: "var(--font-montserrat)",
                  fontSize: "var(--text-display)",
                  fontWeight: 900,
                  letterSpacing: "-0.05em",
                  lineHeight: 0.85,
                  color: "var(--ink)",
                }}
                aria-hidden="true"
              >
                SOURCED.
              </p>
            </div>
          </div>

          {/* Right — MagicText scroll word reveal */}
          <div style={{ paddingBottom: "0.5rem" }}>
            <MagicText
              text={LEAD_TEXT}
              style={{
                fontFamily: "var(--font-montserrat)",
                fontSize: "var(--text-xl)",
                fontWeight: 500,
                letterSpacing: "-0.02em",
                color: "var(--ink)",
                lineHeight: 1.3,
                marginBottom: "1.5rem",
              }}
            />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "var(--font-montserrat)",
                fontSize: "var(--text-md)",
                color: "var(--ink-muted)",
                lineHeight: 1.7,
                maxWidth: "48ch",
              }}
            >
              GiantzFly Exim LLP procures directly from certified farms in
              Erode, Unjha, Wayanad, Darbhanga and Nashik. Every batch is
              tested, graded, and export-certified before it leaves India.
            </motion.p>

            {/* Certification tags */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "2rem" }}
            >
              {["FSSAI", "APEDA", "IEC", "USDA Organic", "EU Certified"].map((cert) => (
                <span
                  key={cert}
                  className="label"
                  style={{
                    padding: "0.4rem 0.875rem",
                    border: "1px solid oklch(14% 0.015 60 / 0.15)",
                    color: "var(--ink-muted)",
                    letterSpacing: "0.12em",
                  }}
                >
                  {cert}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        style={{
          width: "100%",
          height: "1px",
          background: "oklch(14% 0.015 60 / 0.08)",
          marginTop: "var(--section-tight)",
        }}
      />
    </section>
  );
}