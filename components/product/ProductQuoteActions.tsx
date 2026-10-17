"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQuoteCart } from "@/context/QuoteCartContext";
import type { Product } from "@/types";
import QuantityPicker from "@/components/product/QuantityPicker";

export default function ProductQuoteActions({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useQuoteCart();
  const router = useRouter();

  function handleAdd() {
    addItem(product, quantity);
    router.push("/quote-cart");
  }

  return (
    <>
      <div
        style={{
          display: "grid",
          gap: "var(--space-3)",
        }}
      >
        <QuantityPicker value={quantity} onChange={setQuantity} />
      </div>

      <div
        style={{
          marginTop: "var(--space-5)",
          display: "flex",
          flexWrap: "wrap",
          gap: "var(--space-3)",
        }}
      >
        <button type="button" className="btn btn-primary" onClick={handleAdd}>
          Add to Quote
        </button>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => addItem(product, quantity)}
        >
          Request This
        </button>

        <Link href={`/products/${product.category}`} className="btn btn-ghost">
          Back to Category
        </Link>
      </div>
    </>
  );
}
