// Product catalog — local constants, no backend needed

export const CATEGORIES = [
  {
    id: "spices",
    name: "Spices",
    tagline: "Farm-sourced, export-certified",
    description:
      "Single-origin Indian spices — sourced from heritage growing belts, processed to international food-safety standards, and supplied in bulk or private-label packs to buyers across USA, Europe and Africa.",
    image: "/images/categories/spices.jpg",
    productCount: 6,
  },
  {
    id: "makhana",
    name: "Makhana",
    tagline: "India's superfood for global shelves",
    description:
      "Fox nuts from Bihar — the world's largest producing region. Available as raw, roasted or flavoured with full private-label capability. Growing fast in health-food retail worldwide.",
    image: "/images/categories/makhana.jpg",
    productCount: 4,
  },
  {
    id: "dry-fruits",
    name: "Dry Fruits",
    tagline: "Bulk supply, premium grades",
    description:
      "Cashews, almonds, raisins, walnuts and pistachios sourced from India's premium growing districts. Ready for retail, food-service, or ingredient use.",
    image: "/images/categories/dry-fruits.jpg",
    productCount: 5,
  },
];

export const PRODUCTS = [
  /* ────────────── SPICES ────────────── */
  {
    id: "turmeric-finger-premium",
    slug: "turmeric-finger-premium",
    name: "Turmeric Finger",
    grade: "Premium Export Grade",
    category: "spices",
    origin: "Erode, Tamil Nadu",
    image: "/images/products/turmeric-finger.jpg",
    images: ["/images/products/turmeric-finger.jpg"],
    tags: ["Organic", "Private Label", "Export Ready"],
    moq: "5 MT",
    packaging: ["25 kg PP bags", "50 kg jute bags", "Custom OEM"],
    certifications: ["FSSAI", "APEDA", "USDA Organic"],
    description:
      "Erode-origin turmeric — the global benchmark for curcumin content and colour. Supplied as whole finger, polished or unpolished, in bulk or branded private-label packs ready for your retail shelf.",
    specifications: {
      moisture: "< 10%",
      curcumin: "> 3.5%",
      colour: "ASTA 25+",
      shelf_life: "24 months",
      hs_code: "0910.30",
    },
    featured: true,
    available: true,
  },
  {
    id: "cumin-seeds-bold",
    slug: "cumin-seeds-bold",
    name: "Cumin Seeds",
    grade: "Bold Export Grade",
    category: "spices",
    origin: "Unjha, Gujarat",
    image: "/images/products/cumin-seeds.jpg",
    images: ["/images/products/cumin-seeds.jpg"],
    tags: ["Private Label", "Export Ready", "Bulk"],
    moq: "5 MT",
    packaging: ["25 kg PP bags", "1 kg retail packs (OEM)", "Custom"],
    certifications: ["FSSAI", "APEDA", "EU Organic"],
    description:
      "Bold single-origin cumin from Unjha — India's largest cumin trading hub. High volatile oil, clean bold seed, consistently low moisture. Favoured by European spice packers and US distributors.",
    specifications: {
      moisture: "< 9%",
      volatile_oil: "> 2.5 ml/100g",
      purity: "> 99.5%",
      shelf_life: "24 months",
      hs_code: "0909.21",
    },
    featured: true,
    available: true,
  },
  {
    id: "black-pepper-malabar",
    slug: "black-pepper-malabar",
    name: "Black Pepper",
    grade: "Malabar Garbled",
    category: "spices",
    origin: "Wayanad, Kerala",
    image: "/images/products/black-pepper.jpg",
    images: ["/images/products/black-pepper.jpg"],
    tags: ["Organic", "Export Ready", "Premium"],
    moq: "2 MT",
    packaging: ["50 kg jute bags", "25 kg poly bags", "Retail OEM"],
    certifications: ["FSSAI", "APEDA", "Spices Board India"],
    description:
      "Kerala Malabar black pepper — bold aroma, high piperine, garbled clean grade. Exported to premium spice distributors, food manufacturers and gourmet retail chains worldwide.",
    specifications: {
      moisture: "< 12%",
      piperine: "> 5%",
      bulk_density: "550–600 g/L",
      shelf_life: "18 months",
      hs_code: "0904.11",
    },
    featured: true,
    available: true,
  },
  {
    id: "coriander-seeds-eagle",
    slug: "coriander-seeds-eagle",
    name: "Coriander Seeds",
    grade: "Eagle Grade",
    category: "spices",
    origin: "Rajkot, Gujarat",
    image: "/images/products/coriander-seeds.jpg",
    images: ["/images/products/coriander-seeds.jpg"],
    tags: ["Bulk", "Export Ready", "Private Label"],
    moq: "5 MT",
    packaging: ["25 kg PP bags", "50 kg jute bags"],
    certifications: ["FSSAI", "APEDA"],
    description:
      "Eagle grade coriander — bold round seed, clean and sorted. Consistent volatile oil content for food manufacturers. Used widely in spice blends, seasonings and pickles.",
    specifications: {
      moisture: "< 10%",
      volatile_oil: "> 0.3 ml/100g",
      purity: "> 99%",
      shelf_life: "24 months",
      hs_code: "0909.21",
    },
    featured: false,
    available: true,
  },
  {
    id: "red-chilli-s4",
    slug: "red-chilli-s4",
    name: "Red Chilli",
    grade: "S4 / Teja",
    category: "spices",
    origin: "Guntur, Andhra Pradesh",
    image: "/images/products/red-chilli.jpg",
    images: ["/images/products/red-chilli.jpg"],
    tags: ["Organic", "Bulk", "Export Ready"],
    moq: "5 MT",
    packaging: ["25 kg PP bags", "50 kg jute bags", "Retail OEM"],
    certifications: ["FSSAI", "APEDA", "EU MRL Compliant"],
    description:
      "Guntur Teja and S4 red chilli — highest ASTA colour value in the world. Supplied as whole dried, crushed or powder to sauce manufacturers, food brands and retail chains.",
    specifications: {
      moisture: "< 11%",
      asta_colour: "> 80",
      capsaicin: "High",
      shelf_life: "18 months",
      hs_code: "0904.22",
    },
    featured: false,
    available: true,
  },
  {
    id: "cardamom-green-8mm",
    slug: "cardamom-green-8mm",
    name: "Green Cardamom",
    grade: "8mm Bold",
    category: "spices",
    origin: "Idukki, Kerala",
    image: "/images/products/green-cardamom.jpg",
    images: ["/images/products/green-cardamom.jpg"],
    tags: ["Premium", "Export Ready", "Private Label"],
    moq: "500 kg",
    packaging: ["10 kg vacuum bags", "25 kg cartons", "Retail OEM"],
    certifications: ["FSSAI", "APEDA", "Spices Board"],
    description:
      "Idukki highland cardamom — the world's finest origin. Bold green colour, high volatile oil, aromatic. Favoured by Middle East, European and US premium spice importers.",
    specifications: {
      moisture: "< 12%",
      volatile_oil: "> 6%",
      bold_size: "8mm+",
      shelf_life: "18 months",
      hs_code: "0908.31",
    },
    featured: false,
    available: true,
  },

  /* ────────────── MAKHANA ────────────── */
  {
    id: "makhana-grade-a-large",
    slug: "makhana-grade-a-large",
    name: "Fox Nuts — Grade A",
    grade: "Large (6–7 Sutta)",
    category: "makhana",
    origin: "Darbhanga, Bihar",
    image: "/images/products/makhana-grade-a.jpg",
    images: ["/images/products/makhana-grade-a.jpg"],
    tags: ["Superfood", "Private Label", "Export Ready"],
    moq: "1 MT",
    packaging: ["20 kg cartoon boxes", "Retail 100g–500g OEM", "Bulk bags"],
    certifications: ["FSSAI", "APEDA", "GI Tag Bihar"],
    description:
      "Premium Grade A fox nuts from Bihar — the largest, crispest, most uniform seeds. Increasingly demanded in US health-food retail, European organic stores and African premium grocery.",
    specifications: {
      moisture: "< 8%",
      size: "6–7 Sutta (large)",
      purity: "> 98%",
      shelf_life: "12 months",
      hs_code: "2008.19",
    },
    featured: true,
    available: true,
  },
  {
    id: "makhana-grade-b",
    slug: "makhana-grade-b",
    name: "Fox Nuts — Grade B",
    grade: "Medium (4–5 Sutta)",
    category: "makhana",
    origin: "Madhubani, Bihar",
    image: "/images/products/makhana-grade-b.jpg",
    images: ["/images/products/makhana-grade-b.jpg"],
    tags: ["Bulk", "Export Ready"],
    moq: "2 MT",
    packaging: ["20 kg cartoon boxes", "Bulk bags"],
    certifications: ["FSSAI", "APEDA"],
    description:
      "Grade B makhana — ideal for roasting, flavouring and ingredient use. High volume for snack manufacturers, seasoning companies and food processors.",
    specifications: {
      moisture: "< 9%",
      size: "4–5 Sutta (medium)",
      purity: "> 96%",
      shelf_life: "12 months",
      hs_code: "2008.19",
    },
    featured: false,
    available: true,
  },
  {
    id: "makhana-roasted-salted",
    slug: "makhana-roasted-salted",
    name: "Roasted Makhana",
    grade: "Roasted & Salted, Grade A",
    category: "makhana",
    origin: "Darbhanga, Bihar",
    image: "/images/products/makhana-roasted.jpg",
    images: ["/images/products/makhana-roasted.jpg"],
    tags: ["Ready-to-Retail", "Private Label", "Superfood"],
    moq: "500 kg",
    packaging: ["Retail 80g–250g OEM", "Bulk 10 kg bags"],
    certifications: ["FSSAI", "APEDA"],
    description:
      "Roasted and lightly salted makhana — shelf-ready snack format for retail buyers. Full private-label capability: your brand, your packaging, our product.",
    specifications: {
      moisture: "< 5%",
      sodium: "Low sodium option available",
      shelf_life: "9 months",
      hs_code: "2008.19",
    },
    featured: true,
    available: true,
  },
  {
    id: "makhana-flavoured",
    slug: "makhana-flavoured",
    name: "Flavoured Makhana",
    grade: "Grade A, Assorted Flavours",
    category: "makhana",
    origin: "Bihar",
    image: "/images/products/makhana-flavoured.jpg",
    images: ["/images/products/makhana-flavoured.jpg"],
    tags: ["Ready-to-Retail", "Private Label"],
    moq: "500 kg per flavour",
    packaging: ["Retail 80g–250g OEM"],
    certifications: ["FSSAI", "APEDA"],
    description:
      "Flavoured makhana in premium coatings: black pepper, cheese, pudina, tangy tomato, herbs & spices. Ready for retail shelves. Full OEM/private-label available.",
    specifications: {
      flavours: ["Black Pepper", "Cheese", "Pudina", "Tangy Tomato", "Herbs & Spices"],
      moisture: "< 5%",
      shelf_life: "9 months",
      hs_code: "2008.19",
    },
    featured: false,
    available: true,
  },

  /* ────────────── DRY FRUITS ────────────── */
  {
    id: "cashew-w320",
    slug: "cashew-w320",
    name: "Cashew Nuts",
    grade: "W320",
    category: "dry-fruits",
    origin: "Goa / Kerala / Odisha",
    image: "/images/products/cashew-w320.jpg",
    images: ["/images/products/cashew-w320.jpg"],
    tags: ["Premium", "Export Ready", "Private Label"],
    moq: "2 MT",
    packaging: ["10 kg vacuum tins", "25 kg cartons", "Retail OEM"],
    certifications: ["FSSAI", "APEDA", "HACCP"],
    description:
      "W320 cashew — the most traded grade globally. Whole white kernels, machine sorted, vacuum packed. Supplied to supermarket chains, nut processors and private-label brands across USA, Europe and Africa.",
    specifications: {
      grade: "W320 (320 pieces/lb)",
      moisture: "< 5%",
      defects: "< 1%",
      shelf_life: "12 months",
      hs_code: "0801.31",
    },
    featured: true,
    available: true,
  },
  {
    id: "almonds-california-style",
    slug: "almonds-california-style",
    name: "Almonds",
    grade: "Premium Bold",
    category: "dry-fruits",
    origin: "Mamra / Import-grade India Processing",
    image: "/images/products/almonds.jpg",
    images: ["/images/products/almonds.jpg"],
    tags: ["Bulk", "Export Ready", "Private Label"],
    moq: "2 MT",
    packaging: ["25 kg cartons", "Retail 500g–1kg OEM"],
    certifications: ["FSSAI", "APEDA"],
    description:
      "Bold premium almonds — sorted, graded, and ready for repackaging or retail. Supplied to health-food brands, nut retailers and supermarket chains.",
    specifications: {
      moisture: "< 6%",
      purity: "> 99%",
      shelf_life: "18 months",
      hs_code: "0802.12",
    },
    featured: true,
    available: true,
  },
  {
    id: "raisins-golden",
    slug: "raisins-golden",
    name: "Golden Raisins",
    grade: "Export Grade Long",
    category: "dry-fruits",
    origin: "Nashik, Maharashtra",
    image: "/images/products/raisins.jpg",
    images: ["/images/products/raisins.jpg"],
    tags: ["Organic", "Bulk", "Export Ready"],
    moq: "3 MT",
    packaging: ["12.5 kg cartons", "Retail OEM"],
    certifications: ["FSSAI", "APEDA", "EU Organic"],
    description:
      "Nashik golden raisins — long, plump, naturally sweet. Organic certified available. Used widely in baking, cereal, trail mix and retail packs across Europe and the USA.",
    specifications: {
      moisture: "15–18%",
      brix: "> 65°",
      purity: "> 98%",
      shelf_life: "18 months",
      hs_code: "0806.20",
    },
    featured: false,
    available: true,
  },
  {
    id: "walnuts-light-halves",
    slug: "walnuts-light-halves",
    name: "Walnuts",
    grade: "Light Halves & Pieces",
    category: "dry-fruits",
    origin: "Jammu & Kashmir",
    image: "/images/products/walnuts.jpg",
    images: ["/images/products/walnuts.jpg"],
    tags: ["Premium", "Export Ready"],
    moq: "1 MT",
    packaging: ["25 kg poly bags", "Vacuum packs retail OEM"],
    certifications: ["FSSAI", "APEDA"],
    description:
      "Kashmir walnut halves — light amber, bold flavour, low astringency. The global benchmark for walnut quality. Exported to premium nut traders, food manufacturers and retailer own-label programs.",
    specifications: {
      moisture: "< 8%",
      colour: "Light to Extra Light",
      purity: "> 99%",
      shelf_life: "12 months",
      hs_code: "0802.31",
    },
    featured: false,
    available: true,
  },
  {
    id: "pistachios-fandoghi",
    slug: "pistachios-fandoghi",
    name: "Pistachios",
    grade: "Roasted Salted, Export Grade",
    category: "dry-fruits",
    origin: "India Processing",
    image: "/images/products/pistachios.jpg",
    images: ["/images/products/pistachios.jpg"],
    tags: ["Private Label", "Export Ready"],
    moq: "1 MT",
    packaging: ["Retail 250g–500g OEM", "25 kg bulk bags"],
    certifications: ["FSSAI", "APEDA"],
    description:
      "Roasted and salted pistachios in retail-ready format. Full private-label capability for your snack brand. Supplied to supermarket chains and nut retailers.",
    specifications: {
      moisture: "< 5%",
      split: "> 90%",
      shelf_life: "12 months",
      hs_code: "0802.51",
    },
    featured: false,
    available: true,
  },
];

/* helpers */
export function getProductsByCategory(categoryId) {
  return PRODUCTS.filter((p) => p.category === categoryId);
}

export function getFeaturedProducts() {
  return PRODUCTS.filter((p) => p.featured);
}

export function getProductBySlug(slug) {
  return PRODUCTS.find((p) => p.slug === slug) || null;
}

export function getCategoryById(id) {
  return CATEGORIES.find((c) => c.id === id) || null;
}

export function getRelatedProducts(product, limit = 3) {
  return PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, limit);
}