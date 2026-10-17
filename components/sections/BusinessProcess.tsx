"use client";

import { useState } from "react";
import styles from "./BusinessProcess.module.css";

type Step = {
  n: string;
  title: string;
  copy: string;
  phase: "Agree" | "Make" | "Move" | "After";
};

const STEPS: Step[] = [
  {
    n: "01",
    title: "Inquiry",
    phase: "Agree",
    copy: "You send product, grade, volume and destination port. We confirm feasibility the same day.",
  },
  {
    n: "02",
    title: "Quotation",
    phase: "Agree",
    copy: "Price, MOQ, lead time and Incoterm put in writing. No moving numbers later.",
  },
  {
    n: "03",
    title: "Sample Approval",
    phase: "Agree",
    copy: "A real lot sample against your spec sheet. You approve before anything scales.",
  },
  {
    n: "04",
    title: "Purchase Order",
    phase: "Agree",
    copy: "Terms locked: Incoterm, payment route, packing standard, shipment window.",
  },
  {
    n: "05",
    title: "Production",
    phase: "Make",
    copy: "Sourced at origin, cleaned, sorted and graded to the approved sample.",
  },
  {
    n: "06",
    title: "Quality Inspection",
    phase: "Make",
    copy: "Lab and visual checks on moisture, purity and foreign matter before packing.",
  },
  {
    n: "07",
    title: "Packaging",
    phase: "Make",
    copy: "Export-grade packing sized to the lane, the climate and the stack height.",
  },
  {
    n: "08",
    title: "Export Documentation",
    phase: "Move",
    copy: "Invoice, packing list, COO, phyto and compliance papers ready before booking.",
  },
  {
    n: "09",
    title: "Shipping",
    phase: "Move",
    copy: "Vessel booked, container stuffed, sealed and photographed at loading.",
  },
  {
    n: "10",
    title: "Delivery",
    phase: "Move",
    copy: "Tracked to port of discharge and handed to your nominated consignee.",
  },
  {
    n: "11",
    title: "After Sales Support",
    phase: "After",
    copy: "Arrival feedback, claim handling if needed, and the spec carried into your repeat order.",
  },
];

const PHASES = [
  { key: "Agree", label: "Agree the deal", range: "01 - 04" },
  { key: "Make", label: "Make the goods", range: "05 - 07" },
  { key: "Move", label: "Move the cargo", range: "08 - 10" },
  { key: "After", label: "Stay on the file", range: "11" },
] as const;

export default function BusinessProcess({
  embedded = false,
}: {
  embedded?: boolean;
}) {
  const [open, setOpen] = useState<string | null>("01");
  const Root = embedded ? "div" : "section";

  return (
    <Root
      className={embedded ? styles.embedded : styles.section}
      aria-labelledby="process-heading"
    >
      <div className={styles.container}>
        <header className={styles.head}>
          <div>
            <span className={styles.eyebrow}>How We Work</span>
            <h2 id="process-heading" className={styles.title}>
              Business Process
            </h2>
            <p className={styles.lead}>
              Eleven steps from first inquiry to after-sales support.
            </p>
          </div>

          <ul className={styles.phases}>
            {PHASES.map((p) => (
              <li key={p.key} className={styles.phase}>
                <span className={styles.phaseRange}>{p.range}</span>
                <span className={styles.phaseLabel}>{p.label}</span>
              </li>
            ))}
          </ul>
        </header>

        {/* progress rail */}
        <div className={styles.rail} aria-hidden="true">
          <span className={styles.railFill} />
        </div>

        <ol className={styles.flow}>
          {STEPS.map((s, i) => {
            const isOpen = open === s.n;
            return (
              <li
                key={s.n}
                className={`${styles.step} ${isOpen ? styles.stepOpen : ""}`}
                style={{ ["--i" as string]: i }}
              >
                <button
                  type="button"
                  className={styles.stepBtn}
                  onClick={() => setOpen(isOpen ? null : s.n)}
                  onMouseEnter={() => setOpen(s.n)}
                  aria-expanded={isOpen}
                >
                  <span className={styles.numWrap}>
                    <span className={styles.num}>{s.n}</span>
                                        <span className={styles.stepTitle}>{s.title}</span>

                  </span>

                  <span className={styles.stepBody}>
                    <span className={styles.stepPhase}>{s.phase}</span>
                    <span className={styles.stepCopy}>{s.copy}</span>
                  </span>

                  <span className={styles.chev} aria-hidden="true" />
                </button>
              </li>
            );
          })}
        </ol>

        <p className={styles.footNote}>
          Every step has one owner on our side, so you never re-explain your
          order to a new person mid-shipment.
        </p>
      </div>
    </Root>
  );
}
