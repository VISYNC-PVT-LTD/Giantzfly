"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, ChangeEvent } from "react";
import {
  ArrowUpRight,
  Mail,
  MessageCircle,
  Minus,
  Plus,
  ShoppingCart,
  Trash2,
} from "lucide-react";
import { useQuoteCart } from "@/context/QuoteCartContext";
import { useContactSettings } from "@/context/ContactSettingsContext";
import { categories } from "@/data/products";
import { buildEmailURL, buildWhatsAppURL } from "@/lib/whatsapp";
import type { QuoteRequestItem } from "@/types";
import styles from "./page.module.css";

type QuoteLine = {
  product: string;
  grade: string;
  packaging: string;
  quantity: string;
};

type BuyerForm = {
  name: string;
  company: string;
  country: string;
  email: string;
  whatsapp: string;
  notes: string;
};

const emptyLine = (): QuoteLine => ({
  product: "",
  grade: "",
  packaging: "",
  quantity: "",
});

const initialBuyer: BuyerForm = {
  name: "",
  company: "",
  country: "",
  email: "",
  whatsapp: "",
  notes: "",
};

const STEPS = ["Choose products", "Add buyer details", "Send enquiry"];

const TRADE_TIPS = [
  "Give quantity in kg or MT.",
  "Name the grade and pack you need.",
  "Mention destination port and terms (EXW, FOB or CIF).",
  "Taxes and transport are charged as applicable.",
];

/** Reads the numeric rate from a label such as "₹1,380 / kg". */
function rateOf(label?: string): number | null {
  if (!label) return null;
  const match = label.replace(/,/g, "").match(/(\d+(?:\.\d+)?)/);
  return match ? Number(match[1]) : null;
}

const inr = (value: number) => `₹${Math.round(value).toLocaleString("en-IN")}`;

const categoryName = (slug: string) =>
  categories.find((c) => c.slug === slug)?.name ?? slug;

