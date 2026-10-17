"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./hero.module.css";

gsap.registerPlugin(ScrollTrigger);

const frames = [
  {
    id: "origin",
    eyebrow: "Frame 01",
    title: "Origin, in motion.",
    blurb: "Farm-direct Indian sourcing with a premium export lens.",
    tag: "Source",
    bg: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1800&q=80",
    fg: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=1200&q=80",
    accent: "Origin verified",
  },
  {
    id: "grade",
    eyebrow: "Frame 02",
    title: "Graded for trade.",
    blurb: "Cleaner selection, clearer specs, stronger buyer confidence.",
    tag: "Grade",
    bg: "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?auto=format&fit=crop&w=1800&q=80",
    fg: "https://images.unsplash.com/photo-1599909535319-0f77c6b5dfd9?auto=format&fit=crop&w=1200&q=80",
    accent: "Spec clarity",
  },
  {
    id: "pack",
    eyebrow: "Frame 03",
    title: "Packed with intent.",
    blurb: "Bulk, retail-ready, and private-label supply pathways.",
    tag: "Pack",
    bg: "https://images.unsplash.com/photo-1580910365203-0a9f4df37c39?auto=format&fit=crop&w=1800&q=80",
    fg: "https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?auto=format&fit=crop&w=1200&q=80",
    accent: "Shelf-ready",
  },
  {
    id: "ship",
    eyebrow: "Frame 04",
    title: "Built for global shelves.",
    blurb: "From India to importers, distributors, and retail buyers.",
    tag: "Move",
    bg: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1800&q=80",
    fg: "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&w=1200&q=80",
    accent: "Global movement",
  },
];

function FrameNav({ frame, index, activeIndex, onClick }) {
  const active = index === activeIndex;

  return (
    <button
      type="button"
      className={`${styles.framePill} ${active ? styles.framePillActive : ""}`}
      onClick={onClick}
      aria-label={`Go to ${frame.title}`}
    >
      <span className={styles.framePillIndex}>{frame.eyebrow}</span>
      <span className={styles.framePillLabel}>{frame.tag}</span>
    </button>
  );
}

