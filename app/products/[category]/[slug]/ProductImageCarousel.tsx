"use client";
import Image from "next/image";
import React, { useCallback, useRef, useState } from "react";
import styles from "../../products.module.css";

const MAX_SCALE = 3;
const MIN_SCALE = 1;

export default function ProductImageCarousel({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const [active, setActive] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [scale, setScale] = useState(1);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const pinchStart = useRef<{ dist: number; scale: number } | null>(null);

  /* keep the zoom focused wherever the pointer is */
  const updateOrigin = useCallback((clientX: number, clientY: number) => {
    const box = viewportRef.current?.getBoundingClientRect();
    if (!box) return;
    const x = ((clientX - box.left) / box.width) * 100;
    const y = ((clientY - box.top) / box.height) * 100;
    setOrigin({
      x: Math.min(100, Math.max(0, x)),
      y: Math.min(100, Math.max(0, y)),
    });
  }, []);

  const reset = useCallback(() => {
    setZoomed(false);
    setScale(1);
    setOrigin({ x: 50, y: 50 });
    pinchStart.current = null;
  }, []);

  const go = useCallback(
    (next: number) => {
      reset();
      setActive(next);
    },
    [reset],
  );

  /* ---------- mouse: hover to zoom ---------- */
  const onMouseMove = (e: React.MouseEvent) => {
    updateOrigin(e.clientX, e.clientY);
  };

  const onMouseEnter = (e: React.MouseEvent) => {
    updateOrigin(e.clientX, e.clientY);
    setZoomed(true);
    setScale((s) => (s > 1 ? s : 2));
  };

  /* ---------- click / tap to toggle zoom ---------- */
  const onClickImage = (e: React.MouseEvent) => {
    updateOrigin(e.clientX, e.clientY);
    if (zoomed && scale > 1) {
      reset();
    } else {
      setZoomed(true);
      setScale(2.2);
    }
  };

  /* ---------- touch: pinch to zoom ---------- */
  const dist = (t: React.TouchList) => {
    const dx = t[0].clientX - t[1].clientX;
    const dy = t[0].clientY - t[1].clientY;
    return Math.hypot(dx, dy);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      pinchStart.current = { dist: dist(e.touches), scale };
      const midX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
      const midY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
      updateOrigin(midX, midY);
      setZoomed(true);
    }
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && pinchStart.current) {
      e.preventDefault();
      const ratio = dist(e.touches) / pinchStart.current.dist;
      const next = Math.min(
        MAX_SCALE,
        Math.max(MIN_SCALE, pinchStart.current.scale * ratio),
      );
      setScale(next);
      const midX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
      const midY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
      updateOrigin(midX, midY);
    } else if (e.touches.length === 1 && zoomed && scale > 1) {
      /* single-finger pan while zoomed */
      e.preventDefault();
      updateOrigin(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (e.touches.length === 0) {
      pinchStart.current = null;
      if (scale <= 1.05) reset();
    }
  };

  /* ---------- wheel zoom (ctrl/cmd + wheel, like a pinch) ---------- */
  const onWheel = (e: React.WheelEvent) => {
    if (!e.ctrlKey && !e.metaKey) return;
    e.preventDefault();
    updateOrigin(e.clientX, e.clientY);
    setZoomed(true);
    setScale((s) =>
      Math.min(MAX_SCALE, Math.max(MIN_SCALE, s - e.deltaY * 0.005)),
    );
  };

  return (
    <div className={`product-carousel card ${styles.carousel}`}>
      <div
        ref={viewportRef}
        className={`${styles.viewport} ${styles.zoomable} ${
          zoomed && scale > 1 ? styles.isZoomed : ""
        }`}
        onMouseEnter={onMouseEnter}
        onMouseMove={onMouseMove}
        onMouseLeave={reset}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onWheel={onWheel}
      >
        <Image
          src={images[active]}
          alt={`${name} view ${active + 1}`}
          fill
          priority
          sizes="(max-width: 960px) 100vw, 620px"
          className={styles.imgContain}
          style={{
            transform: `scale(${zoomed ? scale : 1})`,
            transformOrigin: `${origin.x}% ${origin.y}%`,
          }}
          onClick={onClickImage}
        />

        {/* zoom affordance */}
        <span className={styles.zoomHint} aria-hidden="true">
          {zoomed && scale > 1
            ? `${scale.toFixed(1)}x - click to reset`
            : "Hover or pinch to zoom"}
        </span>

        {images.length > 1 && (
          <>
            <button
              type="button"
              className={`${styles.arrow} ${styles.arrowPrev}`}
              onClick={() => go((active - 1 + images.length) % images.length)}
              aria-label="Previous image"
            >
              &#8249;
            </button>
            <button
              type="button"
              className={`${styles.arrow} ${styles.arrowNext}`}
              onClick={() => go((active + 1) % images.length)}
              aria-label="Next image"
            >
              &#8250;
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className={styles.thumbGrid}>
          {images.map((img, i) => (
            <button
              type="button"
              key={img + i}
              onClick={() => go(i)}
              className={`${styles.thumb} ${
                i === active ? styles.thumbActive : ""
              }`}
              aria-label={`View image ${i + 1}`}
              aria-current={i === active}
            >
              <Image
                src={img}
                alt={`${name} thumbnail ${i + 1}`}
                fill
                sizes="80px"
                className={styles.imgContain}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
