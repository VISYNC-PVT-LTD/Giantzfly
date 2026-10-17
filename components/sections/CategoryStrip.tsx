import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { categories, products } from "@/data/products";
import styles from "./CategoryStrip.module.css";

const notes: Record<string, string> = {
  "whole-spices": "Origin graded, cleaned and moisture checked",
  "powder-spices": "Ground, sieved and colour tested",
  vegetables: "Farm direct, ventilated and reefer loads",
  "dry-fruits": "Konkan, Nashik and Solapur origins",
  makhana: "Bulk, flavoured and private label",
};

export default function CategoryStrip() {
  return (
    <section className={styles.section}>
      <img
        src="/assets/decor/spice-burst.svg"
        alt=""
        className={styles.decor}
        aria-hidden="true"
      />
      <div className="container">
        <div className={styles.head}>
          <div>
            <span className={styles.eyebrow}>Our products</span>
            <h2 className={styles.heading}>
              Five categories, {products.length} export lines.
            </h2>
          </div>
          <Link href="/products" className={styles.headLink}>
            Full catalogue <ArrowUpRight size={15} />
          </Link>
        </div>

        <div className={styles.grid}>
          {categories.map((category, index) => {
            const count = products.filter(
              (product) => product.category === category.slug,
            ).length;
            return (
              <Link
                key={category.slug}
                href={`/products/${category.slug}`}
                className={styles.card}
              >
                <span
                  className={styles.media}
                  style={{ backgroundImage: `url('${category.image}')` }}
                  aria-hidden="true"
                />
                <span className={styles.overlay} aria-hidden="true" />
                <span className={styles.cardBody}>
                  <small className={styles.index}>0{index + 1}</small>
                  <strong>{category.name}</strong>
                  <em>{notes[category.slug]}</em>
                  <span className={styles.count}>{count} lines</span>
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
