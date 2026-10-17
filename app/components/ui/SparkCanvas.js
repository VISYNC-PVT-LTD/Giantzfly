"use client";
import { useEffect, useRef } from "react";

export default function SparkCanvas({
  color = "oklch(72% 0.18 68)",
  amount = 38,
  speed = 0.6,
  style = {},
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    let w, h;

    function resize() {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    /* Parse OKLCH → approximate RGB for canvas */
    const tempEl = document.createElement("div");
    tempEl.style.color = color;
    document.body.appendChild(tempEl);
    const rgb = getComputedStyle(tempEl).color || "rgb(230, 180, 60)";
    tempEl.remove();

    function makeParticle() {
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * speed * 0.8,
        vy: -(Math.random() * speed + 0.2),
        r: Math.random() * 1.8 + 0.4,
        life: Math.random(),
        decay: Math.random() * 0.006 + 0.002,
      };
    }

    const particles = Array.from({ length: amount }, makeParticle);

    function draw() {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= p.decay;
        if (p.life <= 0) Object.assign(p, makeParticle(), { life: 1 });

        ctx.save();
        ctx.globalAlpha = p.life * 0.7;
        ctx.fillStyle = rgb;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      animId = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, [color, amount, speed]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 2,
        ...style,
      }}
    />
  );
}