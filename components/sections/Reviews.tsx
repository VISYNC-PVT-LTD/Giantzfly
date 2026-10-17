import { client } from "@/sanity/lib/client";
import { allReviewsQuery } from "@/sanity/lib/queries";
import styles from "./Reviews.module.css";

interface Review {
  _id: string;
  name: string;
  company?: string;
  country?: string;
  rating: number;
  text: string;
  date?: string;
}

const STAR = "★";

export default async function Reviews() {
  const reviews: Review[] = await client.fetch(allReviewsQuery);

  return (
    <section className="section">
      <div className="container-fluid">
        {/* Header */}
        <div className="section-head">
          <svg
            className="quote-mark"
            viewBox="0 0 32 32"
            width="40"
            height="40"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12 8c-4 1.5-6 4.7-6 9.6V24h8v-8H9.5c.2-2.4 1.4-3.7 3.5-4.4L12 8Zm14 0c-4 1.5-6 4.7-6 9.6V24h8v-8h-4.5c.2-2.4 1.4-3.7 3.5-4.4L26 8Z" />
          </svg>
          <span className="kicker">Buyer Feedback</span>
          <h2 className="section-title">
            From sourcing teams across global markets.
          </h2>
          <p className="section-copy">
            Trade relationships are built on consistent supply, complete
            documentation, and direct communication.
          </p>
        </div>

        {reviews.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "var(--space-16) 0",
              color: "var(--text-muted)",
            }}
          >
            <p style={{ fontSize: "var(--text-base)" }}>
              No reviews yet. Be the first to share your experience.
            </p>
          </div>
        ) : (
          <div className={styles.grid}>
            {reviews.map((r) => (
              <article key={r._id} className={`card ${styles.card}`}>
                <div className={styles.head}>
                  <div className={styles.who}>
                    <div className={styles.avatar}>
                      {r.name.charAt(0).toUpperCase()}
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <p className={styles.name}>{r.name}</p>
                      {(r.company || r.country) && (
                        <p className={styles.meta}>
                          {[r.company, r.country].filter(Boolean).join(" · ")}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className={styles.stars} aria-hidden="true">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <span
                        key={s}
                        className={
                          s <= r.rating ? styles.starFilled : styles.star
                        }
                      >
                        {STAR}
                      </span>
                    ))}
                  </div>
                </div>

                <blockquote className={styles.quote}>{r.text}</blockquote>

                <p className={styles.footer}>
                  <strong>Verified Buyer</strong>
                  {r.date &&
                    ` · ${new Date(r.date).toLocaleDateString("en-GB", {
                      month: "short",
                      year: "numeric",
                    })}`}
                </p>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
