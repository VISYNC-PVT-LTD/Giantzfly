import Link from "next/link";
import BusinessProcess from "./BusinessProcess";
import EnquiryForm from "./EnquiryForm";
import styles from "./FinalCTA.module.css";

const CONTACT_CARDS = [
  {
    key: "whatsapp",
    value: "+91 88799 65547",
    cta: "Chat With Our Team",
    href: "https://wa.me/918879965547",
    icon: (
      <path d="M12 3a9 9 0 0 0-7.75 13.55L3 21l4.6-1.21A9 9 0 1 0 12 3Zm4.86 12.7c-.2.57-1.17 1.1-1.62 1.15-.42.05-.84.1-2.68-.56A9.03 9.03 0 0 1 8.1 12.4c-.66-.87-1.1-1.94-.94-3.06.09-.61.63-1.34 1.15-1.53.24-.09.5-.05.66.17.29.4.7 1.35.76 1.45.06.1.1.22.02.36-.08.14-.12.22-.24.34l-.34.4c-.11.13-.23.27-.1.5.13.24.6.99 1.3 1.6.9.79 1.65 1.04 1.9 1.15.19.09.32.07.44-.05.14-.15.6-.7.76-.94.16-.24.32-.2.53-.12.22.08 1.36.64 1.6.76.23.11.39.17.44.27.06.1.06.55-.14 1.11Z" />
    ),
  },
  {
    key: "email",
    value: "giantzflyexim@gmail.com",
    cta: "Send an Email",
    href: "mailto:giantzflyexim@gmail.com",
    icon: (
      <path d="M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm.4 2 7.1 5.68a.8.8 0 0 0 1 0L19.6 7H4.4Zm15.6 1.4-6.62 5.3a2.8 2.8 0 0 1-3.5 0L3.98 8.4V17h16V8.4Z" />
    ),
  },
];

export default function FinalCTA() {
  return (
    <section className={styles.section} aria-labelledby="cta-heading">
      <span className={styles.glowA} aria-hidden="true" />
      <span className={styles.glowB} aria-hidden="true" />
      <span className={styles.grid} aria-hidden="true" />

      <div className={styles.container}>
        <div className={styles.layout}>
          {/* ---------------- left: the pitch ---------------- */}
          <div className={styles.copy}>
            <span className={styles.eyebrow}>Start an Export Inquiry</span>
            <h2 id="cta-heading" className={styles.title}>
              From origin to your port
              <span className={styles.titleSoft}>
                let us move your first order.
              </span>
            </h2>
            <p className={styles.lead}>
              Send the specification you already have, or the sample that failed
              you last season. Either one is enough for us to quote against, and
              you will hear back inside 48 hours.
            </p>

            <div className={styles.actions}>
              <Link href="/quote-cart" className={styles.primaryBtn}>
                Request a Quotation
                <span className={styles.btnArrow} aria-hidden="true" />
              </Link>
              <Link href="/contact" className={styles.secondaryBtn}>
                Talk to a Director
              </Link>
              {CONTACT_CARDS.map((c) => (
                <a
                  key={c.key}
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.contactCard}
                  title={c.cta}
                >
                  <span className={styles.contactIcon} aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      {c.icon}
                    </svg>
                  </span>
                  <span className={styles.contactText}>
                    <span className={styles.contactValue}>{c.value}</span>
                    <span className={styles.contactCta}>{c.cta}</span>
                  </span>
                </a>
              ))}
            </div>

            <ul className={styles.chips}>
              <li className={styles.chip}>FSSAI Certified</li>
              <li className={styles.chip}>APEDA Registered</li>
              <li className={styles.chip}>Private Label Ready</li>
            </ul>

            
          </div>

          {/* ---------------- right: full enquiry form ---------------- */}
          <div className={styles.panel}>
            <EnquiryForm />
          </div>
        </div>
      </div>
    </section>
  );
}
