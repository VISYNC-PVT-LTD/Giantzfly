"use client";

import type { Dispatch, SetStateAction } from "react";

export default function QuantityPicker({
  value,
  onChange,
}: {
  value: number;
  onChange: Dispatch<SetStateAction<number>>;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--space-3)",
      }}
    >
      <button
        type="button"
        className="btn btn-secondary"
        onClick={() => onChange((current) => Math.max(1, current - 1))}
      >
        -
      </button>

      <div
        style={{
          minWidth: 88,
          textAlign: "center",
          padding: "0.8rem 1rem",
          borderRadius: "var(--radius-lg)",
          border: "1px solid var(--border)",
          background: "var(--bg-card)",
          fontWeight: 700,
          color: "var(--navy)",
        }}
      >
        {value}
      </div>

      <button
        type="button"
        className="btn btn-secondary"
        onClick={() => onChange((current) => current + 1)}
      >
        +
      </button>
    </div>
  );
}
