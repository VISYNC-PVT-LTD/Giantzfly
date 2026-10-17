import Link from "next/link";
import s from "@/components/story/story.module.css";
import b from "@/components/story/brief.module.css";

export const metadata = {
  title: "Packaging Consultancy | Giantzfly Exim LLP",
  description:
    "We design export packaging around the lane it has to survive: material, structure, labelling and load plan.",
};

const PHOTO_PACK_DESIGN =
  "https://images.pexels.com/photos/9594428/pexels-photo-9594428.jpeg?auto=compress&cs=tinysrgb&w=2400";
const PHOTO_PACK_TABLE =
  "https://images.pexels.com/photos/6958443/pexels-photo-6958443.jpeg?auto=compress&cs=tinysrgb&w=2400";
const PHOTO_CARTON =
  "https://images.pexels.com/photos/4498125/pexels-photo-4498125.jpeg?auto=compress&cs=tinysrgb&w=2400";

export default function PackagingConsultancyPage() {
  return (
    <main className={`${s.page} ${b.wrap}`}>
      {/* ---------- BANNER (unchanged) ---------- */}
      <section
        className={s.opening}
        style={{ backgroundImage: `url("${PHOTO_PACK_DESIGN}")` }}
      >
        <div className={s.shell}>
          <div className={s.panel}>
            <span className={s.kicker}>Service 03</span>
            <h1 className={s.display}>
              Packaging consultancy.
              <span className={s.displaySoft}>
                Designed for the journey, not the studio.
              </span>
            </h1>
            <p className={s.lede}>
              Most packaging failures are decided months before the container is
              loaded.
            </p>
          </div>
        </div>
      </section>

      {/* ---------- FIRST SECTION IMAGE (unchanged) ---------- */}
      <section className={s.chapter}>
        <img
          src="/assets/illustrations/packaging-blueprint.svg"
          alt=""
          aria-hidden="true"
          className={s.decorRight}
        />
        <div className={b.shell}>
          <div className={b.head}>
            <span className={b.kicker}>The short version</span>
            <h2 className={b.heading}>
              We work backwards from your destination shelf to decide what the
              pack has to be.
            </h2>
          </div>

          <p className={b.ledeLead}>
            We help companies improve packaging performance, reduce costs,
            enhance shelf life, strengthen brand identity, and comply with
            international packaging standards.
          </p>

          <div className={b.head}>
            <span className={b.kicker}>Services Include</span>
            <h3 className={b.heading}>Packaging Design & Development</h3>
          </div>
          <ul className={b.commitments}>
            <li>Product packaging concept development</li>
            <li>Packaging structure design</li>
            <li>Packaging material selection</li>
            <li>Packaging specification development</li>
            <li>Packaging optimization studies</li>
          </ul>

          <div className={b.head}>
            <h3 className={b.heading}>Cost Reduction Programs</h3>
          </div>
          <ul className={b.commitments}>
            <li>Material consumption analysis</li>
            <li>Packaging redesign</li>
            <li>Vendor rationalization</li>
            <li>Supply chain optimization</li>
          </ul>

          <div className={b.head}>
            <h3 className={b.heading}>Packaging Compliance Support</h3>
          </div>
          <ul className={b.commitments}>
            <li>Food packaging compliance</li>
            <li>Labeling requirements</li>
            <li>Export packaging standards</li>
            <li>Sustainability requirements</li>
          </ul>

          <div className={b.head}>
            <h3 className={b.heading}>Packaging Testing & Validation</h3>
          </div>
          <ul className={b.commitments}>
            <li>Transportation simulation</li>
            <li>Packaging performance assessment</li>
            <li>Shelf-life support studies</li>
            <li>Packaging audit programs</li>
          </ul>

          <div className={b.head}>
            <h3 className={b.heading}>Vendor Development & Qualification</h3>
          </div>
          <ul className={b.commitments}>
            <li>Supplier identification</li>
            <li>Vendor audits</li>
            <li>Vendor qualification systems</li>
            <li>Approved vendor management</li>
          </ul>
        </div>
      </section>

      {/* ---------- STATEMENT PHOTO (unchanged) ---------- */}
      <section className={s.statement}>
        <div className={s.statementText}>
          <p className={s.quote}>
            Tell us the route and the product.<br/>
            <span className={s.quoteStrong}>We will tell you the pack.</span>
          </p>
          <p className={s.quoteBy}>The order that matters</p>
          <div className={b.linkRow}>
            <Link className={b.link} href="/contact">
              Book a packaging review &rarr;
            </Link>
            <Link className={b.link} href="/services/sustainable-packaging">
              Sustainable packaging &rarr;
            </Link>
            <Link
              className={b.link}
              href="/services/packaging-material-exports"
            >
              Packaging materials &rarr;
            </Link>
          </div>
        </div>
        <div
          className={s.statementPhoto}
          style={{ backgroundImage: `url("${PHOTO_CARTON}")` }}
          role="img"
          aria-label="Cartons being prepared and sealed"
        />
      </section>
      <div hidden aria-hidden="true" data-photo={PHOTO_PACK_TABLE} />
    </main>
  );
}
