"use client";

import { useEffect, useRef, useState } from "react";

// ---------------------------------------------------------------------------
// TEMP placeholder game — Breakout w/ powerups. See app/page.tsx for usage.
// Restore original homepage by removing the <BreakoutGame /> call there.
// ---------------------------------------------------------------------------

const WIDTH = 480;
const HEIGHT = 360;
const PADDLE_H = 12;
const BASE_PADDLE_W = 80;
const MIN_PADDLE_W = 40;
const MAX_PADDLE_W = 170;
const BALL_R = 6;
const BRICK_ROWS = 5;
const BRICK_COLS = 8;
const BRICK_W = WIDTH / BRICK_COLS;
const BRICK_H = 18;
const BRICK_TOP = 30;
const HIGH_SCORE_KEY = "gantzfly_breakout_highscore";
const POWERUP_DROP_CHANCE = 0.28;
const POWERUP_DURATION = 10000; // ms, for shooter/size effects
const PADDLE_EASE = 0.28; // lerp factor, higher = snappier
const PADDLE_KEY_SPEED = 7.5;
const BASE_BALL_SPEED = 3.4;

type Ball = { x: number; y: number; vx: number; vy: number };
type Bullet = { x: number; y: number };
type Brick = { x: number; y: number; alive: boolean; hue: number };
type PowerupType = "multi2" | "multi4" | "multi5" | "shooter1" | "shooter2" | "grow" | "shrink";
type FallingPowerup = { x: number; y: number; vy: number; type: PowerupType };

const POWERUP_META: Record<PowerupType, { label: string; color: string }> = {
  multi2: { label: "x2", color: "#38bdf8" },
  multi4: { label: "x4", color: "#38bdf8" },
  multi5: { label: "x5", color: "#38bdf8" },
  shooter1: { label: "S", color: "#f97316" },
  shooter2: { label: "SS", color: "#f97316" },
  grow: { label: "+", color: "#22c55e" },
  shrink: { label: "−", color: "#ef4444" },
};
const POWERUP_TYPES: PowerupType[] = [
  "multi2",
  "multi4",
  "multi5",
  "shooter1",
  "shooter2",
  "grow",
  "shrink",
];

function makeBricks(rows: number): Brick[] {
  const bricks: Brick[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < BRICK_COLS; c++) {
      bricks.push({ x: c * BRICK_W, y: r * BRICK_H + BRICK_TOP, alive: true, hue: 20 + r * 28 });
    }
  }
  return bricks;
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