export default function GiantzFlyStoryHero() {
  const shellRef = useRef(null);
  const pinnedRef = useRef(null);
  const heroCopyRef = useRef(null);
  const visualChromeRef = useRef(null);
  const frameRefs = useRef([]);
  const bgRefs = useRef([]);
  const fgRefs = useRef([]);
  const captionRefs = useRef([]);
  const [activeFrame, setActiveFrame] = useState(0);

  useLayoutEffect(() => {
    const root = shellRef.current;
    if (!root) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      gsap.set(frameRefs.current, { opacity: 0, yPercent: 8 });
      gsap.set(bgRefs.current, { opacity: 0, scale: 1.08 });
      gsap.set(fgRefs.current, { opacity: 0, yPercent: 10, scale: 1.04 });
      gsap.set(captionRefs.current, { opacity: 0, y: 16 });

      gsap.set(
        [
          frameRefs.current[0],
          bgRefs.current[0],
          fgRefs.current[0],
          captionRefs.current[0],
        ],
        {
          opacity: 1,
          yPercent: 0,
          y: 0,
          scale: 1,
        },
      );

      if (heroCopyRef.current) {
        gsap.fromTo(
          heroCopyRef.current.children,
          { opacity: 0, y: 26 },
          {
            opacity: 1,
            y: 0,
            duration: reduceMotion ? 0.01 : 1,
            stagger: reduceMotion ? 0 : 0.08,
            ease: "power3.out",
          },
        );
      }

      if (visualChromeRef.current) {
        gsap.fromTo(
          visualChromeRef.current,
          { opacity: 0, scale: 0.96 },
          {
            opacity: 1,
            scale: 1,
            duration: reduceMotion ? 0.01 : 1.1,
            ease: "power3.out",
          },
        );
      }

      const timeline = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: () => `+=${window.innerHeight * 4.8}`,
          pin: pinnedRef.current,
          scrub: reduceMotion ? false : 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const idx = Math.min(
              frames.length - 1,
              Math.floor(self.progress * frames.length),
            );
            setActiveFrame(idx);
          },
        },
      });

      frames.forEach((_, index) => {
        if (index === 0) return;

        const at = (index - 1) * 1;

        timeline
          .to(
            bgRefs.current[index - 1],
            { opacity: 0, scale: 1.12, duration: 0.5 },
            at,
          )
          .to(
            fgRefs.current[index - 1],
            { opacity: 0, yPercent: -8, duration: 0.45 },
            at,
          )
          .to(
            frameRefs.current[index - 1],
            { opacity: 0, yPercent: -10, duration: 0.4 },
            at,
          )
          .to(
            captionRefs.current[index - 1],
            { opacity: 0, y: -14, duration: 0.3 },
            at,
          )
          .fromTo(
            bgRefs.current[index],
            { opacity: 0, scale: 1.08 },
            { opacity: 1, scale: 1, duration: 0.65 },
            at + 0.08,
          )
          .fromTo(
            fgRefs.current[index],
            { opacity: 0, yPercent: 10, scale: 1.05 },
            { opacity: 1, yPercent: 0, scale: 1, duration: 0.55 },
            at + 0.16,
          )
          .fromTo(
            frameRefs.current[index],
            { opacity: 0, yPercent: 10 },
            { opacity: 1, yPercent: 0, duration: 0.45 },
            at + 0.22,
          )
          .fromTo(
            captionRefs.current[index],
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.35 },
            at + 0.25,
          );
      });

      gsap.to(`.${styles.parallaxBack}`, {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom bottom",
          scrub: reduceMotion ? false : 1.1,
        },
      });

      gsap.to(`.${styles.parallaxFront}`, {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom bottom",
          scrub: reduceMotion ? false : 1.3,
        },
      });

      gsap.to(`.${styles.visualGlow}`, {
        rotation: 8,
        xPercent: 6,
        yPercent: -4,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom bottom",
          scrub: reduceMotion ? false : 1.4,
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  const jumpToFrame = (index) => {
    const trigger = ScrollTrigger.getAll().find(
      (t) => t.trigger === shellRef.current,
    );
    if (!trigger) return;

    const start = trigger.start;
    const end = trigger.end;
    const progress = index / (frames.length - 1);
    const y = start + (end - start) * progress;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <section className={styles.shell} ref={shellRef}>
      <div className={styles.pinWrap} ref={pinnedRef}>
        <div className={styles.heroGrid}>
          <div className={styles.copyRail} ref={heroCopyRef}>
            <span className={styles.eyebrow}>
              From Indian Origins<br/> to Global Markets
            </span>

            <h1 className={styles.title}>
              Indian exports,
              <br />
              shaped for
              <br />
              global shelves.
            </h1>

            <p className={styles.lead}>
              Spices, makhana, and dry fruits told through a grounded sourcing
              journey.
            </p>

            <div className={styles.ctaRow}>
              <button type="button" className={styles.primaryCta}>
                Explore Catalog
              </button>
              <button type="button" className={styles.secondaryCta}>
                Build Quote Cart
              </button>
            </div>

            <div className={styles.proofStrip}>
              <span>Farm-direct sourcing</span>
              <span>Export-grade supply</span>
              <span>Private-label ready</span>
            </div>
          </div>

          <div className={styles.visualStage} ref={visualChromeRef}>
            <div className={`${styles.parallaxLayer} ${styles.parallaxBack}`} />
            <div className={styles.visualGlow} />

            <div className={styles.storyImages}>
              {frames.map((frame, index) => (
                <div
                  key={`${frame.id}-bg`}
                  ref={(el) => (bgRefs.current[index] = el)}
                  className={styles.bgFrame}
                >
                  <img src={frame.bg} alt="" className={styles.bgImage} />
                </div>
              ))}

              {frames.map((frame, index) => (
                <div
                  key={`${frame.id}-fg`}
                  ref={(el) => (fgRefs.current[index] = el)}
                  className={styles.fgFrame}
                >
                  <div className={styles.fgCard}>
                    <img
                      src={frame.fg}
                      alt={frame.title}
                      className={styles.fgImage}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.frameStack}>
              {frames.map((frame, index) => (
                <article
                  key={frame.id}
                  ref={(el) => (frameRefs.current[index] = el)}
                  className={styles.frameCard}
                  aria-hidden={index !== activeFrame}
                >
                  <span className={styles.frameEyebrow}>{frame.eyebrow}</span>
                  <h2>{frame.title}</h2>
                  <p>{frame.blurb}</p>
                </article>
              ))}
            </div>

            <div className={styles.captionStack}>
              {frames.map((frame, index) => (
                <div
                  key={`${frame.id}-caption`}
                  ref={(el) => (captionRefs.current[index] = el)}
                  className={styles.captionPill}
                >
                  <span>{frame.accent}</span>
                </div>
              ))}
            </div>
            <div
              className={`${styles.parallaxLayer} ${styles.parallaxFront}`}
            />
          </div>
        </div>
      </div>
    </section>
  );
}