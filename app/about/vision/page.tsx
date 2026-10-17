import Link from "next/link";
import s from "@/components/story/story.module.css";

export const metadata = {
  title: "Our Vision | Giantzfly Exim LLP",
  description:
    "Where Giantzfly Exim LLP is taking Indian spices, produce and makhana next.",
};

const PHOTO_SUNSET_PORT =
  "https://images.pexels.com/photos/36652827/pexels-photo-36652827.jpeg?auto=compress&cs=tinysrgb&w=2400";
const PHOTO_FARMERS =
  "https://images.pexels.com/photos/30320066/pexels-photo-30320066.jpeg?auto=compress&cs=tinysrgb&w=2400";
const PHOTO_AERIAL_PORT =
  "https://images.pexels.com/photos/35459333/pexels-photo-35459333.jpeg?auto=compress&cs=tinysrgb&w=2400";

export default function VisionPage() {
  return (
    <main className={s.page}>
      <section
        className={s.opening}
        style={{ backgroundImage: `url("${PHOTO_SUNSET_PORT}")` }}
      >
        <div className={s.shell}>
          <div className={s.panel}>
            <span className={s.kicker}>Our Vision</span>
            <h1 className={s.display}>
              An Indian crop should not lose its name at the border.
              <span className={s.displaySoft}>We keep it attached.</span>
            </h1>
            <p className={s.lede}>
              Origin, grade and grower stay on the pack all the way to the
              shelf.
            </p>
            <p className={s.lede}>
              From India to the world, quality should never lose its
              identity. We keep every shipment connected to its origin. With
              careful sourcing, defined specifications and quality-controlled
              export processes, we help Indian products reach global markets
              with confidence.
            </p>
          </div>
        </div>
      </section>
      <section className={s.chapter}>
        <div className={s.shell}>
          <div className={s.narrow}>
            <span className={s.kickerDark}>The vision</span>
            <h2 className={s.heading}>Connecting markets. Delivering growth.</h2>
            <p className={s.say}>
              Our vision is to become one of the world’s most trusted and
              respected export companies, recognized for delivering premium
              Indian products, innovative packaging solutions, and exceptional
              customer service that create sustainable value for customers,
              suppliers, employees, and communities.
            </p>
          </div>

          <div className={s.narrow}>
            <h3 className={s.subheading}>A global brand built on trust</h3>
            <p className={s.say}>
              We aspire to establish <strong>Giantzfly Exim LLP</strong> as a
              globally recognized brand for quality, reliability, innovation,
              and ethical business practices. By combining India’s agricultural
              richness, manufacturing excellence, and packaging expertise with
              world-class export management, we build a seamless supply network
              that connects businesses across continents.
            </p>
          </div>
<section className={s.chapter}>
        <img
          src="/assets/illustrations/shipping-route.svg"
          alt=""
          aria-hidden="true"
          className={s.decorRight}
        />
        <div className={s.shell}>
          <div className={s.narrow}>
            <span className={s.kickerDark}>The horizon</span>
            <h2 className={s.heading}>Four moves, in order.</h2>
            <p className={s.say}>
              Each one only starts when the last one is boring.
            </p>
          </div>

          <div className={s.trail}>
            <div className={s.stop}>
              <span className={s.stopIndex}>Now</span>
              <p className={s.stopTitle}>Bulk done properly</p>
              <p className={s.stopNote}>
                Clean lots, honest grades, dates that hold.
              </p>
            </div>
            <div className={s.stop}>
              <span className={s.stopIndex}>Next</span>
              <p className={s.stopTitle}>Retail-ready packs</p>
              <p className={s.stopNote}>Your brand, our line, one shipment.</p>
            </div>
            <div className={s.stop}>
              <span className={s.stopIndex}>Then</span>
              <p className={s.stopTitle}>Traceable lots</p>
              <p className={s.stopNote}>
                Region and season readable on the carton.
              </p>
            </div>
            <div className={s.stop}>
              <span className={s.stopIndex}>Ahead</span>
              <p className={s.stopTitle}>Lighter packaging</p>
              <p className={s.stopNote}>
                Less material, same protection, fewer claims.
              </p>
            </div>
          </div>
        </div>
      </section>
          <div className={s.narrow}>
            <h3 className={s.subheading}>More than product exports</h3>
            <p className={s.say}>
              We see ourselves as a<span> </span>
              <strong>strategic partner</strong> for importers, distributors,
              retailers, wholesalers, manufacturers, and private-label brands.
              Our goal is to simplify international sourcing with dependable
              supply chains, customized packaging, quality assurance, regulatory
              compliance, and value-added services.
            </p>
          </div>
 
          <div className={s.narrow}>
            <h3 className={s.subheading}>Innovation and sustainability</h3>
            <p className={s.say}>
              Innovation is at the heart of our growth. We pursue advanced
              technologies, modern packaging solutions, digital trade practices,
              and process improvements that enhance efficiency, reduce costs,
              and increase customer value. At the same time, we are committed to
              sustainable packaging, responsible sourcing, waste reduction, and
              eco-friendly business practices.
            </p>
          </div>
<section className={s.chapterTint}>
        <img
          src="/assets/decor/world-routes.svg"
          alt=""
          aria-hidden="true"
          className={s.decorLeft}
        />
        <div className={s.shell}>
          <div className={s.narrow}>
            <span className={s.kickerDark}>Why it matters</span>
            <h2 className={s.heading}>A named origin survives a price war.</h2>
            <p className={s.say}>
              Anonymous cargo competes on cents. Named cargo competes on trust.
            </p>
          </div>
          <div className={s.counts}>
            <div className={s.count}>
              <span className={s.countValue}>4</span>
              <span className={s.countLabel}>Moves planned</span>
            </div>
            <div className={s.count}>
              <span className={s.countValue}>5</span>
              <span className={s.countLabel}>Families in scope</span>
            </div>
            <div className={s.count}>
              <span className={s.countValue}>1</span>
              <span className={s.countLabel}>Standard across all</span>
            </div>
          </div>
        </div>
      </section>
          <div className={s.narrow}>
            <h3 className={s.subheading}>Partnerships that strengthen India</h3>
            <p className={s.say}>
              We create meaningful economic opportunities by strengthening
              partnerships with farmers, manufacturers, processors, and packaging
              industries across India. Supporting local enterprises and
              promoting Indian products internationally contributes to national
              growth and improves livelihoods across our value chain.
            </p>
          </div>

          <div className={s.narrow}>
            <p className={s.say}>
              Our long-term vision is to expand across major global markets,
              establish enduring partnerships with international businesses, and
              become synonymous with trust, quality, innovation, and excellence
              in global trade.
            </p>
            <p className={s.say}>
              Every shipment we deliver, every partnership we build, and every
              solution we provide reflects our unwavering commitment to
              <strong>Connecting Markets. Delivering Growth.</strong>
            </p>
          </div>
        </div>
      </section>
 <section className={s.statement}>
        <div className={s.statementText}>
            <div className={s.shell}>
          <h2 className={s.closingHeading}>Build the next shelf with us.</h2>
          <p className={s.closingSay}>
            Bulk today, your own label next season.
          </p>
          <div className={s.linkRow}>
            <Link className={s.link} href="/services/private-label">
              Private label →
            </Link>
            <Link className={s.link} href="/contact">
              Start a conversation →
            </Link>
          </div>
        </div>
        </div>
        <div
          className={s.statementPhoto}
          style={{ backgroundImage: `url("${PHOTO_AERIAL_PORT}")` }}
          role="img"
          aria-label="Aerial view of a working container port"
        />
      </section>
    </main>
  );
}