export default function BreakoutGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [status, setStatus] = useState<"playing" | "lost">("playing");
  const [level, setLevel] = useState(1);
  const [seed, setSeed] = useState(0);
  const [activePowerups, setActivePowerups] = useState<string[]>([]);

  useEffect(() => {
    const stored = Number(localStorage.getItem(HIGH_SCORE_KEY) || 0);
    setHighScore(stored);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const paddleY = HEIGHT - 22;
    let paddleX = WIDTH / 2 - BASE_PADDLE_W / 2;
    let paddleTargetX = paddleX;
    let paddleW = BASE_PADDLE_W;
    let paddleGlow = 0;
    let borderGlow = 0;
    let currentLevel = 1;
    let ballSpeed = BASE_BALL_SPEED;
    const keysDown = new Set<string>();
    let usingPointer = true;

    let balls: Ball[] = [{ x: WIDTH / 2, y: HEIGHT - 50, vx: ballSpeed, vy: -ballSpeed }];
    let bullets: Bullet[] = [];
    let falling: FallingPowerup[] = [];
    let bricks = makeBricks(BRICK_ROWS);

    let shooterLevel = 0; // 0 none, 1 single, 2 double
    let shooterUntil = 0;
    let sizeUntil = 0;
    let lastShot = 0;

    let localScore = 0;
    let raf = 0;
    let over = false;

    function onMouseMove(e: MouseEvent) {
      usingPointer = true;
      const rect = canvas!.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * WIDTH;
      paddleTargetX = Math.min(WIDTH - paddleW, Math.max(0, x - paddleW / 2));
    }
    function onTouchMove(e: TouchEvent) {
      usingPointer = true;
      const rect = canvas!.getBoundingClientRect();
      const x = ((e.touches[0].clientX - rect.left) / rect.width) * WIDTH;
      paddleTargetX = Math.min(WIDTH - paddleW, Math.max(0, x - paddleW / 2));
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.code === "ArrowLeft" || e.code === "ArrowRight") {
        usingPointer = false;
        keysDown.add(e.code);
      }
      if (e.code === "Space") fire();
    }
    function onKeyUp(e: KeyboardEvent) {
      keysDown.delete(e.code);
    }
    function fire() {
      const now = performance.now();
      if (shooterLevel === 0 || now - lastShot < 260) return;
      lastShot = now;
      if (shooterLevel === 1) {
        bullets.push({ x: paddleX + paddleW / 2, y: paddleY });
      } else {
        bullets.push({ x: paddleX + 10, y: paddleY });
        bullets.push({ x: paddleX + paddleW - 10, y: paddleY });
      }
    }
    function onClick() {
      fire();
    }
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("touchmove", onTouchMove);
    canvas.addEventListener("click", onClick);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    function updatePowerupBadges() {
      const list: string[] = [];
      const now = performance.now();
      if (shooterLevel === 1 && now < shooterUntil) list.push("Shooter");
      if (shooterLevel === 2 && now < shooterUntil) list.push("Double Shooter");
      if (now < sizeUntil && paddleW > BASE_PADDLE_W) list.push("Paddle+");
      if (now < sizeUntil && paddleW < BASE_PADDLE_W) list.push("Paddle−");
      if (balls.length > 1) list.push(`${balls.length} Balls`);
      setActivePowerups(list);
    }

    function applyPowerup(type: PowerupType) {
      const now = performance.now();
      if (type === "multi2" || type === "multi4" || type === "multi5") {
        const extra = type === "multi2" ? 1 : type === "multi4" ? 3 : 4;
        const source = balls[0] ?? { x: paddleX + paddleW / 2, y: paddleY - 10, vx: 3, vy: -3 };
        for (let i = 0; i < extra; i++) {
          const angle = (Math.PI / 6) * (i - extra / 2);
          balls.push({
            x: source.x,
            y: source.y,
            vx: source.vx * Math.cos(angle) - source.vy * Math.sin(angle),
            vy: source.vx * Math.sin(angle) + source.vy * Math.cos(angle),
          });
        }
      } else if (type === "shooter1") {
        shooterLevel = 1;
        shooterUntil = now + POWERUP_DURATION;
      } else if (type === "shooter2") {
        shooterLevel = 2;
        shooterUntil = now + POWERUP_DURATION;
      } else if (type === "grow") {
        paddleW = Math.min(MAX_PADDLE_W, paddleW + 35);
        sizeUntil = now + POWERUP_DURATION;
      } else if (type === "shrink") {
        paddleW = Math.max(MIN_PADDLE_W, paddleW - 25);
        sizeUntil = now + POWERUP_DURATION;
      }
    }

    function endGame() {
      over = true;
      setStatus("lost");
      setHighScore((prev) => {
        const next = Math.max(prev, localScore);
        localStorage.setItem(HIGH_SCORE_KEY, String(next));
        return next;
      });
    }

    function nextLevel() {
      currentLevel += 1;
      setLevel(currentLevel);
      ballSpeed = BASE_BALL_SPEED + (currentLevel - 1) * 0.4;
      const rows = Math.min(BRICK_ROWS + Math.floor((currentLevel - 1) / 2), 7);
      bricks = makeBricks(rows);
      bullets = [];
      falling = [];
      paddleW = BASE_PADDLE_W;
      shooterLevel = 0;
      const angle = -Math.PI / 2 + (Math.random() - 0.5) * 0.8;
      balls = [
        {
          x: WIDTH / 2,
          y: HEIGHT - 50,
          vx: ballSpeed * Math.cos(angle),
          vy: ballSpeed * Math.sin(angle),
        },
      ];
      borderGlow = 1;
    }

    function drawCornerBrackets(glow: number) {
      const len = 22;
      const inset = 3;
      ctx!.save();
      ctx!.strokeStyle = "#38bdf8";
      ctx!.lineWidth = 3;
      ctx!.shadowColor = "#38bdf8";
      ctx!.shadowBlur = 6 + glow * 18;
      const corners: [number, number, number, number][] = [
        [inset, inset, 1, 1],
        [WIDTH - inset, inset, -1, 1],
        [inset, HEIGHT - inset, 1, -1],
        [WIDTH - inset, HEIGHT - inset, -1, -1],
      ];
      for (const [cx, cy, dx, dy] of corners) {
        ctx!.beginPath();
        ctx!.moveTo(cx, cy + len * dy);
        ctx!.lineTo(cx, cy);
        ctx!.lineTo(cx + len * dx, cy);
        ctx!.stroke();
      }
      ctx!.restore();
    }

    function tick() {
      if (over) return;
      const now = performance.now();

      // revert timed powerups
      if (shooterLevel !== 0 && now > shooterUntil) shooterLevel = 0;
      if (now > sizeUntil && paddleW !== BASE_PADDLE_W) {
        paddleW += paddleW < BASE_PADDLE_W ? 2 : -2;
        if (Math.abs(paddleW - BASE_PADDLE_W) < 2) paddleW = BASE_PADDLE_W;
      }
      paddleGlow *= 0.9;
      borderGlow *= 0.92;

      // smooth paddle control: keyboard nudges target, pointer sets target directly
      if (!usingPointer) {
        if (keysDown.has("ArrowLeft")) paddleTargetX -= PADDLE_KEY_SPEED;
        if (keysDown.has("ArrowRight")) paddleTargetX += PADDLE_KEY_SPEED;
        paddleTargetX = Math.min(WIDTH - paddleW, Math.max(0, paddleTargetX));
      }
      paddleX += (paddleTargetX - paddleX) * PADDLE_EASE;

      ctx!.clearRect(0, 0, WIDTH, HEIGHT);

      // backdrop — light theme
      const bg = ctx!.createLinearGradient(0, 0, 0, HEIGHT);
      bg.addColorStop(0, "#f8fafc");
      bg.addColorStop(1, "#eef2f7");
      ctx!.fillStyle = bg;
      ctx!.fillRect(0, 0, WIDTH, HEIGHT);

      // bricks
      let aliveCount = 0;
      for (const b of bricks) {
        if (!b.alive) continue;
        aliveCount++;
        ctx!.fillStyle = `hsl(${b.hue}, 85%, 55%)`;
        roundRect(ctx!, b.x + 2, b.y + 2, BRICK_W - 4, BRICK_H - 4, 3);
        ctx!.fill();
      }

      // falling powerups
      for (const p of falling) {
        p.y += p.vy;
        const meta = POWERUP_META[p.type];
        ctx!.save();
        ctx!.fillStyle = meta.color;
        ctx!.shadowColor = meta.color;
        ctx!.shadowBlur = 10;
        roundRect(ctx!, p.x - 14, p.y - 10, 28, 20, 5);
        ctx!.fill();
        ctx!.fillStyle = "#0f172a";
        ctx!.font = "bold 10px sans-serif";
        ctx!.textAlign = "center";
        ctx!.textBaseline = "middle";
        ctx!.fillText(meta.label, p.x, p.y + 1);
        ctx!.restore();
      }
      falling = falling.filter((p) => {
        if (p.y > paddleY - 4 && p.y < paddleY + PADDLE_H && p.x > paddleX && p.x < paddleX + paddleW) {
          applyPowerup(p.type);
          paddleGlow = 1;
          return false;
        }
        return p.y < HEIGHT + 20;
      });

      // bullets
      bullets = bullets.filter((bu) => {
        bu.y -= 6;
        if (bu.y < 0) return false;
        for (const b of bricks) {
          if (!b.alive) continue;
          if (bu.x > b.x && bu.x < b.x + BRICK_W && bu.y > b.y && bu.y < b.y + BRICK_H) {
            b.alive = false;
            localScore += 10;
            setScore(localScore);
            borderGlow = 1;
            maybeDropPowerup(b);
            return false;
          }
        }
        return true;
      });
      ctx!.fillStyle = "#facc15";
      for (const bu of bullets) {
        ctx!.save();
        ctx!.shadowColor = "#facc15";
        ctx!.shadowBlur = 8;
        ctx!.fillRect(bu.x - 1.5, bu.y - 6, 3, 10);
        ctx!.restore();
      }

      function maybeDropPowerup(b: Brick) {
        if (Math.random() < POWERUP_DROP_CHANCE) {
          const type = POWERUP_TYPES[Math.floor(Math.random() * POWERUP_TYPES.length)];
          falling.push({ x: b.x + BRICK_W / 2, y: b.y + BRICK_H / 2, vy: 1.6, type });
        }
      }

      // balls
      const survivors: Ball[] = [];
      for (const ball of balls) {
        ball.x += ball.vx;
        ball.y += ball.vy;
        if (ball.x < BALL_R || ball.x > WIDTH - BALL_R) ball.vx *= -1;
        if (ball.y < BALL_R) {
          ball.vy *= -1;
          borderGlow = 1;
        }
        if (
          ball.y > paddleY - BALL_R &&
          ball.y < paddleY + PADDLE_H &&
          ball.x > paddleX &&
          ball.x < paddleX + paddleW
        ) {
          const speed = Math.hypot(ball.vx, ball.vy) || ballSpeed;
          const hit = (ball.x - (paddleX + paddleW / 2)) / (paddleW / 2);
          const angle = -Math.PI / 2 + hit * (Math.PI / 3);
          ball.vx = speed * Math.cos(angle);
          ball.vy = speed * Math.sin(angle);
          paddleGlow = 1;
        }
        for (const b of bricks) {
          if (!b.alive) continue;
          if (
            ball.x > b.x &&
            ball.x < b.x + BRICK_W &&
            ball.y - BALL_R < b.y + BRICK_H &&
            ball.y + BALL_R > b.y
          ) {
            b.alive = false;
            ball.vy *= -1;
            localScore += 10;
            setScore(localScore);
            borderGlow = 1;
            maybeDropPowerup(b);
            break;
          }
        }
        if (ball.y <= HEIGHT + BALL_R) survivors.push(ball);
      }
      balls = survivors;

      for (const ball of balls) {
        ctx!.save();
        ctx!.fillStyle = "#1e293b";
        ctx!.shadowColor = "#38bdf8";
        ctx!.shadowBlur = 10;
        ctx!.beginPath();
        ctx!.arc(ball.x, ball.y, BALL_R, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.restore();
      }

      // paddle
      ctx!.save();
      const grad = ctx!.createLinearGradient(paddleX, 0, paddleX + paddleW, 0);
      grad.addColorStop(0, "#1d4ed8");
      grad.addColorStop(0.5, "#3b82f6");
      grad.addColorStop(1, "#1d4ed8");
      ctx!.fillStyle = grad;
      ctx!.shadowColor = "#60a5fa";
      ctx!.shadowBlur = 6 + paddleGlow * 22;
      roundRect(ctx!, paddleX, paddleY, paddleW, PADDLE_H, PADDLE_H / 2);
      ctx!.fill();
      // paddle end caps accent
      ctx!.fillStyle = "#93c5fd";
      ctx!.beginPath();
      ctx!.arc(paddleX + 4, paddleY + PADDLE_H / 2, 2.2, 0, Math.PI * 2);
      ctx!.arc(paddleX + paddleW - 4, paddleY + PADDLE_H / 2, 2.2, 0, Math.PI * 2);
      ctx!.fill();
      ctx!.restore();

      drawCornerBrackets(borderGlow);

      // border glow ring on hit
      if (borderGlow > 0.05) {
        ctx!.save();
        ctx!.strokeStyle = "#38bdf8";
        ctx!.shadowColor = "#38bdf8";
        ctx!.shadowBlur = borderGlow * 20;
        ctx!.lineWidth = 2;
        ctx!.globalAlpha = borderGlow;
        ctx!.strokeRect(1, 1, WIDTH - 2, HEIGHT - 2);
        ctx!.restore();
      }

      if (aliveCount === 0) {
        nextLevel();
      }
      if (balls.length === 0) {
        endGame();
        return;
      }

      if (Math.floor(now / 200) % 2 === 0) updatePowerupBadges();

      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("touchmove", onTouchMove);
      canvas.removeEventListener("click", onClick);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [seed]);

  function retry() {
    setScore(0);
    setLevel(1);
    setStatus("playing");
    setActivePowerups([]);
    setSeed((s) => s + 1);
  }

  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
        padding: "2rem 1rem",
        textAlign: "center",
      }}
    >
      <style>{`
        header a, header button,
        nav a, nav button,
        footer a, footer button {
          pointer-events: none !important;
          opacity: 0.45 !important;
          cursor: not-allowed !important;
        }
      `}</style>
      <h1 style={{ fontSize: "1.75rem", fontWeight: 700, color: "#111827" }}>
        🚧 We&apos;re building something. Break some bricks meanwhile.
      </h1>
      <div
        style={{
          display: "flex",
          gap: "1.5rem",
          fontSize: "0.95rem",
          color: "#1f2937",
          opacity: 0.85,
        }}
      >
        <span>Level: {level}</span>
        <span>Score: {score}</span>
        <span>High Score: {highScore}</span>
      </div>
      <div
        style={{
          minHeight: "1.5rem",
          display: "flex",
          gap: "0.5rem",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {activePowerups.map((p) => (
          <span
            key={p}
            style={{
              fontSize: "0.75rem",
              fontWeight: 600,
              padding: "2px 8px",
              borderRadius: 999,
              background: "rgba(56,189,248,0.15)",
              color: "#38bdf8",
              border: "1px solid rgba(56,189,248,0.4)",
            }}
          >
            {p}
          </span>
        ))}
      </div>
      <div style={{ position: "relative" }}>
        <canvas
          ref={canvasRef}
          width={WIDTH}
          height={HEIGHT}
          style={{
            borderRadius: 10,
            boxShadow: "0 8px 30px rgba(0,0,0,0.45)",
            touchAction: "none",
          }}
        />
        {status !== "playing" && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.75rem",
              background: "rgba(15,23,42,0.85)",
              borderRadius: 10,
            }}
          >
            <p style={{ fontWeight: 600, color: "#e5e7eb" }}>💥 Game over — Score: {score}</p>
            <button
              onClick={retry}
              style={{
                padding: "0.5rem 1.25rem",
                borderRadius: 6,
                border: "none",
                background: "#2f6fed",
                color: "white",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Retry
            </button>
          </div>
        )}
      </div>
      <p style={{ opacity: 0.7, fontSize: "0.85rem" }}>
        Mouse / drag or ← → to steer. Click or Space to fire when Shooter is active. Catch
        falling icons for powerups. Clear all bricks to level up.
      </p>
      <p style={{ marginTop: "1.5rem", fontSize: "1.1rem", fontWeight: 500 }}>
        Website coming soon.
      </p>
    </div>
  );
}
