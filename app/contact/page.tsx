"use client";
import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  Mail,
  MapPin,
  MessageCircle,
  PackageSearch,
} from "lucide-react";
import { buildWhatsAppURL } from "@/lib/whatsapp";
import styles from "./contact.module.css";
type FormState = {
  name: string;
  company: string;
  country: string;
  email: string;
  whatsapp: string;
  productInterest: string;
  quantity: string;
  notes: string;
};
const initial: FormState = {
  name: "",
  company: "",
  country: "",
  email: "",
  whatsapp: "",
  productInterest: "",
  quantity: "",
  notes: "",
};
export default function ContactPage() {
  const [form, setForm] = useState(initial);
  const url = useMemo(
    () =>
      buildWhatsAppURL(
        {
          ...form,
          notes: `Product: ${form.productInterest}\nQuantity: ${form.quantity || "MOQ discussion"}\n${form.notes}`,
        },
        [],
      ),
    [form],
  );
  const change = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => setForm((v) => ({ ...v, [e.target.name]: e.target.value }));
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
                <a href="mailto:giantzflyexim@gmail.com">
                  <Mail />
                  <span>Email</span>
                  <strong>giantzflyexim@gmail.com</strong>
                </a>
                <div>
                  <MapPin />
                  <span>Trade base</span>
                  <strong>Kudal, Sindhudurg, India</strong>
                </div>
              </div>
            </aside>
            <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
              <div className={styles.formHead}>
                <PackageSearch />
                <div>
                  <p className={styles.kicker}>Build your brief</p>
                  <h2>Trade enquiry</h2>
                </div>
              </div>
              <div className={styles.two}>
                {[
                  ["name", "Buyer name", "John Carter"],
                  ["company", "Company", "Carter Foods LLC"],
                  ["country", "Destination country", "United Kingdom"],
                  ["email", "Email", "buyer@company.com"],
                  ["whatsapp", "WhatsApp", "+44 7XXX XXXXXX"],
                  ["quantity", "Quantity", "5 MT"],
                ].map(([name, label, placeholder]) => (
                  <label key={name} className={styles.field}>
                    <span>{label}</span>
                    <input
                      name={name}
                      value={form[name as keyof FormState]}
                      onChange={change}
                      placeholder={placeholder}
                    />
                  </label>
                ))}
              </div>
              <label className={styles.field}>
                <span>Product interest</span>
                <select
                  name="productInterest"
                  value={form.productInterest}
                  onChange={change}
                >
                  <option value="">Select product or service</option>
                  <option>Packaging consultancy</option>
                  <option>Packaging material export</option>
                  <option>Private label development</option>
                  <option>Spices</option>
                  <option>Makhana</option>
                  <option>Dry fruits</option>
                </select>
              </label>
              <label className={styles.field}>
                <span>Requirement</span>
                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={change}
                  placeholder="Grade, pack format, target shelf life, market or compliance details…"
                />
              </label>
              <a
                href={url}
                target="_blank"
                rel="noreferrer"
                className={styles.send}
              >
                <MessageCircle size={19} />
                Request a Quotation
                <ArrowUpRight size={18} />
              </a>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
