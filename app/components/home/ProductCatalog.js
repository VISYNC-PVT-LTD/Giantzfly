"use client";
import { useRef, useState, useEffect, useCallback, useContext, createContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { CATEGORIES, getProductsByCategory } from "../../../lib/products";

const PRODUCT_IMAGES = {
  "turmeric-finger-premium": "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=800&q=80&fit=crop",
  "cumin-seeds-bold":        "https://images.unsplash.com/photo-1599599810694-b5b37304c041?w=800&q=80&fit=crop",
  "black-pepper-malabar":    "https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=800&q=80&fit=crop",
  "coriander-seeds-eagle":   "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80&fit=crop",
  "red-chilli-s4":           "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&q=80&fit=crop",
  "cardamom-green-8mm":      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&q=80&fit=crop",
  "makhana-grade-a-large":   "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&q=80&fit=crop",
  "makhana-grade-b":         "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&q=80&fit=crop",
  "makhana-roasted-salted":  "https://images.unsplash.com/photo-1614777986387-015c2a89b9d5?w=800&q=80&fit=crop",
  "makhana-flavoured":       "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80&fit=crop",
  "cashew-w320":             "https://images.unsplash.com/photo-1599599810694-b5b37304c041?w=800&q=80&fit=crop",
  "almonds-california-style":"https://images.unsplash.com/photo-1508747703725-719777637510?w=800&q=80&fit=crop",
  "raisins-golden":          "https://images.unsplash.com/photo-1596560548464-f010b45d76da?w=800&q=80&fit=crop",
  "walnuts-light-halves":    "https://images.unsplash.com/photo-1563412580-8f01533e1e3f?w=800&q=80&fit=crop",
  "pistachios-fandoghi":     "https://images.unsplash.com/photo-1606923829579-0cb981a83e2a?w=800&q=80&fit=crop",
};

const CATEGORY_FALLBACK = {
  "spices":     "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&q=80&fit=crop",
  "makhana":    "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&q=80&fit=crop",
  "dry-fruits": "https://images.unsplash.com/photo-1508747703725-719777637510?w=800&q=80&fit=crop",
};

/* ─── Hover reveal context (CardHoverReveal pattern from 21st.dev) ─── */
const HoverCtx = createContext({ hovered: false });

function CardHoverReveal({ children, className = "" }) {
  const [hovered, setHovered] = useState(false);
  return (
    <HoverCtx.Provider value={{ hovered }}>
      <div
        className={className}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ position: "relative", overflow: "hidden" }}
      >
        {children}
      </div>
    </HoverCtx.Provider>
  );
}

function CardHoverRevealMain({ children, hoverScale = 1.07 }) {
  const { hovered } = useContext(HoverCtx);
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        transition: "transform 500ms cubic-bezier(0.16,1,0.3,1)",
        transform: hovered ? `scale(${hoverScale})` : "scale(1)",
      }}
    >
      {children}
    </div>
  );
}

function CardHoverRevealContent({ children }) {
  const { hovered } = useContext(HoverCtx);
  return (
    <div
      style={{
        position: "absolute",
        inset: "auto 0 0 0",
        padding: "1.5rem",
        background: "oklch(11% 0.012 58 / 0.72)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderTop: "1px solid oklch(100% 0 0 / 0.08)",
        transition: "transform 500ms cubic-bezier(0.16,1,0.3,1), opacity 400ms",
        transform: hovered ? "translateY(0%)" : "translateY(100%)",
        opacity: hovered ? 1 : 0,
      }}
    >
      {children}
    </div>
  );
}

/* ─── Horizontal Scroll Carousel context (ScrollXCarousel from 21st.dev) ─── */
const ScrollXCtx = createContext({ scrollYProgress: null });

function ScrollXCarousel({ children, style = {} }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  return (
    <ScrollXCtx.Provider value={{ scrollYProgress }}>
      <div ref={ref} style={{ position: "relative", ...style }}>
        {children}
      </div>
    </ScrollXCtx.Provider>
  );
}

function ScrollXContainer({ children }) {
  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        overflow: "hidden",
        width: "100%",
        height: "100dvh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {children}
    </div>
  );
}

