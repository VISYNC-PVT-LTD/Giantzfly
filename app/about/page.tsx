import Link from "next/link";
import s from "@/components/story/story.module.css";
import b from "@/components/story/brief.module.css";

export const metadata = {
  title: "About Us | Giantzfly Exim LLP",
  description:
    "How Giantzfly Exim LLP moves Indian spices, dry fruits, vegetables and makhana from origin to overseas shelves.",
};

const PHOTO_YARD =
  "https://images.pexels.com/photos/4256976/pexels-photo-4256976.jpeg?auto=compress&cs=tinysrgb&w=2400";
const PHOTO_PORT =
  "https://images.pexels.com/photos/2231742/pexels-photo-2231742.jpeg?auto=compress&cs=tinysrgb&w=2400";

export default function AboutPage() {
  return (
    <main className={`${s.page} ${b.wrap}`}>
      {/* ---------- BANNER (unchanged) ---------- */}
      <section
        className={s.opening}
        style={{ backgroundImage: `url("${PHOTO_YARD}")` }}
      >
        <div className={s.shell}>
          <div className={s.panel}>
            <span className={s.kicker}>Giantzfly Exim LLP</span>
            <h1 className={s.display}>
              One shipment begins at a farm gate.
              <span className={s.displaySoft}>
                It ends on someone&apos;s shelf.
              </span>
            </h1>
            <p className={s.lede}>
              We stand between those two points and take responsibility for
              every hour in between.
            </p>
          </div>
        </div>
      </section>

      {/* ---------- FIRST SECTION IMAGE (unchanged) ---------- */}
      <section className={s.chapter}>
        <img
          src="/assets/illustrations/india-origins.svg"
          alt=""
          aria-hidden="true"
          className={s.decorRight}
        />
        <div className={b.shell}>
          <div className={b.head}>
            <span className={b.kicker}>The brief</span>
            <h2 className={b.heading}>
              An Indian sourcing house built around one promise: the lot that
              lands is the lot you approved.
            </h2>
          </div>

          <p className={b.ledeLead}>
            <strong>Connecting Markets. Delivering Growth.</strong>
          </p>

          <p className={b.lede}>
            <strong>Giantzfly Exim LLP</strong> is a globally focused export and
            international trade company dedicated to delivering premium-quality
            Indian products and innovative packaging solutions to customers
            across the world. Headquartered in India, we specialize in the
            sourcing, processing, packaging, and export of agricultural
            commodities, whole spices, spice powders, nutritional ingredients,
            fresh vegetables, dry fruits, makhana (fox nuts), and value-added
            food products. In addition, we provide comprehensive packaging
            consultancy services, packaging material exports, private label
            product development, and sustainable packaging solutions to
            businesses seeking reliable and cost-effective supply chain
            partners.
          </p>

          <p className={b.lede}>
            Our journey is driven by a commitment to promoting the richness of
            Indian agriculture and manufacturing on the global stage. India is
            known worldwide for its fertile agricultural lands, diverse climatic
            conditions, and centuries-old expertise in cultivating premium
            spices, herbs, fruits, and vegetables. <strong>Giantzfly Exim LLP</strong> proudly serves as a bridge between trusted Indian
            manufacturers and international buyers, ensuring that products reach
            global markets with the highest standards of quality, safety, and
            consistency.
          </p>

          <p className={b.lede}>
            We work closely with a carefully selected network of farmers,
            manufacturers, processors, exporters, and packaging specialists
            across India. Every product is sourced from reliable partners who
            follow stringent quality practices and comply with international
            standards. Our team conducts thorough supplier evaluations, quality
            inspections, and documentation checks to ensure complete traceability
            and customer satisfaction throughout the supply chain.
          </p>

          <p className={b.lede}>
            Beyond exporting products, we believe in delivering complete business
            solutions. Our packaging consultancy services help companies optimize
            packaging performance, reduce costs, improve sustainability, and
            enhance product presentation. We also support businesses in
            developing their own private-label brands by providing end-to-end
            assistance, including product sourcing, packaging design, regulatory
            compliance, branding, and export documentation.
          </p>

          <p className={b.lede}>
            At <strong>Giantzfly Exim LLP</strong>, we understand that international
            trade requires more than competitive pricing—it requires trust,
            transparency, consistency, and dependable service. Our experienced
            professionals manage every stage of the export process, including
            product selection, quality assurance, customized packaging, logistics
            coordination, documentation, customs compliance, and timely delivery.
            This integrated approach enables our customers to focus on growing
            their business while we manage the complexities of global sourcing
            and exports.
          </p>

          <p className={b.lede}>
            Innovation and sustainability are central to our business philosophy.
            We continuously explore new products, packaging technologies, and
            environmentally responsible solutions that reduce environmental
            impact while maintaining product quality and operational efficiency.
            Through sustainable sourcing, recyclable packaging, and ethical
            business practices, we aim to create long-term value for our
            customers, suppliers, employees, and the communities we serve.
          </p>

          <p className={b.lede}>
            Today, <strong>Giantzfly Exim LLP</strong> proudly serves importers,
            distributors, wholesalers, retailers, food manufacturers,
            supermarkets, and private-label brands across multiple international
            markets. Our goal is not only to export products but also to build
            long-lasting partnerships based on mutual trust, shared success, and
            continuous growth.
          </p>

          <p className={b.lede}>
            As we continue expanding our global presence, we remain committed to
            representing the excellence of Indian products through exceptional
            quality, innovative solutions, professional service, and unwavering
            integrity.
          </p>

          <ul className={b.tags}>
            <li className={b.tag}>Whole spices</li>
            <li className={b.tag}>Ground spices</li>
            <li className={b.tag}>Fresh vegetables</li>
            <li className={b.tag}>Dry fruits</li>
            <li className={b.tag}>Makhana</li>
          </ul>

          <div className={b.facts}>
            <div className={b.fact}>
              <span className={b.factValue}>41</span>
              <span className={b.factLabel}>Export lines in the catalogue</span>
            </div>
            <div className={b.fact}>
              <span className={b.factValue}>5</span>
              <span className={b.factLabel}>Product families</span>
            </div>
            <div className={b.fact}>
              <span className={b.factValue}>1</span>
              <span className={b.factLabel}>
                Point of contact, start to end
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- STATEMENT PHOTO (unchanged) ---------- */}
      <section className={s.statement}>
        <div className={s.statementText}>
          <p className={s.quote}>
            <span className={s.quoteStrong}>Tell us the port.</span>We will work backwards from it.
          </p>
          <p className={s.quoteBy}>Volume, grade, packing and date. That is all we need to start.</p>
          <div className={b.linkRow}>
            <Link className={b.link} href="/products">
              See the catalogue &rarr;
            </Link>
            <Link className={b.link} href="/about/director">
              Meet a director &rarr;
            </Link>
            <Link className={b.link} href="/contact">
              Send an enquiry &rarr;
            </Link>
          </div>
        </div>
        
        <div
          className={s.statementPhoto}
          style={{ backgroundImage: `url("${PHOTO_PORT}")` }}
          role="img"
          aria-label="Loaded container vessel alongside a working port"
        />
      </section>
    </main>
  );
}
