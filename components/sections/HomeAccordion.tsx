"use client";

import { useState, type KeyboardEvent } from "react";
import styles from "./HomeAccordion.module.css";

const ABOUT_INTRO = [
  "Giantzfly Exim LLP is an India-based export, import, sourcing and supply company focused on connecting quality Indian products with markets across the globe.",
  "We work across multiple product categories including agricultural produce, spices, dry fruits, food products, herbal and wellness products, cosmetics, personal care products, and packaging solutions.",
  "Our approach combines reliable sourcing, quality control, responsible packaging, competitive pricing and efficient supply-chain coordination to create dependable solutions for international buyers.",
  "We believe international trade is not simply about moving products from one country to another. It is about building trust, consistency and long-term business relationships.",
];

const ABOUT_SUBSECTIONS = [
  {
    id: "who-we-are",
    title: "Who We Are",
    paragraphs: [
      "Giantzfly Exim LLP was established with a vision to build a professionally managed Indian export business that delivers quality products and dependable international trade solutions.",
      "We collaborate with manufacturers, processors, farmers, suppliers, packaging partners and other stakeholders to develop reliable supply channels for buyers in international markets.",
      "From product sourcing and supplier coordination to quality requirements, packaging and export documentation, we aim to provide a streamlined experience for our customers.",
    ],
  },
  {
    id: "what-we-do",
    title: "What We Do",
    paragraphs: [],
    categories: [
      {
        title: "Agricultural & Fresh Produce",
        intro: "We source and supply selected agricultural products and fresh produce from India, including products such as:",
        items: ["Onion", "Coconut", "Ginger", "Turmeric", "Pumpkin", "Elephant Foot Yam", "Other seasonal agricultural products"],
        note: "Our objective is to connect international buyers with dependable Indian sourcing partners while maintaining product quality and appropriate export packaging.",
      },
      {
        title: "Spices & Food Ingredients",
        intro: "We offer a growing range of Indian spices and food ingredients, including:",
        items: ["Turmeric", "Black Pepper", "Green Cardamom", "Coriander", "Cumin", "Ginger", "Red Chilli", "Mustard", "Other whole spices and processed ingredients"],
        note: "We work with qualified suppliers to support buyer-specific requirements for specifications, packaging and quantities.",
      },
      {
        title: "Dry Fruits & Dried Products",
        intro: "Our sourcing portfolio includes selected dry fruits and dried food products such as:",
        items: ["Cashews", "Raisins", "Dates", "Makhana", "Coconut products", "Other dried fruits and food ingredients"],
        note: "We focus on consistent sourcing, suitable packaging and export-ready supply.",
      },
      {
        title: "Herbal, Wellness & Personal Care",
        lead: "We are developing a portfolio of herbal, wellness, cosmetic and personal-care products designed for domestic and international markets.",
        intro: "Our capabilities include sourcing and developing products such as:",
        items: ["Herbal powders", "Moringa products", "Natural wellness products", "Face wash", "Body lotion", "Skincare products", "Personal-care products"],
        note: "We also explore private-label and customized product development opportunities for selected markets.",
      },
      {
        title: "Packaging Solutions",
        lead: "Packaging is an important part of our business ecosystem.",
        intro: "Through our packaging-focused capabilities, we support businesses with:",
        items: ["Printed packaging", "Plain packaging", "Corrugated boxes", "Cartons", "Labels", "Flexible packaging", "Product packaging development", "Packaging sourcing", "Packaging cost optimization"],
        note: "Our objective is to help businesses achieve packaging that is functional, attractive, cost-effective and suitable for the intended market.",
      },
    ],
  },
  {
    id: "business-approach",
    title: "Our Business Approach",
    paragraphs: [
      "Source Better. Trade Smarter. Grow Globally.",
      "We continuously work to identify high-quality products, capable suppliers and new market opportunities while maintaining a strong focus on transparency, quality and customer satisfaction.",
    ],
  },
];

