import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import { categories, getProducts, searchProducts } from "@/lib/catalog";
import styles from "./products.module.css";

const art: Record<string, string> = Object.fromEntries(
  categories.map((category) => [category.slug, category.image]),
);

export const revalidate = 60;

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string | string[] }>;
}) {
  const [products, params] = await Promise.all([getProducts(), searchParams]);
  const query = (Array.isArray(params.search) ? params.search[0] : params.search)?.trim() || "";
  const visibleProducts = searchProducts(products, query);
  const catalogCategories = categories.map((category) => ({
    ...category,
    highlights: products.filter((product) => product.category === category.slug)
      .slice(0, 4).map((product) => product.name),
  }));
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
            Origin, grade, MOQ and packaging, without oversized cards or retail
            checkout noise.
          </p>
        </div>
      </section>
      <section className={styles.categorySection}>
        <div className="container">
          <div className={styles.categories}>
            {catalogCategories.map((c, i) => (
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
            <span>{query ? `Search results for “${query}”` : "All export lines"}</span>
            <span>{visibleProducts.length} products, EXW / FOB / CIF</span>
          </div>
          <div className={styles.productGrid}>
            {visibleProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          {visibleProducts.length === 0 && (
            <p role="status">
              {query ? "No products match your search." : "No products are currently published."}{" "}
              <Link href={query ? "/products" : "/contact"}>
                {query ? "View all products" : "Contact us about your requirements"}
              </Link>
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
