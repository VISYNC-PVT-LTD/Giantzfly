"use client";

import Link from "next/link";
import { useQuoteCart } from "@/context/QuoteCartContext";
import { categories } from "@/data/products";
import type { Product } from "@/types";
import styles from "./ProductCard.module.css";

const categoryArtwork: Record<string, string> = Object.fromEntries(
  categories.map((category) => [category.slug, category.image]),
);

export default function ProductCard({ product }: { product: Product }) {
  const { addItem, hasItem } = useQuoteCart();

  return (
    <article className={styles.card}>
      <div className={styles.mediaWrap}>
        {product.badge && <span className={styles.badge}>{product.badge}</span>}
        <img
          src={product.image || categoryArtwork[product.category]}
          alt={product.name}
          className={styles.image}
          loading="lazy"
          width={1200}
          height={900}
        />
        {product.imageSecondary && (
          <img
            src={product.imageSecondary}
            alt=""
            aria-hidden="true"
            className={styles.imageAlt}
            loading="lazy"
            width={1200}
            height={900}
          />
        )}
      </div>

      <div className={styles.body}>
        <div className={styles.meta}>
          <span className={styles.category}>
            {product.category.replaceAll("-", " ")}
          </span>
          <span className={styles.origin}>{product.origin}</span>
        </div>

        <h3 className={styles.title}>{product.name}</h3>
        <div className={styles.detailGrid}>
          <div>
            <span className={styles.label}>Grade</span>
            <span className={styles.value}>{product.grade || "On request"}</span>
          </div>
          {product.pricePerUnit && (
            <div>
              <span className={styles.label}>Price</span>
              <span className={styles.value}>{product.pricePerUnit}</span>
            </div>
          )}
          <div>
            <span className={styles.label}>MOQ</span>
            <span className={styles.value}>
              {product.moqOptions && product.moqOptions.length > 0
                ? product.moqOptions[0]
                : `${product.moq} ${product.moqUnit}`}
            </span>
          </div>
        </div>

        <div className={styles.actions}>
          <Link
            href={`/products/${product.category}/${product.slug}`}
            className="btn btn-secondary"
          >
            View Details
          </Link>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => addItem(product)}
          >
            {hasItem(product.id) ? "Added to Quote" : "Add to Quote"}
          </button>
        </div>
      </div>
    </article>
  );
}
