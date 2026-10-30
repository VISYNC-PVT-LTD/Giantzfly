/**
 * Target export markets and the paperwork each one needs.
 * Source: the market-entry table supplied by the Giantzfly team.
 */
export type ExportMarket = {
  country: string;
  /** Main trade city, used as the map marker. */
  city: string;
  lon: number;
  lat: number;
  whyEasy: string;
  typicalProducts: string;
  documents: string;
};

export const exportMarkets: ExportMarket[] = [
  {
    country: "United Arab Emirates",
    city: "Dubai",
    lon: 55.27,
    lat: 25.2,
    whyEasy: "Fast customs, huge Indian trade network",
    typicalProducts: "Garments, spices, snacks, cosmetics",
    documents: "IEC, invoice, packing list",
  },
  {
    country: "Saudi Arabia",
    city: "Riyadh",
    lon: 46.72,
    lat: 24.71,
    whyEasy: "High Indian product demand",
    typicalProducts: "Food, garments, home products",
    documents: "Basic export docs + some product approvals",
  },
  {
    country: "Oman",
    city: "Muscat",
    lon: 58.4,
    lat: 23.59,
    whyEasy: "Easy GCC entry market",
    typicalProducts: "Building materials, food, textiles",
    documents: "Simple customs paperwork",
  },
  {
    country: "Singapore",
    city: "Singapore",
    lon: 103.82,
    lat: 1.35,
    whyEasy: "Very business-friendly",
    typicalProducts: "Electronics, spices, beauty products",
    documents: "IEC, invoice, airway bill",
  },
  {
    country: "Sri Lanka",
    city: "Colombo",
    lon: 79.86,
    lat: 6.93,
    whyEasy: "Small shipments easy via sea",
    typicalProducts: "Food products, medicines, apparel",
    documents: "IEC + standard export docs",
  },
  {
    country: "Nepal",
    city: "Kathmandu",
    lon: 85.32,
    lat: 27.72,
    whyEasy: "Land transport, simple trade routes",
    typicalProducts: "FMCG, textiles, food items",
    documents: "IEC, invoice, transport bill",
  },
  {
    country: "Bangladesh",
    city: "Dhaka",
    lon: 90.41,
    lat: 23.81,
    whyEasy: "Nearby and low shipping cost",
    typicalProducts: "Fabrics, chemicals, machinery",
    documents: "IEC, invoice, packing list",
  },
];

export const exportMarketNames = exportMarkets.map((market) => market.country);
