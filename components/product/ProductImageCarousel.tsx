"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";
import styles from "../../products.module.css";

export default function ProductImageCarousel({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const [active, setActive] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [origin, setOrigin] = useState("50% 50%");
  const viewportRef = useRef<HTMLDivElement>(null);

  function updateOrigin(clientX: number, clientY: number) {
    const el = viewportRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;
    setOrigin(`${x}% ${y}%`);
  }

  return (
    <div className={`product-carousel card ${styles.carousel}`}>
      <div
        ref={viewportRef}
        className={`${styles.viewport} ${styles.zoomable}`}
        onMouseEnter={() => setZoomed(true)}
        onMouseLeave={() => setZoomed(false)}
        onMouseMove={(e) => updateOrigin(e.clientX, e.clientY)}
        onTouchStart={(e) => {
          if (e.touches.length === 1) {
            updateOrigin(e.touches[0].clientX, e.touches[0].clientY);
            setZoomed((z) => !z);
          }
        }}
      >
        <Image
          src={images[active]}
          alt={`${name} view ${active + 1}`}
          fill
          priority
          className={styles.imgCover}
          style={{
            transformOrigin: origin,
            transform: zoomed ? "scale(2)" : "scale(1)",
            transition: "transform 0.25s ease",
          }}
        />
        <button
          className={`${styles.arrow} ${styles.arrowPrev}`}
          onClick={() => setActive((p) => (p - 1 + images.length) % images.length)}
          aria-label="Previous image"
        />
        <button
          className={`${styles.arrow} ${styles.arrowNext}`}
          onClick={() => setActive((p) => (p + 1) % images.length)}
          aria-label="Next image"
        />
      </div>
      <div className={styles.thumbGrid}>
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`${styles.thumb} ${i === active ? styles.thumbActive : ""}`}
            aria-label={`View image ${i + 1}`}
          >
            <Image src={img} alt={`${name} thumbnail ${i + 1}`} fill sizes="80px" className={styles.imgCover} />
          </button>
        ))}
      </div>
    </div>
  );
}