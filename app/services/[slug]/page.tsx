import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { services, getService } from "../services-content";
import styles from "../services.module.css";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: "Our Services" };
  return { title: service.label, description: service.tagline };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const others = services.filter((item) => item.slug !== service.slug);

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div
          className={styles.heroBg}
          style={{ backgroundImage: `url('${service.background}')` }}
          aria-hidden="true"
        />
        <div className={styles.heroVeil} aria-hidden="true" />
        <img
          src={service.decor}
          alt=""
          className={styles.heroDecor}
          aria-hidden="true"
        />
        <div className="container">
          <div className={styles.heroInner}>
            <span className={styles.kicker}>{service.label}</span>
            <h1 className={styles.title}>{service.title}</h1>
            <p className={styles.tagline}>{service.tagline}</p>
          </div>
        </div>
      </section>

      <section className={styles.body}>
        <img
          src={service.decor}
          alt=""
          className={styles.bodyDecor}
          aria-hidden="true"
        />
        <div className="container">
          <div className={styles.prose}>
            {service.intro.map((text) => (
              <p key={text.slice(0, 40)}>{text}</p>
            ))}
          </div>

          <div className={styles.sectionHead}>
            <span className={styles.eyebrowDark}>What we do</span>
            <h2>Scope of work.</h2>
          </div>
          <div className={styles.offerGrid}>
            {service.offer.map((item) => (
              <article key={item.title} className={styles.offer}>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>

          <div className={styles.sectionHead}>
            <span className={styles.eyebrowDark}>What you receive</span>
            <h2>Deliverables.</h2>
          </div>
          <ul className={styles.deliverables}>
            {service.deliverables.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <div className={styles.otherLinks}>
            {others.map((item) => (
              <Link
                key={item.slug}
                href={`/services/${item.slug}`}
                className={styles.otherLink}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.band}>
        <img
          src={service.background}
          alt=""
          className={styles.bandDecor}
          aria-hidden="true"
        />
        <div className="container">
          <div className={styles.bandInner}>
            <h2>Brief us on {service.label.toLowerCase()}.</h2>
            <p>
              Share the product, destination market and volume. You will get
              format options, material choices, indicative cost and a qualified
              vendor route back from our team.
            </p>
            <Link href="/contact" className={styles.bandBtn}>
              Start a brief <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
