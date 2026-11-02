import type { Product, ProductCategory } from "@/types";
import { exportMarketNames } from "./export-markets";

/**
 * Per-kg price list supplied by the Giantzfly team (October 2026).
 * Prices are in INR per kg. Taxes and transport are charged as applicable.
 * Minimum pack 50 g. Minimum order 2 kg per product.
 */
export const PRICE_NOTE = "Taxes and transport as applicable.";
export const MIN_PACK = "50 g";
export const MIN_ORDER = { moq: "2", moqUnit: "kg" } as const;

const kg = (price: number) => `₹${price.toLocaleString("en-IN")} / kg`;

type Row = {
  name: string;
  price: number;
  slug?: string;
  /** Short product form shown in the grade column, e.g. "Slices". */
  form?: string;
  image?: string;
  badge?: string;
  /** Major production area in India. */
  area: string;
  /** Fixed id, for rows moved between groups. */
  id?: string;
};

type Group = {
  category: ProductCategory;
  idPrefix: string;
  /** First sequence number, to continue after products already in the catalogue. */
  start?: number;
  form: string;
  blurb: (name: string, form: string) => string;
  tags: string[];
  packagingOptions: string[];
  rows: Row[];
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/\(.*?\)/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const PACKS = [
  "50 g minimum pack",
  "Retail and bulk pack sizes",
  "Custom branded packs",
];

const groups: Group[] = [
  {
    category: "sprouted-atta",
    idPrefix: "sa",
    form: "Sprouted flour",
    blurb: (name) =>
      `${name} sprouted atta, milled from sprouted grain for a softer taste and easier digestion. Supplied by weight in food-grade packs.`,
    tags: ["sprouted atta", "sprouted flour", "wholegrain"],
    packagingOptions: PACKS,
    rows: [
      { name: "Sprouted Jowar Atta", price: 420, area: "Solapur & Ahmednagar, Maharashtra" },
      { name: "Sprouted Ragi Atta", price: 460, area: "Karnataka & Nashik, Maharashtra" },
      { name: "Sprouted Rajgira Atta", price: 540, area: "Gujarat & Rajasthan" },
      { name: "Sprouted Bajra Atta", price: 380, area: "Rajasthan & Maharashtra" },
      { name: "Sprouted Wheat Atta", price: 220, area: "Madhya Pradesh & Punjab" },
      { name: "Sprouted Chickpea Atta", price: 510, area: "Madhya Pradesh & Maharashtra" },
      { name: "Sprouted Moong Atta", price: 510, area: "Rajasthan & Maharashtra" },
      { name: "Sprouted Masoor Atta", price: 440, area: "Madhya Pradesh & Uttar Pradesh" },
      { name: "Sprouted Matki Atta", price: 510, area: "Rajasthan & Maharashtra" },
    ],
  },
  {
    category: "dehydrated-fruits",
    idPrefix: "dfr",
    form: "Dehydrated",
    blurb: (name, form) =>
      `${name} (${form.toLowerCase()}), dehydrated to keep colour and flavour. Used for snacking, breakfast mixes, tea blends and bakery.`,
    tags: ["dehydrated fruit", "dried fruit"],
    packagingOptions: PACKS,
    rows: [
      { name: "Orange Slices", price: 1380, form: "Slices", area: "Nagpur, Maharashtra" },
      { name: "Apple Slices", price: 2250, form: "Slices", area: "Himachal Pradesh & Kashmir" },
      { name: "Pineapple Slices", price: 2400, form: "Slices", area: "Kerala & North East India" },
      { name: "Alphonso Mango Slices", price: 2800, form: "Slices", area: "Ratnagiri & Devgad, Maharashtra" },
      { name: "Strawberry Slices", price: 3600, form: "Slices", area: "Mahabaleshwar, Maharashtra" },
      { name: "Golden Kiwi Slices", price: 2250, form: "Slices", area: "Imported fruit, processed in India" },
      { name: "Chikoo Slices", price: 1100, form: "Slices", area: "Dahanu & Gholvad, Maharashtra" },
      { name: "Red Dragon Slices", price: 1800, form: "Slices", area: "Maharashtra & Gujarat" },
      { name: "Blueberry Whole", price: 3200, form: "Whole", area: "Imported fruit, processed in India" },
      { name: "Black Jamun", price: 3800, form: "Whole", area: "Maharashtra & Gujarat" },
    ],
  },
  {
    category: "fruit-powders",
    idPrefix: "fp",
    form: "Fine powder",
    blurb: (name) =>
      `${name}, spray or shade dried and finely milled. Suited to beverages, supplements, baby food, bakery and flavouring.`,
    tags: ["fruit powder", "natural powder"],
    packagingOptions: PACKS,
    rows: [
      { name: "Raw Mango Powder (Amchur)", price: 800, slug: "raw-mango-powder-amchur", area: "Uttar Pradesh & Madhya Pradesh" },
      { name: "Blueberry Powder", price: 3200, area: "Imported fruit, processed in India" },
      { name: "Acai Berry Powder", price: 15000, area: "Imported fruit, processed in India" },
      { name: "Strawberry Powder", price: 3600, area: "Mahabaleshwar, Maharashtra" },
      { name: "Chikoo Powder", price: 1100, area: "Dahanu & Gholvad, Maharashtra" },
      { name: "Alphonso Mango Powder", price: 2800, area: "Ratnagiri & Devgad, Maharashtra" },
      { name: "Raw Banana Powder", price: 500, image: "/products/banana-powder.webp", area: "Jalgaon, Maharashtra" },
      { name: "Ripe Banana Powder", price: 650, image: "/products/banana-powder.webp", area: "Jalgaon, Maharashtra" },
      { name: "Orange Peel Powder", price: 150, area: "Nagpur, Maharashtra" },
      { name: "Black Jamun Powder", price: 3800, area: "Maharashtra & Gujarat" },
      { name: "Pink Guava Powder", price: 1400, area: "Uttar Pradesh & Maharashtra" },
      { name: "Red Dragon Powder", price: 1800, area: "Maharashtra & Gujarat" },
    ],
  },
  {
    category: "powder-spices",
    idPrefix: "ps",
    start: 12,
    form: "Fine powder",
    blurb: (name) =>
      `${name}, dehydrated and finely milled. Suited to seasoning blends, soups, sauces and ready meals.`,
    tags: ["vegetable powder", "dehydrated powder"],
    packagingOptions: PACKS,
    rows: [
      { name: "Tomato Powder", price: 1200, area: "Nashik & Narayangaon, Maharashtra" },
      { name: "Green Chilli Powder", price: 1800, area: "Maharashtra & Andhra Pradesh" },
    ],
  },
  {
    category: "dehydrated-vegetables",
    idPrefix: "dv",
    form: "Dehydrated",
    blurb: (name, form) =>
      `${name} (${form.toLowerCase()}), dehydrated for long shelf life and quick rehydration. Used in snacks, instant meals, pickles and teas.`,
    tags: ["dehydrated vegetable", "dried vegetable"],
    packagingOptions: PACKS,
    rows: [
      { name: "Karela Slices", price: 1400, form: "Slices", area: "Maharashtra & Gujarat" },
      { name: "Bhindi Cuts", price: 1200, form: "Cuts", area: "Gujarat & Maharashtra" },
      { name: "Amla Shreds", price: 900, form: "Shreds", area: "Pratapgarh, Uttar Pradesh" },
      { name: "Lemon Slices", price: 1400, form: "Slices", area: "Ahmednagar & Akola, Maharashtra" },
      { name: "Tomato Slices", price: 1200, form: "Slices", area: "Nashik & Narayangaon, Maharashtra" },
      { name: "Cherry Tomato Cuts", price: 1800, form: "Cuts", area: "Pune & Nashik, Maharashtra" },
      // Kept as ps-11 so the existing CMS document is reused after the move.
      { name: "Beetroot Powder", price: 1400, form: "Fine powder", id: "ps-11", area: "Pune & Nashik, Maharashtra" },
    ],
  },
  {
    category: "makhana",
    idPrefix: "mk",
    start: 3,
    form: "Ready to eat",
    blurb: (name) =>
      `${name}, a ready-to-eat snack line for retail, gifting and private label packs.`,
    tags: ["snack", "ready to eat"],
    packagingOptions: PACKS,
    rows: [
      { name: "Roasted Edamame", price: 1000, badge: "Snack", area: "Processed in Maharashtra" },
      { name: "Crispy Red Dragon Chips", price: 2100, badge: "Snack", area: "Maharashtra & Gujarat" },
      { name: "Crispy Pineapple Chips", price: 3000, badge: "Snack", area: "Kerala & North East India" },
    ],
  },
];

export const priceListProducts: Product[] = groups.flatMap((group) =>
  group.rows.map((row, index) => {
    const form = row.form ?? group.form;
    return {
      id: row.id ?? `${group.idPrefix}-${String(index + (group.start ?? 1)).padStart(2, "0")}`,
      slug: row.slug ?? slugify(row.name),
      name: row.name,
      category: group.category,
      origin: row.area,
      productionArea: row.area,
      grade: "Export grade",
      shortDescription: group.blurb(row.name, form),
      description: group.blurb(row.name, form),
      packagingOptions: group.packagingOptions,
      moq: MIN_ORDER.moq,
      moqUnit: MIN_ORDER.moqUnit,
      certifications: ["FSSAI"],
      tags: [row.name.toLowerCase(), ...group.tags],
      exportMarkets: exportMarketNames,
      featured: false,
      image: row.image ?? `/assets/categories/${group.category}.png`,
      badge: row.badge,
      pricePerUnit: kg(row.price),
      valueAddition: "Private label and custom pack sizes",
    } as Product;
  }),
);

/** Prices for products that already existed in the catalogue. Keyed by slug. */
export const existingPrices: Record<string, string> = {
  "onion-powder": kg(950),
  "garlic-powder": kg(1800),
  "ginger-powder": kg(1000),
};
