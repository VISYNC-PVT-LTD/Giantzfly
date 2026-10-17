import Link from "next/link";
import s from "@/components/story/story.module.css";
import b from "@/components/story/brief.module.css";

export const metadata = {
  title: "Packaging Material Exports | Giantzfly Exim LLP",
  description:
    "Export-grade cartons, films, pouches and pallet materials supplied from India as a standalone line.",
};

const PHOTO_BOX_STACKS =
  "https://images.pexels.com/photos/34221998/pexels-photo-34221998.jpeg?auto=compress&cs=tinysrgb&w=2400";
const PHOTO_WAREHOUSE =
  "https://images.pexels.com/photos/4483610/pexels-photo-4483610.jpeg?auto=compress&cs=tinysrgb&w=2400";
const PHOTO_RACKING =
  "https://images.pexels.com/photos/27111449/pexels-photo-27111449.jpeg?auto=compress&cs=tinysrgb&w=2400";

export default function PackagingMaterialExportsPage() {
  return (
    <main className={`${s.page} ${b.wrap}`}>
      {/* ---------- BANNER (unchanged) ---------- */}
      <section
        className={s.opening}
        style={{ backgroundImage: `url("${PHOTO_BOX_STACKS}")` }}
      >
        <div className={s.shell}>
          <div className={s.panel}>
            <span className={s.kicker}>Service 04</span>
            <h1 className={s.display}>
              Packaging material exports.
              <span className={s.displaySoft}>The empties, done properly.</span>
            </h1>
            <p className={s.lede}>
              Flexible, paper, plastic, glass, metal and eco-friendly packaging materials shipped from India as
              a line of their own, sourced from qualified Indian manufacturers.
            </p>
          </div>
        </div>
      </section>

      {/* ---------- FIRST SECTION IMAGE (unchanged) ---------- */}
      <section className={s.chapter}>
        <img
          src="/assets/illustrations/export-materials.svg"
          alt=""
          aria-hidden="true"
          className={s.decorRight}
        />
        <div className={b.shell}>
          <div className={b.head}>
            <span className={b.kicker}>The short version</span>
            <h2 className={b.heading}>
              If you pack your own product, we can supply the packaging instead
              of the goods.
            </h2>
          </div>

          <p className={b.ledeLead}>
            Many buyers already have a filling line and only need dependable
            input material at an Indian cost base. This service exists for them:
            board, film, pouches, tape and pallet consumables, quoted to
            specification and shipped by the container.
          </p>

          <p className={b.lede}>
            Packaging is bought on numbers, not adjectives. So we quote in the
            language of your production line &mdash;{" "}
            <strong>
              board grade and GSM, flute profile, burst and edge-crush values,
              film thickness in micron, barrier structure, seal window, print
              colours and roll or sheet dimensions
            </strong>
            . If your equipment needs a tolerance held, that tolerance goes into
            the specification, not into a conversation.
          </p>

          <p className={b.lede}>
            The commercial logic is volume. Packaging is bulky and light, so a
            container of empties only makes sense when the load plan is
            efficient. We nest, flat-pack and palletise to fill the box
            properly, and we will tell you honestly when a line is{" "}
            <strong>cheaper to buy locally</strong> than to import.
          </p>

          {/* creative bit: how an order runs */}
          <div className={b.ribbon}>
            <div className={b.node}>
              <span className={b.nodeStep}>Step 01</span>
              <span className={b.nodeTitle}>Spec sheet</span>
              <span className={b.nodeNote}>
                GSM, micron, dimensions, tolerances and print.
              </span>
            </div>
            <div className={b.node}>
              <span className={b.nodeStep}>Step 02</span>
              <span className={b.nodeTitle}>Sample roll</span>
              <span className={b.nodeNote}>
                Run it on your own machine before you commit.
              </span>
            </div>
            <div className={b.node}>
              <span className={b.nodeStep}>Step 03</span>
              <span className={b.nodeTitle}>Load plan</span>
              <span className={b.nodeNote}>
                Nested and flat-packed to fill the container.
              </span>
            </div>
            <div className={b.node}>
              <span className={b.nodeStep}>Step 04</span>
              <span className={b.nodeTitle}>Production</span>
              <span className={b.nodeNote}>
                Batch-checked against the approved sample.
              </span>
            </div>
            <div className={b.node}>
              <span className={b.nodeStep}>Step 05</span>
              <span className={b.nodeTitle}>Ship</span>
              <span className={b.nodeNote}>
                Documents and dispatch on your Incoterm.
              </span>
            </div>
          </div>

          <div className={b.split}>
            <article className={b.card}>
              <span className={b.cardTag}>Fibre</span>
              <h3 className={b.cardTitle}>Cartons and board</h3>
              <p className={b.cardText}>
                Corrugated shippers, mono and duplex cartons, kraft and recycled
                board, printed or plain &mdash; specified by GSM, flute, burst
                and edge-crush rather than by name.
              </p>
            </article>
            <article className={b.card}>
              <span className={b.cardTag}>Flexible</span>
              <h3 className={b.cardTitle}>Films and pouches</h3>
              <p className={b.cardText}>
                Rollstock and pre-made stand-up pouches, barrier or
                mono-material structures, zippers and valves, supplied to your
                seal window and micron tolerance.
              </p>
            </article>
            <article className={b.card}>
              <span className={b.cardTag}>Consumables</span>
              <h3 className={b.cardTitle}>Tape, strap and pallet goods</h3>
              <p className={b.cardText}>
                Paper and BOPP tape, strapping, stretch wrap, corner boards,
                liners and desiccants &mdash; the small items that decide
                whether a stack survives.
              </p>
            </article>
            <article className={b.card}>
              <span className={b.cardTag}>Plastic</span>
              <h3 className={b.cardTitle}>Plastic packaging</h3>
              <p className={b.cardText}>
                PET bottles, PET jars, HDPE bottles, PP containers, caps and
                closures for food, personal care and industrial packs.
              </p>
            </article>
            <article className={b.card}>
              <span className={b.cardTag}>Glass & metal</span>
              <h3 className={b.cardTitle}>Glass & metal packaging</h3>
              <p className={b.cardText}>
                Cosmetic bottles, food jars, essential oil bottles,
                pharmaceutical containers, tin containers, spice containers and
                decorative packaging tins.
              </p>
            </article>
            <article className={`${b.card} ${b.cardDark}`}>
              <span className={b.cardTag}>Straight answer</span>
              <h3 className={b.cardTitle}>When not to import</h3>
              <p className={b.cardText}>
                Very low-value bulky board is often cheaper next door. We will
                say so and quote only the lines where the Indian cost base
                genuinely beats your local option after freight.
              </p>
            </article>
          </div>

          <ul className={b.tags}>
            <li className={b.tag}>Corrugated shippers</li>
            <li className={b.tag}>Kraft cartons</li>
            <li className={b.tag}>Rollstock film</li>
            <li className={b.tag}>Stand-up pouches</li>
            <li className={b.tag}>Tape &amp; strapping</li>
            <li className={b.tag}>Liners &amp; desiccants</li>
          </ul>
        </div>
      </section>

      {/* ---------- STATEMENT PHOTO (replaced) ---------- */}
      <section className={s.statement}>
        <div className={s.statementText}>
          <p className={s.quote}>
            Quoted in microns and GSM. <span className={s.quoteStrong}>Not in adjectives.</span>
          </p>
          <p className={s.quoteBy}>How we price material</p>
          <div className={b.linkRow}>
            <Link className={b.link} href="/contact">
              Request a material quote &rarr;
            </Link>
            <Link className={b.link} href="/services/packaging-consultancy">
              Packaging consultancy &rarr;
            </Link>
            <Link className={b.link} href="/services">
              All services &rarr;
            </Link>
          </div>
        </div>
        <div
          className={s.statementPhoto}
          style={{ backgroundImage: `url("${PHOTO_RACKING}")` }}
          role="img"
          aria-label="Warehouse racking stacked with packaging material"
        />
      </section>

      {/* ---------- SECOND IMAGE SECTION (kept) ---------- */}
      <section className={b.sectionTint}>
        <img
          src="/assets/illustrations/packaging-stack.svg"
          alt=""
          aria-hidden="true"
          className={s.decorLeft}
        />
        <div className={b.shell}>
          <div className={b.head}>
            <span className={b.kicker}>What to send us</span>
            <h2 className={b.heading}>
              A spec sheet, or a sample of what you use today.
            </h2>
          </div>
          <p className={b.lede}>
            Either works. From a physical sample we can measure the board or
            film and reverse-engineer the specification, then quote a matching
            or improved structure with an annual volume estimate and your
            preferred Incoterm.
          </p>
          <div className={b.facts}>
            <div className={b.fact}>
              <span className={b.factValue}>3</span>
              <span className={b.factLabel}>
                Families: fibre, flexible, consumables
              </span>
            </div>
            <div className={b.fact}>
              <span className={b.factValue}>1</span>
              <span className={b.factLabel}>
                Sample run on your own machine
              </span>
            </div>
            <div className={b.fact}>
              <span className={b.factValue}>FCL</span>
              <span className={b.factLabel}>
                Load-planned to fill the container
              </span>
            </div>
          </div>
        </div>
      </section>

      <div hidden aria-hidden="true" data-photo={PHOTO_WAREHOUSE} />
    </main>
  );
}
