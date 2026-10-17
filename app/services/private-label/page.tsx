import Link from "next/link";
import s from "@/components/story/story.module.css";
import b from "@/components/story/brief.module.css";

export const metadata = {
  title: "Private Label | Giantzfly Exim LLP",
  description:
    "Your brand on our supply chain: private-label spices, dry fruits and makhana packed, labelled and shipped from India.",
};

const PHOTO_SHELF =
  "https://images.pexels.com/photos/4019401/pexels-photo-4019401.jpeg?auto=compress&cs=tinysrgb&w=2400";
const PHOTO_AISLE =
  "https://images.pexels.com/photos/20489330/pexels-photo-20489330.jpeg?auto=compress&cs=tinysrgb&w=2400";
const PHOTO_STORE =
  "https://images.pexels.com/photos/5498225/pexels-photo-5498225.jpeg?auto=compress&cs=tinysrgb&w=2400";

export default function PrivateLabelPage() {
  return (
    <main className={`${s.page} ${b.wrap}`}>
      {/* ---------- BANNER (unchanged) ---------- */}
      <section
        className={s.opening}
        style={{ backgroundImage: `url("${PHOTO_SHELF}")` }}
      >
        <div className={s.shell}>
          <div className={s.panel}>
            <span className={s.kicker}>Service 01</span>
            <h1 className={s.display}>
              Private label.
              <span className={s.displaySoft}>Your name on our lot.</span>
            </h1>
            <p className={s.lede}>
              We handle origin, grade, packing and paperwork. You own the brand
              and the shelf.
            </p>
          </div>
        </div>
      </section>

      {/* ---------- FIRST SECTION IMAGE (unchanged) ---------- */}
      <section className={s.chapter}>
        <img
          src="/assets/illustrations/catalog-grid.svg"
          alt=""
          aria-hidden="true"
          className={s.decorRight}
        />
        <div className={b.shell}>
          <div className={b.head}>
            <span className={b.kicker}>The short version</span>
            <h2 className={b.heading}>
              A finished retail product, made in India, arriving under your
              label.
            </h2>
          </div>

          <p className={b.ledeLead}>
            You send us artwork, a pack size and a grade. We come back with a
            physical sample, a landed cost and a lead time &mdash; then repeat
            it every season without you rebuilding the brief.
          </p>

          <p className={b.lede}>
            Private label only works when the boring parts are reliable. So the
            grade is fixed in writing before a price is quoted, the film and
            board are chosen for your transit rather than for the photograph,
            and the label is checked against{" "}
            <strong>your destination market&apos;s rules</strong> &mdash;
            declarations, net weight, allergen text, batch and best-before
            format, importer details, barcode placement.
          </p>

          <p className={b.lede}>
            What you get back is a repeatable SKU: the same fill weight, the
            same colour on the pouch, the same seal integrity, from a supplier
            who keeps your artwork files and packing spec on record so re-orders
            are a one-line email.
          </p>

          {/* creative bit: the run, as a flow */}
          <div className={b.ribbon}>
            <div className={b.node}>
              <span className={b.nodeStep}>Step 01</span>
              <span className={b.nodeTitle}>Brief</span>
              <span className={b.nodeNote}>
                Product, grade, pack size, market and target shelf price.
              </span>
            </div>
            <div className={b.node}>
              <span className={b.nodeStep}>Step 02</span>
              <span className={b.nodeTitle}>Artwork</span>
              <span className={b.nodeNote}>
                Dielines and print-ready files checked for legal text.
              </span>
            </div>
            <div className={b.node}>
              <span className={b.nodeStep}>Step 03</span>
              <span className={b.nodeTitle}>Sample</span>
              <span className={b.nodeNote}>
                A real filled, sealed, labelled pack in your hands.
              </span>
            </div>
            <div className={b.node}>
              <span className={b.nodeStep}>Step 04</span>
              <span className={b.nodeTitle}>Run</span>
              <span className={b.nodeNote}>
                Production against the approved sample, with batch coding.
              </span>
            </div>
            <div className={b.node}>
              <span className={b.nodeStep}>Step 05</span>
              <span className={b.nodeTitle}>Ship</span>
              <span className={b.nodeNote}>
                Export documents, seal photos and a booking to your port.
              </span>
            </div>
          </div>

          <div className={b.split}>
            <article className={b.card}>
              <span className={b.cardTag}>Formats</span>
              <h3 className={b.cardTitle}>Retail and bulk, same lot</h3>
              <p className={b.cardText}>
                Dry fruits, spices, spice blends, makhana and health foods;
                personal care products such as face wash, body lotion, shampoo,
                hair oil and face serum; and herbal & Ayurvedic products
                including herbal powders, essential oils and wellness
                formulations - all built on the same approved-batch discipline.
              </p>
            </article>
            <article className={b.card}>
              <span className={b.cardTag}>Compliance</span>
              <h3 className={b.cardTitle}>Label checked, not guessed</h3>
              <p className={b.cardText}>
                We review declarations, weights, allergens and date coding
                against the destination market before the print run, because a
                rejected label is a rejected container.
              </p>
            </article>
            <article className={`${b.card} ${b.cardWide} ${b.cardDark}`}>
              <span className={b.cardTag}>Start small</span>
              <h3 className={b.cardTitle}>
                Launch one SKU before you commit a range
              </h3>
              <p className={b.cardText}>
                Most partnerships begin with a single line and a modest MOQ.
                Sell it, learn from it, then scale the ones that move &mdash; we
                keep your spec on file so the second run is faster than the
                first.
              </p>
            </article>
          </div>

          <ul className={b.tags}>
            <li className={b.tag}>Pouches</li>
            <li className={b.tag}>Jars</li>
            <li className={b.tag}>Cartons</li>
            <li className={b.tag}>Gift packs</li>
            <li className={b.tag}>Bulk cases</li>
          </ul>
        </div>
      </section>

      {/* ---------- STATEMENT PHOTO (replaced) ---------- */}
      <section className={s.statement}>
        <div className={s.statementText}>
          <p className={s.quote}>
            Your brand. <span className={s.quoteStrong}>Our discipline behind it.</span>
          </p>
          <p className={s.quoteBy}>Private label, plainly</p>
          <div className={b.linkRow}>
            <Link className={b.link} href="/contact">
              Start a private-label brief &rarr;
            </Link>
            <Link className={b.link} href="/services/packaging-consultancy">
              Packaging consultancy &rarr;
            </Link>
            <Link className={b.link} href="/products">
              See the catalogue &rarr;
            </Link>
          </div>
        </div>
        <div
          className={s.statementPhoto}
          style={{ backgroundImage: `url("${PHOTO_STORE}")` }}
          role="img"
          aria-label="Packaged goods on a retail shelf"
        />
      </section>

      {/* ---------- SECOND IMAGE SECTION (kept) ---------- */}
      <section className={b.sectionTint}>
        <img
          src="/assets/illustrations/service-factory.svg"
          alt=""
          aria-hidden="true"
          className={s.decorLeft}
        />
        <div className={b.shell}>
          <div className={b.head}>
            <span className={b.kicker}>What we need from you</span>
            <h2 className={b.heading}>Three things, and we can quote.</h2>
          </div>
          <p className={b.lede}>
            The product and grade you want, the pack size and format, and the
            destination market. Artwork can follow &mdash; we will send dielines
            once the format is fixed, and our team will flag anything that will
            not clear customs or print cleanly.
          </p>
          <div className={b.facts}>
            <div className={b.fact}>
              <span className={b.factValue}>48h</span>
              <span className={b.factLabel}>Typical quotation turnaround</span>
            </div>
            <div className={b.fact}>
              <span className={b.factValue}>1</span>
              <span className={b.factLabel}>
                Approved sample before production
              </span>
            </div>
            <div className={b.fact}>
              <span className={b.factValue}>41</span>
              <span className={b.factLabel}>Lines available to label</span>
            </div>
          </div>
        </div>
      </section>

      <div hidden aria-hidden="true" data-photo={PHOTO_AISLE} />
    </main>
  );
}
