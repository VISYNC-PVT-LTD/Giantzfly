import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import { categories, products } from "@/data/products";
import styles from "./products.module.css";

const art: Record<string, string> = {
  "whole-spices": "/assets/categories/whole-spices.png",
  "powder-spices": "/assets/categories/powder-spices.png",
  vegetables: "/assets/categories/vegetables.png",
  "dry-fruits": "/assets/categories/dry-fruits.png",
  makhana: "/assets/categories/makhana.png",
};

export default function ProductsPage() {
  return (
    <main className={styles.catalog}>
      <section className={styles.hero}>
        <div className="container">
          <p className={styles.kicker}>
            Export catalogue / {products.length} lines
          </p>
          <h1>
            Clear specifications.
            <br />
            <em>Compact decisions.</em>
          </h1>
          <p>
            Origin, grade, MOQ and packaging—without oversized cards or retail
            checkout noise.
          </p>
        </div>
      </section>
      <section className={styles.categorySection}>
        <div className="container">
          <div className={styles.categories}>
            {categories.map((c, i) => (
              <Link href={`/products/${c.slug}`} key={c.slug}>
                <span>0{i + 1}</span>
                <img src={art[c.slug]} alt="" />
                <div>
                  <h2>{c.name}</h2>
                  <p>{c.description}</p>
                  <div className={styles.categoryTags}>
                    {c.highlights.map((name) => (
                      <span key={name} className={styles.categoryTag}>
                        {name}
                      </span>
                    ))}
                  </div>
                </div>
                <ArrowUpRight size={18} />
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className={styles.products}>
        <div className="container">
          <div className={styles.filterBar}>
            <span>All export lines</span>
            <span>{products.length} products · EXW / FOB / CIF</span>
          </div>
          <div className={styles.productGrid}>
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}