function ScrollXWrap({ children, xRange = ["0%", "-72%"] }) {
  const { scrollYProgress } = useContext(ScrollXCtx);
  const x = useTransform(scrollYProgress, [0, 1], xRange);
  return (
    <motion.div
      style={{ x, display: "flex", gap: "clamp(1rem, 2vw, 2rem)", width: "fit-content", paddingInline: "clamp(1.5rem, 4vw, 6rem)" }}
    >
      {children}
    </motion.div>
  );
}

function ScrollXProgress() {
  const { scrollYProgress } = useContext(ScrollXCtx);
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return (
    <div
      style={{
        marginInline: "clamp(1.5rem, 4vw, 6rem)",
        marginTop: "2rem",
        height: "1px",
        background: "oklch(14% 0.015 60 / 0.1)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <motion.div
        style={{
          scaleX,
          transformOrigin: "left",
          position: "absolute",
          inset: 0,
          background: "var(--saffron)",
        }}
      />
    </div>
  );
}

/* ─── Individual product card ─── */
function ProductCard({ product }) {
  const imgSrc = PRODUCT_IMAGES[product.slug] || CATEGORY_FALLBACK[product.category];
  return (
    <Link
      href={`/products/${product.category}/${product.slug}`}
      style={{
        display: "block",
        flexShrink: 0,
        width: "clamp(260px, 30vw, 420px)",
        height: "clamp(340px, 45vw, 560px)",
        textDecoration: "none",
      }}
      aria-label={product.name}
    >
      <CardHoverReveal>
        {/* Always-on gradient behind image */}
        <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(to top, oklch(11% 0.012 58 / 0.9) 0%, transparent 55%)" }} />

        {/* Tags top-left */}
        <div style={{ position: "absolute", top: "1rem", left: "1rem", zIndex: 3, display: "flex", gap: "0.4rem" }}>
          {product.tags.slice(0, 1).map(tag => (
            <span key={tag} className="label" style={{ padding: "0.25rem 0.65rem", background: "oklch(72% 0.18 68 / 0.18)", border: "1px solid oklch(72% 0.18 68 / 0.35)", color: "var(--saffron)", fontSize: "9px", backdropFilter: "blur(8px)" }}>
              {tag}
            </span>
          ))}
        </div>

        {/* Image layer */}
        <CardHoverRevealMain hoverScale={1.06}>
          <div style={{ position: "relative", width: "100%", height: "clamp(340px, 45vw, 560px)" }}>
            <Image src={imgSrc} alt={product.name} fill sizes="30vw" style={{ objectFit: "cover" }} loading="lazy" />
          </div>
        </CardHoverRevealMain>

        {/* Always-visible name */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 2, padding: "1.5rem", pointerEvents: "none" }}>
          <p style={{ fontFamily: "var(--font-montserrat)", fontSize: "var(--text-xl)", fontWeight: 700, letterSpacing: "-0.02em", color: "var(--porcelain)", lineHeight: 1.1, marginBottom: "0.25rem" }}>
            {product.name}
          </p>
          <p style={{ fontFamily: "var(--font-montserrat)", fontSize: "var(--text-sm)", color: "oklch(97% 0.008 85 / 0.5)" }}>
            All Grade Available
          </p>
        </div>

        {/* Hover reveal — slides up from bottom */}
        <CardHoverRevealContent>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <p className="label" style={{ color: "var(--saffron)", letterSpacing: "0.14em", marginBottom: "0.3rem" }}>MOQ</p>
              <p style={{ fontFamily: "var(--font-montserrat)", fontSize: "var(--text-md)", color: "var(--porcelain)", fontWeight: 600 }}>
                {product.moq}
              </p>
            </div>
            <span className="label" style={{ color: "var(--saffron)", letterSpacing: "0.14em", borderBottom: "1px solid oklch(72% 0.18 68 / 0.4)", paddingBottom: "2px" }}>
              Add to Quote →
            </span>
          </div>
          <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", marginTop: "0.75rem" }}>
            {product.certifications?.slice(0, 3).map(c => (
              <span key={c} className="label" style={{ fontSize: "8px", padding: "0.15rem 0.5rem", border: "1px solid oklch(100% 0 0 / 0.15)", color: "oklch(97% 0.008 85 / 0.5)" }}>{c}</span>
            ))}
          </div>
        </CardHoverRevealContent>
      </CardHoverReveal>
    </Link>
  );
}

/* ─── Per-category horizontal scroll section ─── */
function CategoryHScroll({ category }) {
  const products = getProductsByCategory(category.id);
  const numCards = products.length;
  /* Each card ~360px + 32px gap. Scroll container 100vw.
     xRange end = -(totalWidth - 100vw) as percent of container */
  const pct = Math.min(78, Math.round((numCards * 380) / 14));
  const xRange = ["0%", `-${pct}%`];

  const headingRef = useRef(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let ctx;
    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      if (!headingRef.current) return;
      ctx = gsap.context(() => {
        gsap.fromTo(headingRef.current,
          { clipPath: "inset(0 100% 0 0)" },
          { clipPath: "inset(0 0% 0 0)", duration: 1, ease: "expo.inOut",
            scrollTrigger: { trigger: headingRef.current, start: "top 88%", toggleActions: "play none none none" } }
        );
      });
    };
    init();
    return () => ctx?.revert();
  }, []);

  return (
    /* Height drives scroll distance. More cards = more scroll height */
    <ScrollXCarousel style={{ height: `${Math.max(200, numCards * 42)}vh` }}>
      <ScrollXContainer>
        {/* Category label row */}
        <div style={{ paddingInline: "clamp(1.5rem, 4vw, 6rem)", marginBottom: "clamp(1.5rem, 3vw, 3rem)", display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
          <div>
            <p className="label" style={{ color: "var(--saffron)", marginBottom: "0.6rem" }}>{category.tagline}</p>
            <h3 ref={headingRef} style={{ fontFamily: "var(--font-montserrat)", fontSize: "var(--text-3xl)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 0.9, color: "var(--ink)", clipPath: "inset(0 100% 0 0)" }}>
              {category.name.toUpperCase()}
            </h3>
          </div>
          <Link href={`/products/${category.id}`} className="label" style={{ color: "var(--ink-muted)", letterSpacing: "0.14em", transition: "color 200ms" }}
            onMouseEnter={e => e.currentTarget.style.color = "var(--saffron)"}
            onMouseLeave={e => e.currentTarget.style.color = "var(--ink-muted)"}
          >
            All {products.length} Products →
          </Link>
        </div>

        {/* Horizontal strip */}
        <ScrollXWrap xRange={xRange}>
          {products.map(p => <ProductCard key={p.id} product={p} />)}
        </ScrollXWrap>

        {/* Progress bar */}
        <ScrollXProgress />
      </ScrollXContainer>
    </ScrollXCarousel>
  );
}

/* ─── Section heading ─── */
function SectionHeading() {
  const ref = useRef(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let ctx;
    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      if (!ref.current) return;
      ctx = gsap.context(() => {
        gsap.fromTo(ref.current.querySelector(".catalog-headline"),
          { clipPath: "inset(0 100% 0 0)", opacity: 1 },
          { clipPath: "inset(0 0% 0 0)", duration: 1.1, ease: "expo.inOut",
            scrollTrigger: { trigger: ref.current, start: "top 85%", toggleActions: "play none none none" } }
        );
      });
    };
    init();
    return () => ctx?.revert();
  }, []);

  return (
    <div ref={ref} style={{ paddingInline: "clamp(1.5rem, 4vw, 6rem)", paddingBlock: "clamp(4rem, 8vw, 10rem) clamp(2rem, 4vw, 5rem)" }}>
      <p className="label" style={{ color: "var(--saffron)", marginBottom: "1rem", letterSpacing: "0.2em" }}>What We Export</p>
      <h2 className="catalog-headline" style={{ fontFamily: "var(--font-montserrat)", fontSize: "var(--text-display)", fontWeight: 900, letterSpacing: "-0.05em", lineHeight: 0.85, color: "var(--ink)", clipPath: "inset(0 100% 0 0)" }}>
        THE<br />CATALOG.
      </h2>
    </div>
  );
}

export default function ProductCatalog() {
  return (
    <section style={{ background: "var(--porcelain)" }} aria-label="Product catalog">
      <SectionHeading />
      {CATEGORIES.map(cat => (
        <CategoryHScroll key={cat.id} category={cat} />
      ))}
    </section>
  );
}