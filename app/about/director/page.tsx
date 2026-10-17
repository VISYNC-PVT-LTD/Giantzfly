import Image from "next/image";
import Link from "next/link";
import s from "@/components/story/story.module.css";
import b from "@/components/story/brief.module.css";

const DIRECTORS = [
  {
    name: "Dattaram Manohar Sawant",
    role: "Founder & Director",
    credentials:
      "B.Sc. (Physics) · MBA (Operations) · Diploma in Packaging Technology · Diploma in Event & Media Management",
    bio: "With over 12 years of professional experience, Dattaram is a seasoned packaging and operations professional specializing in packaging design, packaging development, artwork development, and regulatory packaging solutions for the pharmaceutical, biopharmaceutical, and skincare industries. Driven by a vision to connect India's finest products with global markets, he founded Giantzfly Exim LLP to deliver premium-quality products and reliable export solutions.",
    tags: [
      "Packaging Design & Development",
      "Pharma & Biopharma Packaging",
      "Artwork Development",
      "Regulatory Compliance",
      "Export Documentation",
    ],
    quote:
      "Quality, Innovation, and Trust are the pillars that drive every partnership we build and every shipment we deliver.",
  },
  {
    name: "Omkar Vijay Kadam",
    role: "Co-Founder & Director",
    credentials: "Bachelor of Civil Engineering",
    bio: "Omkar is a dynamic professional with 5 years of industry experience, bringing a strong combination of technical knowledge, customer engagement, and business development expertise. His core strength lies in sales and customer service, where he has built lasting client relationships and delivered customer-centric solutions. At Giantzfly Exim LLP, he drives business growth and ensures exceptional service throughout the sales and export process.",
    tags: [
      "Sales & Business Development",
      "Client Relationship Management",
      "Project Coordination",
      "Export Sales Support",
    ],
    quote:
      "Strong relationships, exceptional service, and customer success are the foundation of sustainable business growth.",
  },
];

export const metadata = {
  title: "Meet a Director | Giantzfly Exim LLP",
  description:
    "The person who signs your sample, your seal and your paperwork at Giantzfly Exim LLP.",
};

const PHOTO_OFFICE =
  "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=2400";
const PHOTO_AGREEMENT =
  "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=2400";