export default function QuoteCartPage() {
  const settings = useContactSettings();
  const { items, removeItem, updateItem, clearCart } = useQuoteCart();
  const [customLines, setCustomLines] = useState<QuoteLine[]>([]);
  const [buyer, setBuyer] = useState<BuyerForm>(initialBuyer);

  // Lift any line below its minimum order (for example 1 kg added from a product page).
  useEffect(() => {
    items.forEach((item) => {
      const min = Number(item.product.moq) || 1;
      if (item.quantity < min) updateItem(item.product.id, { quantity: min });
    });
  }, [items, updateItem]);

  function updateCustomLine(index: number, key: keyof QuoteLine, value: string) {
    setCustomLines((prev) =>
      prev.map((line, i) => (i === index ? { ...line, [key]: value } : line)),
    );
  }

  function updateBuyer(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setBuyer((prev) => ({ ...prev, [name]: value }));
  }

  const enquiryItems = useMemo(() => {
    const cartItems: QuoteRequestItem[] = items.map((item) => ({
      product: {
        name: item.product.name,
        grade: item.product.grade,
        moqUnit: item.product.moqUnit,
      },
      packaging: item.packaging || "To be discussed",
      quantity: item.quantity || "MOQ discussion",
      notes: item.notes,
    }));

    const manualItems: QuoteRequestItem[] = customLines
      .filter((line) => line.product.trim().length > 0)
      .map((line) => ({
        product: {
          name: line.product,
          grade: line.grade || "As required",
          moqUnit: "",
        },
        packaging: line.packaging || "To be discussed",
        quantity: line.quantity || "MOQ discussion",
      }));

    return [...cartItems, ...manualItems];
  }, [items, customLines]);

  const indicative = useMemo(
    () =>
      items.reduce((sum, item) => {
        const rate = rateOf(item.product.pricePerUnit);
        return rate ? sum + rate * item.quantity : sum;
      }, 0),
    [items],
  );

  const whatsappUrl = buildWhatsAppURL(buyer, enquiryItems, settings);
  const emailUrl = buildEmailURL(buyer, enquiryItems, settings);

  const buyerReady = Boolean(buyer.name.trim() && buyer.email.trim());
  const step = enquiryItems.length === 0 ? 0 : buyerReady ? 2 : 1;
  const canSend = enquiryItems.length > 0;

  return (
    <section className={styles.page}>
      <div className="container">
        <header className={styles.hero}>
          <div>
            <p className={styles.kicker}>Quote cart</p>
            <h1 className={styles.heroTitle}>Your trade enquiry</h1>
            <p className={styles.heroText}>
              Collect the products you want priced, add your details and send the
              list to Giantzfly. This is a B2B quotation, not a checkout.
            </p>
          </div>

          <ol className={styles.steps} aria-label="Progress">
            {STEPS.map((label, i) => (
              <li
                key={label}
                className={`${styles.stepItem} ${i < step ? styles.stepDone : ""} ${
                  i === step ? styles.stepNow : ""
                }`}
                aria-current={i === step ? "step" : undefined}
              >
                <span className={styles.stepNum}>{String(i + 1).padStart(2, "0")}</span>
                <span>{label}</span>
              </li>
            ))}
          </ol>
        </header>

        <div className={styles.layout}>
          {/* ---------------- left: lines ---------------- */}
          <div className={styles.main}>
            <section className={styles.block} aria-labelledby="cart-lines">
              <div className={styles.blockHead}>
                <div>
                  <h2 id="cart-lines" className={styles.blockTitle}>
                    Products
                  </h2>
                  <p className={styles.blockSub}>
                    Minimum order 2 kg per product. Minimum pack 50 g.
                  </p>
                </div>
                {items.length > 0 && (
                  <button type="button" className={styles.textBtn} onClick={clearCart}>
                    Clear all
                  </button>
                )}
              </div>

              {items.length > 0 ? (
                <ul className={styles.cartList}>
                  {items.map((item) => {
                    const { product } = item;
                    const min = Number(product.moq) || 1;
                    const rate = rateOf(product.pricePerUnit);
                    const setQty = (next: number) =>
                      updateItem(product.id, { quantity: Math.max(min, next) });
                    return (
                      <li key={product.id} className={styles.cartItem}>
                        <img
                          className={styles.thumb}
                          src={product.image}
                          alt=""
                          width={72}
                          height={72}
                        />

                        <div className={styles.itemBody}>
                          <div className={styles.itemTop}>
                            <div>
                              <Link
                                href={`/products/${product.category}/${product.slug}`}
                                className={styles.itemName}
                              >
                                {product.name}
                              </Link>
                              <p className={styles.itemMeta}>
                                {categoryName(product.category)}
                                {product.pricePerUnit ? `, ${product.pricePerUnit}` : ""}
                              </p>
                            </div>
                            <button
                              type="button"
                              className={styles.iconBtn}
                              onClick={() => removeItem(product.id)}
                              aria-label={`Remove ${product.name}`}
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>

                          <div className={styles.itemControls}>
                            <label className={styles.control}>
                              <span>Packaging</span>
                              <select
                                className={styles.input}
                                value={item.packaging}
                                onChange={(e) =>
                                  updateItem(product.id, { packaging: e.target.value })
                                }
                              >
                                {product.packagingOptions.map((opt) => (
                                  <option key={opt} value={opt}>
                                    {opt}
                                  </option>
                                ))}
                              </select>
                            </label>

                            <div className={styles.control}>
                              <span>Quantity ({product.moqUnit || "units"})</span>
                              <div className={styles.stepper}>
                                <button
                                  type="button"
                                  onClick={() => setQty(item.quantity - 1)}
                                  disabled={item.quantity <= min}
                                  aria-label={`Decrease ${product.name}`}
                                >
                                  <Minus size={14} />
                                </button>
                                <input
                                  type="number"
                                  min={min}
                                  value={item.quantity}
                                  onChange={(e) => setQty(Number(e.target.value) || min)}
                                  aria-label={`${product.name} quantity`}
                                />
                                <button
                                  type="button"
                                  onClick={() => setQty(item.quantity + 1)}
                                  aria-label={`Increase ${product.name}`}
                                >
                                  <Plus size={14} />
                                </button>
                              </div>
                            </div>

                            <div className={`${styles.control} ${styles.lineTotal}`}>
                              <span>Line value</span>
                              <strong>{rate ? inr(rate * item.quantity) : "On request"}</strong>
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <div className={styles.empty}>
                  <span className={styles.emptyIcon}>
                    <ShoppingCart size={24} />
                  </span>
                  <h3>Your cart is empty</h3>
                  <p>Pick a category to start building your quotation.</p>
                  <div className={styles.chipRow}>
                    {categories.map((c) => (
                      <Link key={c.slug} href={`/products/${c.slug}`} className={styles.chip}>
                        {c.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </section>

            <section className={styles.block} aria-labelledby="custom-lines">
              <div className={styles.blockHead}>
                <div>
                  <h2 id="custom-lines" className={styles.blockTitle}>
                    Custom lines
                  </h2>
                  <p className={styles.blockSub}>
                    Need something not in the catalogue? Describe it here.
                  </p>
                </div>
                <button
                  type="button"
                  className={styles.outlineBtn}
                  onClick={() => setCustomLines((prev) => [...prev, emptyLine()])}
                >
                  <Plus size={15} />
                  Add line
                </button>
              </div>

              {customLines.length === 0 && (
                <p className={styles.hint}>No custom lines added.</p>
              )}

              <div className={styles.customList}>
                {customLines.map((line, index) => (
                  <div key={index} className={styles.customCard}>
                    <div className={styles.customHead}>
                      <span>Custom line {index + 1}</span>
                      <button
                        type="button"
                        className={styles.iconBtn}
                        onClick={() =>
                          setCustomLines((prev) => prev.filter((_, i) => i !== index))
                        }
                        aria-label={`Remove custom line ${index + 1}`}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className={styles.customGrid}>
                      {(
                        [
                          ["product", "Product", "Cumin seeds"],
                          ["grade", "Grade", "Bold export grade"],
                          ["packaging", "Packaging", "25 kg PP bags"],
                          ["quantity", "Quantity", "5 MT"],
                        ] as const
                      ).map(([key, label, placeholder]) => (
                        <label key={key} className={styles.control}>
                          <span>{label}</span>
                          <input
                            className={styles.input}
                            value={line[key]}
                            onChange={(e) => updateCustomLine(index, key, e.target.value)}
                            placeholder={placeholder}
                          />
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className={styles.tips} aria-label="Before you send">
              <h2 className={styles.tipsTitle}>Before you send</h2>
              <ul>
                {TRADE_TIPS.map((tip) => (
                  <li key={tip}>{tip}</li>
                ))}
              </ul>
            </section>
          </div>

          {/* ---------------- right: buyer + send ---------------- */}
          <aside className={styles.rail}>
            <section className={styles.summary} aria-labelledby="summary-title">
              <h2 id="summary-title" className={styles.summaryTitle}>
                Enquiry summary
              </h2>

              <dl className={styles.totals}>
                <div>
                  <dt>Catalogue lines</dt>
                  <dd>{items.length}</dd>
                </div>
                <div>
                  <dt>Custom lines</dt>
                  <dd>{customLines.filter((l) => l.product.trim()).length}</dd>
                </div>
                <div className={styles.totalRow}>
                  <dt>Indicative value</dt>
                  <dd>{indicative > 0 ? inr(indicative) : "On request"}</dd>
                </div>
              </dl>
              <p className={styles.fine}>
                Based on listed per-kg rates. Taxes and transport as applicable. Final
                pricing is confirmed in the quotation.
              </p>

              <div className={styles.buyerGrid}>
                {(
                  [
                    ["name", "Buyer name", "John Carter"],
                    ["company", "Company", "Carter Foods LLC"],
                    ["country", "Country", "United Kingdom"],
                    ["email", "Email", "buyer@company.com"],
                    ["whatsapp", "WhatsApp", "+44 7XXX XXXXXX"],
                  ] as const
                ).map(([name, label, placeholder]) => (
                  <label key={name} className={styles.control}>
                    <span>{label}</span>
                    <input
                      name={name}
                      type={name === "email" ? "email" : "text"}
                      className={styles.input}
                      value={buyer[name]}
                      onChange={updateBuyer}
                      placeholder={placeholder}
                    />
                  </label>
                ))}
                <label className={`${styles.control} ${styles.wide}`}>
                  <span>Notes</span>
                  <textarea
                    name="notes"
                    className={`${styles.input} ${styles.notes}`}
                    value={buyer.notes}
                    onChange={updateBuyer}
                    placeholder="Destination port, certifications, private label or shipment terms."
                  />
                </label>
              </div>

              <div className={styles.sendGroup}>
                <a
                  href={canSend ? whatsappUrl : undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-disabled={!canSend}
                  className={`${styles.sendBtn} ${styles.sendPrimary} ${
                    canSend ? "" : styles.sendOff
                  }`}
                >
                  <MessageCircle size={18} />
                  Send on WhatsApp
                </a>
                <a
                  href={canSend ? emailUrl : undefined}
                  aria-disabled={!canSend}
                  className={`${styles.sendBtn} ${styles.sendSecondary} ${
                    canSend ? "" : styles.sendOff
                  }`}
                >
                  <Mail size={18} />
                  Send by email
                </a>
                {!canSend && (
                  <p className={styles.fine}>Add at least one product to send.</p>
                )}
              </div>

              <div className={styles.contactRow}>
                <a href={settings.whatsappHref} target="_blank" rel="noopener noreferrer">
                  {settings.contactPhone}
                </a>
                <a href={settings.emailHref}>{settings.contactEmail}</a>
              </div>
            </section>

            <Link href="/products" className={styles.moreLink}>
              Browse more products
              <ArrowUpRight size={16} />
            </Link>
          </aside>
        </div>
      </div>
    </section>
  );
}