export default function HomeAccordion() {
  const [openSub, setOpenSub] = useState<string>("who-we-are");
  const active = ABOUT_SUBSECTIONS.find((s) => s.id === openSub) ?? ABOUT_SUBSECTIONS[0];

  function onTabKey(e: KeyboardEvent<HTMLButtonElement>, i: number) {
    const last = ABOUT_SUBSECTIONS.length - 1;
    const next = e.key === "ArrowRight" ? (i === last ? 0 : i + 1) : e.key === "ArrowLeft" ? (i === 0 ? last : i - 1) : -1;
    if (next < 0) return;
    e.preventDefault();
    setOpenSub(ABOUT_SUBSECTIONS[next].id);
    document.getElementById(`${ABOUT_SUBSECTIONS[next].id}-tab`)?.focus();
  }

  return (
    <>
      {/* ---------------- 1. About Us ---------------- */}
      <section className={styles.section} aria-labelledby="about-us-heading">
        <div className="container-fluid">
          <div className={styles.head}>
            <span className={styles.eyebrow}>About Us</span>
            <h2 id="about-us-heading" className={styles.heading}>
              Giantzfly Exim LLP
            </h2>
            {ABOUT_INTRO.map((p) => (
              <p key={p} className={styles.lead}>
                {p}
              </p>
            ))}
          </div>

          <div className={styles.tabs} role="tablist" aria-label="About Giantzfly">
            {ABOUT_SUBSECTIONS.map((sub, i) => {
              const isActive = active.id === sub.id;
              return (
                <button
                  key={sub.id}
                  type="button"
                  role="tab"
                  id={`${sub.id}-tab`}
                  aria-selected={isActive}
                  aria-controls={`${sub.id}-panel`}
                  tabIndex={isActive ? 0 : -1}
                  className={`${styles.tab} ${isActive ? styles.tabActive : ""}`}
                  onClick={() => setOpenSub(sub.id)}
                  onKeyDown={(e) => onTabKey(e, i)}
                >
                  <span className={styles.tabNum}>{String(i + 1).padStart(2, "0")}</span>
                  <span className={styles.tabTitle}>{sub.title}</span>
                </button>
              );
            })}
          </div>

          <div
            key={active.id}
            role="tabpanel"
            id={`${active.id}-panel`}
            aria-labelledby={`${active.id}-tab`}
            className={styles.panel}
          >
            {active.paragraphs.length > 0 && (
              <div className={styles.copyCols}>
                {active.paragraphs.map((p, i) => (
                  <p
                    key={p}
                    className={`${styles.subCopy} ${active.id === "business-approach" && i === 0 ? styles.tagline : ""}`}
                  >
                    {p}
                  </p>
                ))}
              </div>
            )}

            {active.categories && (
              <div className={styles.categoryGrid}>
                {active.categories.map((c) => (
                  <div key={c.title} className={styles.category}>
                    <h4 className={styles.categoryTitle}>{c.title}</h4>
                    {"lead" in c && c.lead && <p className={styles.categoryNote}>{c.lead}</p>}
                    <p className={styles.categoryIntro}>{c.intro}</p>
                    <ul className={styles.itemList}>
                      {c.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                    <p className={styles.categoryNote}>{c.note}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ---------------- 2. Our Core Values ---------------- */}
      {/* <section className={styles.sectionAlt} aria-labelledby="core-values-heading">
        <div className="container-fluid">
          <div className={styles.head}>
            <span className={styles.eyebrow}>02 Our Core Values</span>
            <h2 id="core-values-heading" className={styles.heading}>
              What every shipment is built on.
            </h2>
          </div>
          <ul className={styles.plainList}>
            {VALUES.map((v, i) => (
              <li key={v} className={styles.plainListItem}>
                <span className={styles.plainNum}>{String(i + 1).padStart(2, "0")}</span>
                {v}
              </li>
            ))}
          </ul>
        </div>
      </section> */}

      {/* ---------------- 3. Why Choose Giantzfly ---------------- */}
      {/* <section className={styles.section} aria-labelledby="why-choose-heading">
        <div className="container-fluid">
          <div className={styles.head}>
            <span className={styles.eyebrow}>03 Why Giantzfly</span>
            <h2 id="why-choose-heading" className={styles.heading}>
              Why Choose Giantzfly Exim LLP?
            </h2>
          </div>
          <ul className={styles.plainList}>
            {REASONS.map((r, i) => (
              <li key={r} className={styles.plainListItem}>
                <span className={styles.plainNum}>{String(i + 1).padStart(2, "0")}</span>
                {r}
              </li>
            ))}
          </ul>
        </div>
      </section> */}

    </>
  );
}
