"use client";
import { createContext, useContext, useReducer, useEffect } from "react";

const CartContext = createContext(null);

const STORAGE_KEY = "gf_quote_cart";

function reducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const existing = state.items.find((i) => i.id === action.product.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.id === action.product.id
              ? { ...i, qty: i.qty + 1, note: action.note || i.note }
              : i
          ),
        };
      }
      return {
        ...state,
        items: [
          ...state.items,
          {
            id: action.product.id,
            slug: action.product.slug,
            name: action.product.name,
            grade: action.product.grade,
            category: action.product.category,
            image: action.product.image,
            moq: action.product.moq,
            qty: 1,
            note: action.note || "",
          },
        ],
      };
    }
    case "REMOVE":
      return { ...state, items: state.items.filter((i) => i.id !== action.id) };
    case "UPDATE_QTY":
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.id ? { ...i, qty: Math.max(1, action.qty) } : i
        ),
      };
    case "UPDATE_NOTE":
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.id ? { ...i, note: action.note } : i
        ),
      };
    case "CLEAR":
      return { ...state, items: [] };
    case "HYDRATE":
      return { ...state, items: action.items };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, { items: [] });

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) dispatch({ type: "HYDRATE", items: JSON.parse(saved) });
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    } catch {}
  }, [state.items]);

  const add = (product, note = "") =>
    dispatch({ type: "ADD", product, note });

  const remove = (id) => dispatch({ type: "REMOVE", id });

  const updateQty = (id, qty) => dispatch({ type: "UPDATE_QTY", id, qty });

  const updateNote = (id, note) => dispatch({ type: "UPDATE_NOTE", id, note });

  const clear = () => dispatch({ type: "CLEAR" });

  const isInCart = (id) => state.items.some((i) => i.id === id);

  return (
    <CartContext.Provider
      value={{ items: state.items, add, remove, updateQty, updateNote, clear, isInCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

/* Build WhatsApp enquiry message */
export function buildWhatsAppMessage(items, buyerInfo = {}) {
  const { name = "", company = "", country = "", email = "" } = buyerInfo;
  const lines = [
    `*New Trade Enquiry — GiantzFly Exim LLP*`,
    ``,
    `*Buyer Details*`,
    name ? `Name: ${name}` : null,
    company ? `Company: ${company}` : null,
    country ? `Country: ${country}` : null,
    email ? `Email: ${email}` : null,
    ``,
    `*Products Required*`,
    ...items.map((item, i) =>
      `${i + 1}. ${item.name} (All Grade Available)\n   Qty: ${item.qty} × MOQ (${item.moq})${item.note ? `\n   Note: ${item.note}` : ""}`
    ),
    ``,
    `Please share pricing, lead time and packaging options.`,
  ].filter((l) => l !== null);

  return encodeURIComponent(lines.join("\n"));
}

export const WA_NUMBER = "919876543210"; // replace with real number