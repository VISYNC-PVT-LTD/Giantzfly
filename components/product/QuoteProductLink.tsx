"use client";

import Link from "next/link";
import { useQuoteCart } from "@/context/QuoteCartContext";
import type { Product } from "@/types";

export default function QuoteProductLink({ product, className }: { product: Product; className?: string }) {
  const { addItem } = useQuoteCart();
  return (
    <Link href="/quote-cart" className={className} onClick={() => addItem(product)}>
      Add to quote →
    </Link>
  );
}
