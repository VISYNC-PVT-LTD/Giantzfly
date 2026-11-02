import { notFound } from "next/navigation";
import Link from "next/link";
import ProductCard from "@/components/product/ProductCard";
import { categories, getCategoryMeta, getProductsByCategory } from "@/lib/catalog";
import styles from "../products.module.css";

export function generateStaticParams() {
  return categories.map((category) => ({ category: category.slug }));
}
export const revalidate = 60;

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const meta = getCategoryMeta(category);
  if (!meta) notFound();
  const items = await getProductsByCategory(category);
  const withOrigin = items.filter((item) => item.productionArea);
  const showPotential = withOrigin.some((item) => item.exportPotential);
  return (
    <>
      <section className={`page-hero ${styles.pageHero}`}>
        <div className="container">
          <span className="eyebrow">{meta.name}</span>
          <h1 className={styles.pageTitle}>
            {meta.name} for importers and distributors.
          </h1>
          <p className={styles.pageHeroText}>{meta.description}</p>
          <div className="hero-actions">
            <Link href="/products" className="btn btn-secondary">
              View Full Catalog
            </Link>
            <Link href="/quote-cart" className="btn btn-primary">
              Open Quote Cart
            </Link>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className={styles.productGrid}>
            {items.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {items.length === 0 && (
            <p role="status">
              No products are currently published in this category.{" "}
              <Link href="/contact">Ask us about your requirements</Link>.
            </p>
          )}

          {withOrigin.length > 0 && (
            <div className={styles.originTableWrap}>
              <h2 className={styles.originTableTitle}>
                Production areas and value addition
              </h2>
              <div className={styles.originTableScroll}>
                <table className={styles.originTable}>
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Major production area</th>
                      {showPotential && <th>Export potential</th>}
                      <th>Value addition</th>
                    </tr>
                  </thead>
                  <tbody>
                    {withOrigin.map((product) => (
                      <tr key={product.id}>
                        <td>{product.name}</td>
                        <td>{product.productionArea ?? product.origin}</td>
                        {showPotential && (
                          <td
                            aria-label={product.exportPotential ? `${product.exportPotential} out of 5` : undefined}
                            className={styles.originStars}
                          >
                            {product.exportPotential ? "\u2605".repeat(product.exportPotential) : "\u2014"}
                          </td>
                        )}
                        <td>{product.valueAddition}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
