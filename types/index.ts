export type ProductCategory =
  "whole-spices" | "powder-spices" | "vegetables" | "dry-fruits" | "makhana";

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  origin: string;
  grade: string;
  shortDescription: string;
  description: string;
  /** Longer, paragraph-broken copy for the product detail "About this product" block. Falls back to `description` when absent. */
  aboutParagraphs?: string[];
  packagingOptions: string[];
  moq: string;
  moqUnit: string;
  /** Alternative or negotiated MOQ options (display only) */
  moqOptions?: string[];
  certifications: string[];
  tags: string[];
  exportMarkets: string[];
  featured: boolean;
  image: string;
  /** Second photograph, shown on card hover and in the detail gallery. */
  imageSecondary?: string;
  badge?: string;
  /** Major production area, shown in the origin table. */
  productionArea?: string;
  /** Export potential, 1-5 stars. */
  exportPotential?: number;
  /** Value addition options offered on this line. */
  valueAddition?: string;
}

export interface QuoteItem {
  product: Product;
  quantity: number;
  packaging: string;
  notes?: string;
}

export interface QuoteRequestItem {
  product: {
    name: string;
    grade: string;
    moqUnit: string;
  };
  quantity: string | number;
  packaging: string;
  notes?: string;
}

export interface BuyerForm {
  name: string;
  company: string;
  country: string;
  email: string;
  whatsapp: string;
  notes?: string;
}
