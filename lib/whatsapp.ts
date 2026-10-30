import type { BuyerForm, QuoteItem, QuoteRequestItem } from "@/types";
import { normalizeSiteSettings } from "./settings-normalize.mjs";
import type { SiteSettings } from "./settings";

const defaultSettings = normalizeSiteSettings(null);
export const WHATSAPP_NUMBER = defaultSettings.whatsappNumber;

export function buildEnquiryMessage(
  buyer: BuyerForm,
  items: Array<QuoteItem | QuoteRequestItem>,
) {
  const productLines = items
    .map((item, index) => {
      const grade = item.product.grade || "As required";
      const quantity = String(item.quantity).trim();
      const quantityWithUnit = /^\d+(?:[.,]\d+)?$/.test(quantity)
        ? [quantity, item.product.moqUnit].filter(Boolean).join(" ") : quantity;
      return `${index + 1}. ${item.product.name} — ${grade} — ${item.packaging || "To be discussed"} — Qty: ${quantityWithUnit || "MOQ discussion"}${item.notes ? ` — ${item.notes}` : ""}`;
    })
    .join("\n");

  return [
    "New Export Enquiry — Giantzfly",
    "——————————————",
    `Buyer: ${buyer.name} | ${buyer.company} | ${buyer.country}`,
    `Contact: ${buyer.email} | ${buyer.whatsapp}`,
    "——————————————",
    "PRODUCTS REQUESTED:",
    productLines,
    "——————————————",
    `Notes: ${buyer.notes || "—"}`,
    "——————————————",
    "Sent via the Giantzfly website",
  ].join("\n");
}

export function buildWhatsAppURL(
  buyer: BuyerForm,
  items: Array<QuoteItem | QuoteRequestItem>,
  settings: Pick<SiteSettings, "whatsappNumber"> = defaultSettings,
) {
  return `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(buildEnquiryMessage(buyer, items))}`;
}

export function buildEmailURL(
  buyer: BuyerForm,
  items: Array<QuoteItem | QuoteRequestItem>,
  settings: Pick<SiteSettings, "emailHref"> = defaultSettings,
) {
  return `${settings.emailHref}?subject=${encodeURIComponent("Trade Enquiry — Giantzfly")}&body=${encodeURIComponent(buildEnquiryMessage(buyer, items))}`;
}
