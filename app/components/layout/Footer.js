"use client";
import Link from "next/link";
import Image from "next/image";

const PRODUCT_LINKS = [
  { href: "/products/spices", label: "Spices" },
  { href: "/products/makhana", label: "Makhana" },
  { href: "/products/dry-fruits", label: "Dry Fruits" },
];

const COMPANY_LINKS = [
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
  { href: "/cart", label: "Request a Quote" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{
      background: "oklch(22% 0.07 255)",  /* dark navy — only dark section in whole site */
      borderTop: "1px solid oklch(43% 0.13 255 / 0.35)",
      paddingBlock: "clamp(4rem, 3rem + 6vw, 8rem) clamp(2rem, 1.5rem + 3vw, 4rem)",
    }}>
      <div className="container">

        {/* Top row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "3rem", alignItems: "start", marginBottom: "clamp(3rem, 2rem + 5vw, 6rem)" }}>

          {/* Logo + wordmark + tagline */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
              <div style={{ position: "relative", width: 52, height: 52, flexShrink: 0, background: "oklch(97% 0.005 255)", padding: "4px" }}>
                <Image src="/logo.jpeg" alt="GiantzFly Exim LLP" fill sizes="52px" style={{ objectFit: "contain" }} />
              </div>
              <div>
                <p style={{ fontFamily: "var(--font-montserrat)", fontSize: "clamp(1.5rem, 1.2rem + 1.5vw, 2.5rem)", fontWeight: 700, letterSpacing: "-0.03em", color: "oklch(97% 0.005 255)", lineHeight: 1 }}>
                  GIANTZFLY
                </p>
                <span style={{ fontFamily: "var(--font-montserrat)", fontSize: "var(--text-xs)", fontWeight: 600, letterSpacing: "0.18em", color: "oklch(72% 0.10 240)", display: "block" }}>
                  EXIM LLP
                </span>
              </div>
            </div>
            <p style={{ fontFamily: "var(--font-montserrat)", fontSize: "var(--text-md)", color: "oklch(72% 0.10 240 / 0.7)", maxWidth: "52ch", lineHeight: 1.6 }}>
              Supplying supermarkets, distributors, and private-label brands across USA, Europe, and Africa since 2010.
            </p>
          </div>

          {/* Operational status board */}
          <div style={{ fontFamily: "var(--font-montserrat)", fontSize: "var(--text-xs)", letterSpacing: "0.12em", lineHeight: 2 }}>
            <p className="label" style={{ color: "oklch(72% 0.10 240)", marginBottom: "0.75rem" }}>Export Status</p>
            {[
              ["STATUS",  "ACTIVE"],
              ["PORT",    "Nhava Sheva, Mumbai"],
              ["MARKETS", "USA · EU · UK · Africa"],
              ["IEC",     "Registered"],
              ["FSSAI",   "Licensed"],
              ["APEDA",   "Certified"],
            ].map(([key, val]) => (
              <div key={key} style={{ display: "flex", gap: "2rem", color: "oklch(72% 0.10 240 / 0.5)" }}>
                <span style={{ minWidth: "5rem" }}>{key}</span>
                <span style={{ color: key === "STATUS" ? "oklch(72% 0.17 145)" : "oklch(97% 0.005 255 / 0.8)" }}>{val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Nav columns */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "3rem", marginBottom: "clamp(3rem, 2rem + 5vw, 6rem)", paddingTop: "clamp(2rem, 1.5rem + 3vw, 4rem)", borderTop: "1px solid oklch(43% 0.13 255 / 0.3)" }}>
          <div>
            <p className="label" style={{ color: "oklch(72% 0.10 240 / 0.6)", marginBottom: "1.25rem" }}>Products</p>
            <nav style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {PRODUCT_LINKS.map(({ href, label }) => (
                <Link key={href} href={href}
                  style={{ fontFamily: "var(--font-montserrat)", fontSize: "var(--text-sm)", color: "oklch(97% 0.005 255 / 0.6)", transition: "color 200ms", textDecoration: "none" }}
                  onMouseEnter={e => e.currentTarget.style.color = "oklch(72% 0.10 240)"}
                  onMouseLeave={e => e.currentTarget.style.color = "oklch(97% 0.005 255 / 0.6)"}
                >{label}</Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="label" style={{ color: "oklch(72% 0.10 240 / 0.6)", marginBottom: "1.25rem" }}>Company</p>
            <nav style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {COMPANY_LINKS.map(({ href, label }) => (
                <Link key={href} href={href}
                  style={{ fontFamily: "var(--font-montserrat)", fontSize: "var(--text-sm)", color: "oklch(97% 0.005 255 / 0.6)", transition: "color 200ms", textDecoration: "none" }}
                  onMouseEnter={e => e.currentTarget.style.color = "oklch(72% 0.10 240)"}
                  onMouseLeave={e => e.currentTarget.style.color = "oklch(97% 0.005 255 / 0.6)"}
                >{label}</Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="label" style={{ color: "oklch(72% 0.10 240 / 0.6)", marginBottom: "1.25rem" }}>Direct Enquiry</p>
            <a href="https://wa.me/919427191459" target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontFamily: "var(--font-montserrat)", fontSize: "var(--text-sm)", color: "oklch(72% 0.10 240)", transition: "opacity 200ms", textDecoration: "none" }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.7"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}
            >
              WhatsApp us →
            </a>
            <p style={{ fontFamily: "var(--font-montserrat)", fontSize: "var(--text-xs)", color: "oklch(72% 0.10 240 / 0.45)", marginTop: "0.75rem", lineHeight: 1.6 }}>
              Export enquiries responded to<br />within 24 business hours.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", paddingTop: "2rem", borderTop: "1px solid oklch(43% 0.13 255 / 0.3)" }}>
          <p style={{ fontFamily: "var(--font-montserrat)", fontSize: "var(--text-xs)", color: "oklch(72% 0.10 240 / 0.4)", letterSpacing: "0.06em" }}>
            © {year} GiantzFly Exim LLP. All rights reserved.
          </p>
          <p style={{ fontFamily: "var(--font-montserrat)", fontSize: "clamp(0.875rem, 0.8rem + 0.3vw, 1.125rem)", fontStyle: "italic", color: "oklch(72% 0.10 240 / 0.5)", letterSpacing: "-0.01em" }}>
            Every pouch that leaves India carries a promise.
          </p>
        </div>
      </div>
    </footer>
  );
}