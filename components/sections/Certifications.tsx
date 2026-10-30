"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, FileImage, Maximize2, X, ZoomIn, ZoomOut } from "lucide-react";
import { certificatePlaceholders } from "@/data/certificates.mjs";
import styles from "./Certifications.module.css";

type PublicCertificate = (typeof certificatePlaceholders)[number];

const ZOOM_STEPS = [1, 1.6, 2.4, 3.2];

function pagesOf(item: PublicCertificate): ReadonlyArray<string> {
  if ("pages" in item && item.pages?.length) return item.pages;
  return item.imageUrl ? [item.imageUrl] : [];
}

export default function Certifications({
  certificates = certificatePlaceholders,
}: {
  certificates?: ReadonlyArray<PublicCertificate>;
}) {
  const [failedImages, setFailedImages] = useState<string[]>([]);
  const [viewer, setViewer] = useState<{ cert: number; page: number } | null>(null);
  const [zoom, setZoom] = useState(0);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastTrigger = useRef<HTMLElement | null>(null);
  const imagesPending = certificates.every((item) => !item.imageUrl);

  const active = viewer ? certificates[viewer.cert] : null;
  const activePages = active ? pagesOf(active) : [];

  const close = useCallback(() => {
    setViewer(null);
    setZoom(0);
    lastTrigger.current?.focus();
  }, []);

  const go = useCallback(
    (delta: number) => {
      setViewer((v) => {
        if (!v) return v;
        const total = pagesOf(certificates[v.cert]).length;
        return { ...v, page: Math.min(total - 1, Math.max(0, v.page + delta)) };
      });
      setZoom(0);
    },
    [certificates],
  );

  const changeZoom = useCallback((delta: number) => {
    setZoom((z) => Math.min(ZOOM_STEPS.length - 1, Math.max(0, z + delta)));
  }, []);

  useEffect(() => {
    if (!viewer) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "+" || e.key === "=") changeZoom(1);
      else if (e.key === "-") changeZoom(-1);
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [viewer, close, go, changeZoom]);

  const src = active ? activePages[viewer!.page] : null;
  const scale = ZOOM_STEPS[zoom];

  return (
    <section id="certificates" className={styles.section} aria-labelledby="certificates-heading">
      <div className="container">
        <div className={styles.head}>
          <h2 id="certificates-heading" className={styles.heading}>Certificates</h2>
          <p className={styles.lead}>
            {imagesPending
              ? "Images pending. Public copies will appear here when available."
              : "Registrations and licences held by Giantzfly Exim LLP. Select a document to enlarge it."}
          </p>
        </div>

        <div className={styles.grid}>
          {certificates.map((item, index) => {
            const imageFailed = failedImages.includes(item.imageUrl ?? "");
            const pages = pagesOf(item);
            const canOpen = Boolean(item.imageUrl) && !imageFailed;
            return (
              <figure key={item.id} className={styles.document}>
                <button
                  type="button"
                  className={styles.portrait}
                  disabled={!canOpen}
                  onClick={(e) => {
                    lastTrigger.current = e.currentTarget;
                    setViewer({ cert: index, page: 0 });
                  }}
                  aria-label={canOpen ? `Enlarge ${item.title} certificate` : `${item.title} image unavailable`}
                >
                  {canOpen ? (
                    <>
                      <Image
                        src={item.imageUrl!}
                        alt={`${item.title} certificate`}
                        fill
                        unoptimized
                        sizes="(max-width: 480px) 100vw, (max-width: 968px) 50vw, 25vw"
                        className={styles.image}
                        onError={() => setFailedImages((failed) => [...failed, item.imageUrl!])}
                      />
                      <span className={styles.enlarge} aria-hidden="true">
                        <Maximize2 size={14} />
                        {pages.length > 1 ? `${pages.length} pages` : "Enlarge"}
                      </span>
                    </>
                  ) : (
                    <span className={styles.empty}>
                      <FileImage size={32} strokeWidth={1.25} aria-hidden="true" />
                      <span>{imageFailed ? "Image unavailable" : "Image pending"}</span>
                    </span>
                  )}
                </button>
                <figcaption className={styles.caption}>{item.title}</figcaption>
              </figure>
            );
          })}
        </div>
      </div>

      {viewer && active && src && (
        <div
          className={styles.lightbox}
          role="dialog"
          aria-modal="true"
          aria-label={`${active.title} certificate`}
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <div className={styles.lbBar}>
            <div className={styles.lbTitle}>
              <strong>{active.title}</strong>
              {activePages.length > 1 && (
                <span>
                  Page {viewer.page + 1} of {activePages.length}
                </span>
              )}
            </div>
            <div className={styles.lbTools}>
              <button type="button" onClick={() => changeZoom(-1)} disabled={zoom === 0} aria-label="Zoom out">
                <ZoomOut size={18} />
              </button>
              <span className={styles.lbZoom} aria-live="polite">{Math.round(scale * 100)}%</span>
              <button
                type="button"
                onClick={() => changeZoom(1)}
                disabled={zoom === ZOOM_STEPS.length - 1}
                aria-label="Zoom in"
              >
                <ZoomIn size={18} />
              </button>
              <button type="button" ref={closeRef} onClick={close} aria-label="Close viewer">
                <X size={18} />
              </button>
            </div>
          </div>

          <div className={styles.lbStage} onClick={(e) => { if (e.target === e.currentTarget) close(); }}>
            {activePages.length > 1 && (
              <button
                type="button"
                className={`${styles.lbNav} ${styles.lbPrev}`}
                onClick={() => go(-1)}
                disabled={viewer.page === 0}
                aria-label="Previous page"
              >
                <ChevronLeft size={22} />
              </button>
            )}

            <div className={styles.lbScroll}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={`${active.title} certificate, page ${viewer.page + 1}`}
                className={styles.lbImage}
                style={{ width: `${scale * 100}%` }}
                onClick={() => setZoom((z) => (z === 0 ? 1 : 0))}
                draggable={false}
              />
            </div>

            {activePages.length > 1 && (
              <button
                type="button"
                className={`${styles.lbNav} ${styles.lbNext}`}
                onClick={() => go(1)}
                disabled={viewer.page === activePages.length - 1}
                aria-label="Next page"
              >
                <ChevronRight size={22} />
              </button>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
