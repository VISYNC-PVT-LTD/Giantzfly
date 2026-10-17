import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products } from "@/data/products";
import ProductQuoteActions from "@/components/product/ProductQuoteActions";
import type { Product } from "@/types";
import ProductImageCarousel from "./ProductImageCarousel";
import styles from "./detail.module.css";

export function generateStaticParams() {
  return products.map(({ category, slug }) => ({ category, slug }));
}

function getRelatedProducts(category: string, slug: string) {
  return products
    .filter((item) => item.category === category && item.slug !== slug)
    .slice(0, 3);
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const product: Product | undefined = products.find(
    (item) => item.category === category && item.slug === slug,
  );
  if (!product) notFound();

  const relatedProducts = getRelatedProducts(category, slug);

  const tradeTerms = [
    { label: "Price", value: "Available on request" },
    { label: "Shipment terms", value: "EXW / FOB / CIF / CFR" },
    { label: "Documentation", value: "COA, COO, phytosanitary on request, Other Documents provided as per request." },
    { label: "Lead time", value: "Confirmed at order stage" },
  ];

  const buyerNotes = [
    "Ideal for: Importers, distributors, spice manufacturers, private-label brands and retail buyers.",
    "Buyer specifications: Supply can be tailored to agreed quality and commercial requirements.",
    "Samples: Product samples can be arranged for buyer evaluation before order confirmation.",
    "Pricing: Quotation depends on quantity, specifications, destination and shipment terms.",
    "Order support: Pre-shipment confirmation and coordination available throughout the order process.",
    "MOQ: Flexible based on product specification and packaging requirements.",
  ];

  return (
    <div className={styles.page}>
      <section className="container">
        <div className={styles.top}>
          <div className={styles.gallery}>
            <ProductImageCarousel
              images={[product.image, product.imageSecondary].filter(
                (src): src is string => Boolean(src),
              )}
              name={product.name}
            />
          </div>

          <div>
            <div className={styles.head}>
              <span className={styles.eyebrow}>
                {product.category.replace("-", " ")}
              </span>
              <h1 className={styles.title}>{product.name}</h1>
              <p className={styles.shortDesc}>{product.shortDescription}</p>
            </div>

            <div className={styles.facts}>
              <div className={styles.fact}>
                <span className={styles.factLabel}>Origin</span>
                <span className={styles.factValue}>{product.origin}</span>
              </div>
              <div className={styles.fact}>
                <span className={styles.factLabel}>Grade</span>
                <span className={styles.factValue}>All Grade Available</span>
              </div>
              <div className={styles.fact}>
                <span className={styles.factLabel}>Minimum order</span>
                <span className={styles.factValue}>
                  {product.moqOptions && product.moqOptions.length > 0 ? (
                    <>
                      {product.moqOptions.join(" · ")}
                    </>
                  ) : (
                    <>
                      {product.moq} {product.moqUnit}
                    </>
                  )}
                </span>
              </div>
            </div>

            <div className={styles.terms}>
              {tradeTerms.map((term) => (
                <div key={term.label} className={styles.term}>
                  <span className={styles.termLabel}>{term.label}</span>
                  <span className={styles.termValue}>{term.value}</span>
                </div>
              ))}
            </div>

            <div className={styles.actions}>
              <ProductQuoteActions product={product} />
            </div>
          </div>
        </div>
      </section>

      <section className="container">
        <div className={styles.blocks}>
          <div className={styles.block}>
            <h2 className={styles.blockHead}>About this product</h2>
            {product.aboutParagraphs && product.aboutParagraphs.length > 0 ? (
              product.aboutParagraphs.map((paragraph) => (
                <p key={paragraph} className={styles.body}>
                  {paragraph}
                </p>
              ))
            ) : (
              <p className={styles.body}>{product.description}</p>
            )}
          </div>

          <div className={styles.block}>
            <div className={styles.twoCol}>
              <div>
                <h2 className={styles.blockHead}>Packaging options</h2>
                <ul className={styles.list}>
                  {product.packagingOptions.map((pack) => (
                    <li key={pack} className={styles.listItem}>
                      {pack}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className={styles.block}>
            <h2 className={styles.blockHead}>Trade enquiry guidance</h2>
            <ul className={styles.list}>
              {buyerNotes.map((note) => (
                <li key={note} className={styles.listItem}>
                  {note}
                </li>
              ))}
            </ul>
            <p className={styles.body}>
              Reliable Supply · Flexible Solutions · Buyer-Focused Service
            </p>
          </div>
        </div>
      </section>

      {relatedProducts.length > 0 && (
        <section className="container">
          <div className={styles.relatedSection}>
            <div className={styles.relatedHead}>
              <div>
                <span className={styles.eyebrow}>Related products</span>
                <h2 className={styles.relatedTitle}>
                  Explore more from this category
                </h2>
              </div>

              <Link
                href={`/products/${product.category}`}
                className={styles.textLink}
              >
                View category →
              </Link>
            </div>

            <div className={styles.relatedGrid}>
              {relatedProducts.map((item) => (
                <article key={item.id} className={styles.relatedItem}>
                  <div className={styles.relatedThumb}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 960px) 50vw, 33vw"
                      className={styles.imgCover}
                    />
                  </div>

                  <h3 className={styles.relatedName}>{item.name}</h3>
                  <p className={styles.relatedDesc}>{item.shortDescription}</p>
                  <p className={styles.relatedMeta}>
                    {item.grade} · MOQ {item.moqOptions && item.moqOptions.length > 0 ? item.moqOptions[0] : `${item.moq} ${item.moqUnit}`}
                  </p>

                  <div className={styles.relatedLinks}>
                    <Link
                      href={`/products/${item.category}/${item.slug}`}
                      className={styles.textLink}
                    >
                      View product →
                    </Link>
                    <Link href="/quote-cart" className={styles.textLink}>
                      Add to quote →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