export default function DirectorPage() {
  return (
    <main className={`${s.page} ${b.wrap}`}>
      {/* ---------- BANNER (unchanged) ---------- */}
      <section
        className={s.opening}
        style={{ backgroundImage: `url("${PHOTO_OFFICE}")` }}
      >
        <div className={s.shell}>
          <div className={s.panel}>
            <span className={s.kicker}>Leadership</span>
            <h1 className={s.display}>
              Meet a director.
              <span className={s.displaySoft}>
                The same one, every time you call.
              </span>
            </h1>
            <p className={s.lede}>
              No account tiers, no handover to a junior desk once the first
              order clears.
            </p>
          </div>
        </div>
      </section>

      {/* ---------- FIRST SECTION IMAGE (unchanged) ---------- */}
      <section className={s.chapter}>
        <img
          src="/assets/illustrations/about-network.svg"
          alt=""
          aria-hidden="true"
          className={s.decorRight}
        />
        <div className={b.shell}>
          <div className={b.head}>
            <span className={b.kicker}>The brief</span>
            <h2 className={b.heading}>
              A trading desk small enough that the person who quotes you is the
              person who inspects your goods.
            </h2>
          </div>

          <p className={b.ledeLead}>
            Giantzfly Exim LLP is director-led by design. The people who own the
            company are the people who walk the mandis, argue over grade, sign
            the seal photographs and answer the phone when a container is late.
          </p>

          <p className={b.lede}>
            That structure exists because export trade fails in the gaps between
            departments. A buyer speaks to sales, sales briefs procurement,
            procurement instructs a packer, and by the time a claim is raised
            nobody owns the original promise. We removed the gaps instead of
            managing them &mdash; one file, one owner,{" "}
            <strong>from inquiry through after-sales support</strong>.
          </p>

          <p className={b.lede}>
            In practice it means your specification is read by a decision-maker,
            your quotation carries a number that will not move after you accept
            it, and your escalation path is one message long. It also means we
            say no: if a season is bad, a grade is unavailable, or a price only
            works by cutting quality, you are told before you commit rather than
            after the vessel sails.
          </p>

          <div className={b.split}>
            <article className={b.card}>
              <span className={b.cardTag}>Sourcing</span>
              <h3 className={b.cardTitle}>Bought at origin, in person</h3>
              <p className={b.cardText}>
                Direct relationships with growers, mandi traders and processing
                units in the regions each crop actually belongs to &mdash; not a
                single broker reselling whatever is on hand.
              </p>
            </article>
            <article className={b.card}>
              <span className={b.cardTag}>Quality</span>
              <h3 className={b.cardTitle}>Approved before it ships</h3>
              <p className={b.cardText}>
                Pre-shipment samples against your written spec, moisture and
                foreign-matter checks, and sealing photographs on file for every
                lot we load.
              </p>
            </article>
            <article className={b.card}>
              <span className={b.cardTag}>Compliance</span>
              <h3 className={b.cardTitle}>Paperwork finished early</h3>
              <p className={b.cardText}>
                FSSAI and APEDA credentials, phytosanitary and origin
                certificates, invoices and packing lists completed before the
                booking, so customs is never the reason you wait.
              </p>
            </article>
            <article className={`${b.card} ${b.cardDark}`}>
              <span className={b.cardTag}>Accountability</span>
              <h3 className={b.cardTitle}>One name on the file</h3>
              <p className={b.cardText}>
                If a lot disappoints you, you get photographs, a cause and a
                remedy from the director who approved it. No claims department,
                no waiting.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* ---------- MEET THE DIRECTORS ---------- */}
      <section className={s.chapterTint}>
        <div className={b.shell}>
          <div className={b.head}>
            <span className={b.kicker}>Leadership</span>
            <h2 className={b.heading}>The two names on every file.</h2>
          </div>

          <div className={b.team}>
            {DIRECTORS.map((d) => (
              <article key={d.name} className={b.teamCard}>
                <div className={b.teamPhoto}>
                  <Image
                    src="/assets/director.jpg"
                    alt={d.name}
                    fill
                    sizes="128px"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className={b.teamBody}>
                  <h3 className={b.teamName}>{d.name}</h3>
                  <span className={b.teamRole}>{d.role}</span>
                  <p className={b.teamCreds}>{d.credentials}</p>
                  <p className={b.teamBio}>{d.bio}</p>
                  <ul className={b.teamTags}>
                    {d.tags.map((t) => (
                      <li key={t} className={b.teamTag}>
                        {t}
                      </li>
                    ))}
                  </ul>
                  <p className={b.teamQuote}>&ldquo;{d.quote}&rdquo;</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- STATEMENT PHOTO (unchanged) ---------- */}
      <section className={s.statement}>
        <div className={s.statementText}>
          <p className={s.quote}>
 Bring us a specification, or the sample that failed you last season.
          </p>
          <p className={s.quoteBy}>            Either one is enough for a director to quote against.
</p>
          <div className={b.linkRow}>
            <Link className={b.link} href="/contact">
              Talk to a director &rarr;
            </Link>
            <Link className={b.link} href="/about/mission">
              Our mission &rarr;
            </Link>
            <Link className={b.link} href="/products">
              See the catalogue &rarr;
            </Link>
          </div>
        </div>
        <div
          className={s.statementPhoto}
          style={{ backgroundImage: `url("${PHOTO_AGREEMENT}")` }}
          role="img"
          aria-label="Two people agreeing terms across a table"
        />
      </section>
    </main>
  );
}
