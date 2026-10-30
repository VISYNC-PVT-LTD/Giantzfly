import Link from "next/link";
import s from "@/components/story/story.module.css";
import b from "@/components/story/brief.module.css";

export const metadata = {
  title: "Our Mission | Giantzfly Exim LLP",
  description:
    "The standard Giantzfly Exim LLP holds on every lot: grade before price, packing for the journey, paperwork finished early.",
};

const PHOTO_SEALING =
  "https://images.pexels.com/photos/4483610/pexels-photo-4483610.jpeg?auto=compress&cs=tinysrgb&w=2400";
const PHOTO_PALLETS =
  "https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?auto=compress&cs=tinysrgb&w=2400";

export default function MissionPage() {
  return (
    <main className={`${s.page} ${b.wrap}`}>
      {/* ---------- BANNER (unchanged) ---------- */}
      <section
        className={s.opening}
        style={{ backgroundImage: `url("${PHOTO_SEALING}")` }}
      >
        <div className={s.shell}>
          <div className={s.panel}>
            <span className={s.kicker}>Our Mission</span>
            <h1 className={s.display}>
              Ship the lot that was approved.
              <span className={s.displaySoft}>Every single time.</span>
            </h1>
            <p className={s.lede}>
              Not the best-case lot, not a close substitute. The one you signed
              off on.
            </p>
          </div>
        </div>
      </section>

      {/* ---------- FIRST SECTION IMAGE (unchanged) ---------- */}
      <section className={s.chapter}>
        <img
          src="/assets/illustrations/global-trade.svg"
          alt=""
          aria-hidden="true"
          className={s.decorRight}
        />
        <div className={b.shell}>
          <div className={b.head}>
            <span className={b.kicker}>The brief</span>
            <h2 className={b.heading}>
              To make Indian agri-exports boring &mdash; in the best possible
              sense of the word.
            </h2>
          </div>

          <p className={b.ledeLead}>
            Our mission is to become a trusted global partner by delivering
            premium-quality Indian products and integrated business solutions
            that create lasting value for customers worldwide. We are committed
            to building reliable supply chains that connect Indian manufacturers
            with international markets while maintaining the highest standards of
            quality, food safety, compliance, and customer satisfaction.
          </p>

          <p className={b.lede}>
            We strive to provide a comprehensive portfolio of products, including
            whole spices, spice powders, nutritional ingredients, fresh
            vegetables, dry fruits, makhana, and value-added agricultural
            products, supported by innovative packaging solutions that meet the
            evolving needs of global industries. Through our packaging consultancy
            services, packaging material exports, private-label product
            development, and sustainable packaging initiatives, we help businesses
            improve efficiency, strengthen their brands, and enhance their
            competitive advantage.
          </p>

          <p className={b.lede}>
            Our mission is guided by the following commitments:
          </p>

          <ul className={b.commitments}>
            <li>Deliver products that consistently meet international quality standards.</li>
            <li>Build long-term relationships based on trust, transparency, and integrity.</li>
            <li>Support customers with reliable sourcing, efficient logistics, and complete export solutions.</li>
            <li>Encourage innovation in product development and packaging technologies.</li>
            <li>Promote environmentally responsible and sustainable business practices.</li>
            <li>Empower farmers, manufacturers, processors, and business partners through ethical and mutually beneficial collaborations.</li>
            <li>Continuously improve our processes, services, and customer experience through technology, innovation, and operational excellence.</li>
            <li>Contribute to the global recognition of Indian products by maintaining uncompromising standards of quality, reliability, and professionalism.</li>
          </ul>

          <p className={b.lede}>
            Through dedication, continuous improvement, and customer-focused
            service, we aim to become the preferred sourcing and export partner
            for businesses seeking dependable products and comprehensive
            international trade solutions.
          </p>

          <div className={b.pull}>
            <p className={b.pullText}>
              A shipment is a promise{" "}
              <span className={b.pullStrong}>with a delivery date.</span>
            </p>
            <p className={b.pullBy}>What we hold ourselves to</p>
          </div>
        </div>
      </section>

      {/* ---------- STATEMENT PHOTO (unchanged) ---------- */}
      <section className={s.statement}>
        <div className={s.statementText}>
          <p className={s.quote}>
            One lot is enough to see<br/>

            <span className={s.quoteStrong}>standard is real.</span>
          </p>
          <p className={s.quoteBy}>Why buyers stay</p>
           <div className={b.linkRow}>
            <Link className={b.link} href="/about/vision">
              Our vision &rarr;
            </Link>
            <Link className={b.link} href="/products">
              See the catalogue &rarr;
            </Link>
            <Link className={b.link} href="/contact">
              Send an enquiry &rarr;
            </Link>
          </div>
        </div>
        <div
          className={s.statementPhoto}
          style={{ backgroundImage: `url("${PHOTO_PALLETS}")` }}
          role="img"
          aria-label="Palletised cartons staged for loading"
        />
      </section>
    </main>
  );
}
