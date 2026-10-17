"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Product, QuoteItem } from "@/types";

type QuoteCartContextType = {
  items: QuoteItem[];
  addItem: (product: Product, quantity?: number, packaging?: string) => void;
  removeItem: (productId: string) => void;
  updateItem: (productId: string, patch: Partial<QuoteItem>) => void;
  clearCart: () => void;
  totalItems: number;
  hasItem: (productId: string) => boolean;
};

const QuoteCartContext = createContext<QuoteCartContextType | null>(null);

export function QuoteCartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<QuoteItem[]>(() => {
    if (typeof window === "undefined") return [];
    const raw = sessionStorage.getItem("giantzfly-quote-cart");
    return raw ? JSON.parse(raw) : [];
  });

  useEffect(() => {
    sessionStorage.setItem("giantzfly-quote-cart", JSON.stringify(items));
  }, [items]);

  const value = useMemo<QuoteCartContextType>(
    () => ({
      items,
      addItem(product, quantity = 1, packaging) {
        setItems((prev) => {
          const existing = prev.find((item) => item.product.id === product.id);
          if (existing) {
            return prev.map((item) =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item,
            );
          }
          return [
            ...prev,
            {
              product,
              quantity,
              packaging: packaging || product.packagingOptions[0],
            },
          ];
        });
      },
      removeItem(productId) {
        setItems((prev) =>
          prev.filter((item) => item.product.id !== productId),
        );
      },
      updateItem(productId, patch) {
        setItems((prev) =>
          prev.map((item) =>
            item.product.id === productId ? { ...item, ...patch } : item,
          ),
        );
      },
      clearCart() {
        setItems([]);
      },
      totalItems: items.length,
      hasItem(productId) {
        return items.some((item) => item.product.id === productId);
      },
    }),
    [items],
  );

  return (
    <QuoteCartContext.Provider value={value}>
      {children}
    </QuoteCartContext.Provider>
  );
}

export function useQuoteCart() {
  const context = useContext(QuoteCartContext);
  if (!context) {
    throw new Error("useQuoteCart must be used inside QuoteCartProvider");
  }
  return context;
}