import Link from "next/link";
import s from "@/components/story/story.module.css";
import b from "@/components/story/brief.module.css";

export const metadata = {
  title: "Sustainable Packaging | Giantzfly Exim LLP",
  description:
    "Recyclable, lower-waste export packaging that still survives a monsoon transit.",
};

const PHOTO_KRAFT =
  "https://images.pexels.com/photos/29914090/pexels-photo-29914090.jpeg?auto=compress&cs=tinysrgb&w=2400";
const PHOTO_PAPER_BAG =
  "https://images.pexels.com/photos/30913798/pexels-photo-30913798.jpeg?auto=compress&cs=tinysrgb&w=2400";
const PHOTO_ECO_PACK =
  "https://images.pexels.com/photos/8015893/pexels-photo-8015893.jpeg?auto=compress&cs=tinysrgb&w=2400";

export default function SustainablePackagingPage() {
  return (
    <main className={`${s.page} ${b.wrap}`}>
      {/* ---------- BANNER (unchanged) ---------- */}
      <section
        className={s.opening}
        style={{ backgroundImage: `url("${PHOTO_KRAFT}")` }}
      >
        <div className={s.shell}>
          <div className={s.panel}>
            <span className={s.kicker}>Service 02</span>
            <h1 className={s.display}>
              Sustainable packaging.
              <span className={s.displaySoft}>That still arrives intact.</span>
            </h1>
            <p className={s.lede}>
              Greener material is only greener if the goods inside it survive
              the voyage.
            </p>
          </div>
        </div>
      </section>

      {/* ---------- FIRST SECTION IMAGE (unchanged) ---------- */}
      <section className={s.chapter}>
        <img
          src="/assets/illustrations/service-eco.svg"
          alt=""
          aria-hidden="true"
          className={s.decorRight}
        />
        <div className={b.shell}>
          <div className={b.head}>
            <span className={b.kicker}>The short version</span>
            <h2 className={b.heading}>
              We reduce packaging in the order that actually helps: waste first,
              then material, then coating.
            </h2>
          </div>

          <p className={b.ledeLead}>
            A pouch made of recyclable film that fails at 80% humidity is worse
            for the planet than a slightly heavier one that lands clean &mdash;
            because a rejected container is the largest waste event in the whole
            chain.
          </p>

          <p className={b.lede}>
            So we start by removing what nobody needs:{" "}
            <strong>
              over-sized cartons, double bagging, decorative inserts and
              unnecessary void fill
            </strong>
            . Right-sizing alone usually cuts material and freight volume at the
            same time, which is the rare case where the cheaper option is also
            the cleaner one.
          </p>

          <p className={b.lede}>
            Then we change what the pack is made of &mdash; recyclable
            mono-material films, kraft and recycled board, paper-based outer
            wraps, water-based inks and reduced lamination. Every substitution
            is <strong>tested against your actual lane</strong>: transit time,
            humidity, stacking load and handling at the destination port. If it
            fails the test, we do not sell it to you as progress.
          </p>

          {/* creative bit: the substitution ladder */}
          <div className={b.ribbon}>
            <div className={b.node}>
              <span className={b.nodeStep}>Priority 01</span>
              <span className={b.nodeTitle}>Remove</span>
              <span className={b.nodeNote}>
                Cut over-packing, void fill and double bagging.
              </span>
            </div>
            <div className={b.node}>
              <span className={b.nodeStep}>Priority 02</span>
              <span className={b.nodeTitle}>Right-size</span>
              <span className={b.nodeNote}>
                Fit the carton to the goods and the pallet to the container.
              </span>
            </div>
            <div className={b.node}>
              <span className={b.nodeStep}>Priority 03</span>
              <span className={b.nodeTitle}>Substitute</span>
              <span className={b.nodeNote}>
                Recyclable mono-films, kraft and recycled board.
              </span>
            </div>
            <div className={b.node}>
              <span className={b.nodeStep}>Priority 04</span>
              <span className={b.nodeTitle}>Test</span>
              <span className={b.nodeNote}>
                Humidity, drop, stack and seal integrity on your lane.
              </span>
            </div>
            <div className={b.node}>
              <span className={b.nodeStep}>Priority 05</span>
              <span className={b.nodeTitle}>Prove</span>
              <span className={b.nodeNote}>
                Ship a trial lot before the range is switched over.
              </span>
            </div>
          </div>

          <div className={b.split}>
            <article className={b.card}>
              <span className={b.cardTag}>Materials</span>
              <h3 className={b.cardTitle}>Recyclable by default</h3>
              <p className={b.cardText}>
                Compostable, biodegradable, recyclable and paper-based
                packaging alternatives - the same eco-friendly packaging
                categories we export today - chosen so the pack can realistically
                enter a recycling or composting stream at destination.
              </p>
            </article>
            <article className={b.card}>
              <span className={b.cardTag}>Protection</span>
              <h3 className={b.cardTitle}>Built for the monsoon lane</h3>
              <p className={b.cardText}>
                Moisture barriers, correct board grade and load-bearing stacks,
                because spices and dry fruit fail from humidity long before they
                fail from impact.
              </p>
            </article>
            <article className={`${b.card} ${b.cardWide} ${b.cardDark}`}>
              <span className={b.cardTag}>Honest limits</span>
              <h3 className={b.cardTitle}>
                Some products are not ready to switch
              </h3>
              <p className={b.cardText}>
                A few lines still need a barrier layer that has no clean
                recyclable equivalent for a long sea transit. We will tell you
                which ones, rather than quietly shipping a pack that
                under-performs so the brief looks satisfied.
              </p>
            </article>
          </div>

          <ul className={b.tags}>
            <li className={b.tag}>Kraft board</li>
            <li className={b.tag}>Recycled cartons</li>
            <li className={b.tag}>Mono-material film</li>
            <li className={b.tag}>Paper tape</li>
            <li className={b.tag}>Water-based inks</li>
          </ul>
        </div>
      </section>

      {/* ---------- STATEMENT PHOTO (replaced) ---------- */}
      <section className={s.statement}>
        <div className={s.statementText}>
          <p className={s.quote}>
            The greenest container is the one that arrives sellable.
          </p>
          <p className={s.quoteBy}>Our packaging test.</p>
          <div className={b.linkRow}>
            <Link className={b.link} href="/contact">
              Ask for a packaging review →
            </Link>
            <Link className={b.link} href="/services/packaging-consultancy">
              Packaging consultancy →
            </Link>
            <Link className={b.link} href="/services/private-label">
              Private label →
            </Link>
          </div>
        </div>
        <div
          className={s.statementPhoto}
          style={{ backgroundImage: `url("${PHOTO_PAPER_BAG}")` }}
          role="img"
          aria-label="Sustainable packaging displayed in a retail environment"
        />
      </section>

      {/* ---------- SECOND IMAGE SECTION (kept) ---------- */}
      <section className={b.sectionTint}>
        <img
          src="/assets/decor/leaf-grid.svg"
          alt=""
          aria-hidden="true"
          className={s.decorCorner}
        />
        <div className={b.shell}>
          <div className={b.head}>
            <span className={b.kicker}>How a switch happens</span>
            <h2 className={b.heading}>
              One line, one trial lot, then the range.
            </h2>
          </div>
          <p className={b.lede}>
            We pick your highest-volume SKU, redesign the pack, ship a trial lot
            and compare arrival condition against the old format. If it holds,
            we roll the change across the range. If it does not, we have lost
            one lot instead of a season.
          </p>
          <div className={b.facts}>
            <div className={b.fact}>
              <span className={b.factValue}>1</span>
              <span className={b.factLabel}>Trial lot before any rollout</span>
            </div>
            <div className={b.fact}>
              <span className={b.factValue}>4</span>
              <span className={b.factLabel}>
                Tests: humidity, drop, stack, seal
              </span>
            </div>
            <div className={b.fact}>
              <span className={b.factValue}>0</span>
              <span className={b.factLabel}>
                Unverified sustainability claims
              </span>
            </div>
          </div>
        </div>
      </section>

      <div hidden aria-hidden="true" data-photo={PHOTO_PAPER_BAG} />
    </main>
  );
}
