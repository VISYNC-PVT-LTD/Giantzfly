import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div>
            <div className={styles.brand}>
              GIANTZFLY
              <span className={styles.brandSub}>EXIM LLP</span>
            </div>
            <p className={styles.tagline}>
              Connecting Markets. Delivering Growth.
            </p>
            <p className={styles.subline}>
              An India-based export, import, sourcing and supply company
              connecting quality Indian products with international markets.
            </p>
          </div>

          <div className={styles.links}>
            <div>
              <h4>Company</h4>
              <Link href="/about">About Us</Link>
              <Link href="/about/director">Our Directors</Link>
              <Link href="/#core-values">Core Values</Link>
              <Link href="/#why-choose-us">Why Giantzfly</Link>
            </div>

            <div>
              <h4>Products</h4>
              <Link href="/products">Agricultural Products</Link>
              <Link href="/products/whole-spices">Spices</Link>
              <Link href="/products/dry-fruits">Dry Fruits</Link>
              <span>Herbal &amp; Wellness</span>
              <span>Personal Care</span>
              <span>Packaging</span>
            </div>

            <div>
              <h4>Global Markets</h4>
              <span>Middle East</span>
              <span>Europe</span>
              <span>North America</span>
              <span>Asia-Pacific</span>
              <span>Africa</span>
            </div>

            <div>
              <h4>Contact</h4>
              <a href="mailto:giantzflyexim@gmail.com">Email</a>
              <a
                href="https://wa.me/918879965547"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>
              <Link href="/contact">Business Enquiry</Link>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <span>© 2026 Giantzfly Exim LLP. All Rights Reserved.</span>
          <span className={styles.legal}>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <span aria-hidden="true">|</span>
            <Link href="/terms">Terms &amp; Conditions</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
