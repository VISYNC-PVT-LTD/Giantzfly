"use client";
import { Mail, MapPin, MessageCircle } from "lucide-react";
import EnquiryForm from "@/components/sections/EnquiryForm";
import { useContactSettings } from "@/context/ContactSettingsContext";
import styles from "./contact.module.css";
export default function ContactPage() {
  const settings = useContactSettings();
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroArt}>
          <img
            src="/assets/illustrations/contact-brief.svg"
            alt="Trade enquiry brief illustration"
          />
        </div>
        <div className="container">
          <p className={styles.kicker}>Trade desk / global sourcing</p>
          <h1>
            Tell us what you’re
            <br />
            <em>looking to source.</em>
          </h1>
          <p>
            Share your product, grade, quantity, destination and packaging
            requirements. We’ll get back to you with the right sourcing and
            supply options.
          </p>
        </div>
      </section>
      <section className={styles.formSection}>
        <div className="container">
          <div className={styles.grid}>
            <aside>
              <p className={styles.kicker}>A better first message</p>
              <h2>Six details save six rounds of email.</h2>
              <ol>
                {[
                  "Product of interest",
                  "Required grade / specification",
                  "Quantity",
                  "Packaging preference",
                  "Destination country",
                  "Bulk or private label",
                ].map((x, i) => (
                  <li key={x}>
                    <span>0{i + 1}</span>
                    {x}
                  </li>
                ))}
              </ol>
              <div className={styles.contactCards}>
                <a href={settings.emailHref}>
                  <Mail />
                  <span>Email</span>
                  <strong>{settings.contactEmail}</strong>
                </a>
                <a href={settings.whatsappHref} target="_blank" rel="noopener noreferrer">
                  <MessageCircle />
                  <span>Phone / WhatsApp</span>
                  <strong>{settings.contactPhone}</strong>
                </a>
                <div>
                  <MapPin />
                  <span>Trade base</span>
                  <strong>{settings.origin}</strong>
                </div>
              </div>
            </aside>
            <div className={styles.formWrap}>
              <EnquiryForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
