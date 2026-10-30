import Link from "next/link";
import type { SiteSettings } from "@/lib/settings";
import { exportMarkets } from "@/data/export-markets";
import styles from "./Footer.module.css";

export default function Footer({ settings }: { settings: SiteSettings }) {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div>
            <div className={styles.brand}>
              Giantzfly
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
              <Link href="/#core-values">Core Values</Link>
              <Link href="/#why-choose-us">Why Giantzfly</Link>
            </div>

            <div>
              <h4>Products</h4>
              <Link href="/products">All Products</Link>
              <Link href="/products/whole-spices">Whole Spices</Link>
              <Link href="/products/powder-spices">Powder Spices</Link>
              <Link href="/products/sprouted-atta">Sprouted Atta</Link>
              <Link href="/products/dehydrated-fruits">Dehydrated Fruits</Link>
              <Link href="/products/fruit-powders">Fruit Powders</Link>
              <Link href="/products/dehydrated-vegetables">Dehydrated Vegetables</Link>
            </div>

            <div>
              <h4>Export Markets</h4>
              {exportMarkets.map((market) => (
                <span key={market.country}>{market.country}</span>
              ))}
            </div>

            <div>
              <h4>Contact</h4>
              <a href={settings.emailHref}>{settings.contactEmail}</a>
              <a href={settings.phoneHref}>{settings.contactPhone}</a>
              <span>{settings.origin}</span>
              <a
                href={settings.whatsappHref}
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
          <span>© 2026 Giantzfly Exim LLP. All rights reserved.</span>
          <span className={styles.legal}>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <span aria-hidden="true">|</span>
            <Link href="/terms">Terms &amp; Conditions</Link>
          </span>
          <span className={styles.credit}>
            Made by <strong>VISYNC</strong>
          </span>
        </div>
      </div>
    </footer>
  );
}
