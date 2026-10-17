import type { BuyerForm, QuoteItem, QuoteRequestItem } from "@/types";

export const WHATSAPP_NUMBER = "918879965547"; // replace with your number

export function buildWhatsAppURL(
  buyer: BuyerForm,
  items: Array<QuoteItem | QuoteRequestItem>,
) {
  const productLines = items
    .map((item, index) => {
      const grade = item.product.grade ? "All Grade Available" : "As required";
      return `${index + 1}. ${item.product.name} — ${grade} — ${item.packaging} — Qty: ${item.quantity} ${item.product.moqUnit}`;
    })
    .join("\n");

  const message = [
    "New Export Enquiry — GiantzFly Exim LLP",
    "——————————————",
    `Buyer: ${buyer.name} | ${buyer.company} | ${buyer.country}`,
    `Contact: ${buyer.email} | ${buyer.whatsapp}`,
    "——————————————",
    "PRODUCTS REQUESTED:",
    productLines,
    "——————————————",
    `Notes: ${buyer.notes || "—"}`,
    "——————————————",
    "Sent via giantzfly.com",
  ].join("\n");

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}