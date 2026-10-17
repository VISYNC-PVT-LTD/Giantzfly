export type ServiceDetail = {
  slug: string;
  label: string;
  title: string;
  tagline: string;
  background: string;
  decor: string;
  intro: string[];
  offer: { title: string; copy: string }[];
  deliverables: string[];
};

export const services: ServiceDetail[] = [
  {
    slug: "packaging-consultancy",
    label: "Packaging Consultancy Services",
    title: "Packaging that lowers cost and passes inspection.",
    tagline:
      "Packaging design & development, cost reduction programs, compliance support, testing & validation and vendor development & qualification.",
    background: "/assets/backgrounds/services.jpg",
    decor: "/assets/decor/crate-lines.svg",
    intro: [
      "We help companies improve packaging performance, reduce costs, enhance shelf life, strengthen brand identity and comply with international packaging standards.",
      "Our consultancy practice covers concept development, structure, material selection, testing and vendor qualification, so packaging is engineered rather than added on at the end.",
    ],
    offer: [
      {
        title: "Packaging design & development",
        copy: "Product packaging concept development, packaging structure design, material selection, specification development and optimisation studies.",
      },
      {
        title: "Cost reduction programs",
        copy: "Material consumption analysis, packaging redesign, vendor rationalisation and supply chain optimisation.",
      },
      {
        title: "Packaging compliance support",
        copy: "Food packaging compliance, labelling requirements, export packaging standards and sustainability requirements.",
      },
      {
        title: "Packaging testing & validation",
        copy: "Transportation simulation, packaging performance assessment, shelf-life support studies and packaging audit programs.",
      },
      {
        title: "Vendor development & qualification",
        copy: "Supplier identification, vendor audits, vendor qualification systems and approved-vendor management.",
      },
    ],
    deliverables: [
      "Packaging specification sheet",
      "Material and cost comparison",
      "Prototype and sample review",
      "Transportation simulation report",
      "Approved vendor shortlist",
      "Compliance and labelling checklist",
    ],
  },
  {
    slug: "packaging-material-exports",
    label: "Packaging Material Exports",
    title: "A comprehensive range of packaging materials, sourced from qualified Indian manufacturers.",
    tagline:
      "Flexible, paper, plastic, glass, metal and eco-friendly packaging supplied from India, backed by vendor qualification and export documentation.",
    background: "/assets/backgrounds/about.jpg",
    decor: "/assets/decor/crate-lines.svg",
    intro: [
      "India has deep packaging manufacturing capacity across flexible films, paper, rigid containers and closures. The difficulty for an overseas buyer is not availability, it is qualification: knowing which plant can hold specification at your volume.",
      "We identify, audit and manage that supply base for you, then handle the export process the same way we handle food consignments.",
    ],
    offer: [
      {
        title: "Flexible packaging",
        copy: "Stand-up pouches, spout pouches, vacuum pouches, retort pouches, three-side and four-side seal pouches, zip lock pouches and printed laminated pouches.",
      },
      {
        title: "Paper packaging",
        copy: "Corrugated boxes, printed cartons, kraft paper bags, shopping bags and food-grade paper packaging.",
      },
      {
        title: "Plastic packaging",
        copy: "PET bottles, PET jars, HDPE bottles, PP containers, caps and closures.",
      },
      {
        title: "Glass packaging",
        copy: "Cosmetic bottles, food jars, essential oil bottles and pharmaceutical containers.",
      },
      {
        title: "Metal packaging",
        copy: "Tin containers, spice containers and decorative packaging tins.",
      },
      {
        title: "Eco-friendly packaging",
        copy: "Compostable packaging, biodegradable packaging, recyclable packaging and paper-based alternatives.",
      },
    ],
    deliverables: [
      "Material specification and drawing approval",
      "Audited manufacturer shortlist",
      "Pre-production and bulk samples",
      "Pre-dispatch inspection report",
      "Consolidated container planning",
      "Full export documentation set",
    ],
  },
  {
    slug: "private-label",
    label: "Private Label Product Development",
    title: "Your brand, built from concept to first container.",
    tagline:
      "Product sourcing, formula development, packaging development, label design support, regulatory documentation and production coordination for food, personal care and herbal & Ayurvedic products.",
    background: "/assets/backgrounds/director.jpg",
    decor: "/assets/decor/spice-burst.svg",
    intro: [
      "We assist clients in creating their own brands and launching products in local and international markets, across food products, personal care products and herbal & Ayurvedic products.",
      "We run private-label programmes end to end: sourcing the product, developing the pack, preparing the documentation and coordinating production until the first container ships.",
    ],
    offer: [
      {
        title: "Food products",
        copy: "Dry fruits, spices, spice blends, makhana, snacks and health foods.",
      },
      {
        title: "Personal care products",
        copy: "Face wash, body lotion, shampoo, hair oil, face serum and herbal cosmetics.",
      },
      {
        title: "Herbal & Ayurvedic products",
        copy: "Herbal powders, essential oils, wellness products and Ayurvedic formulations.",
      },
      {
        title: "Private label services",
        copy: "Product sourcing, formula development, packaging development, label design support, regulatory documentation, production coordination and export support.",
      },
    ],
    deliverables: [
      "Product and packaging brief",
      "Costed sourcing options",
      "Approved samples and artwork",
      "Regulatory and label documentation",
      "Production and inspection schedule",
      "First container dispatch plan",
    ],
  },
  {
    slug: "sustainable-packaging",
    label: "Sustainable Packaging",
    title: "Lower material, recyclable formats, same shelf life.",
    tagline:
      "Compostable, biodegradable and recyclable packaging formats, delivered as part of our promotion of environmentally responsible packaging solutions.",
    background: "/assets/backgrounds/mission.jpg",
    decor: "/assets/decor/leaf-grid.svg",
    intro: [
      "Developing sustainable and environmentally responsible packaging solutions is part of our mission, and one of the growth areas we invest in alongside smart packaging technologies.",
      "We treat it as an engineering problem: reduce material where the pack allows, move to compostable, biodegradable or recyclable formats where the product allows, and validate that shelf life holds before the change is approved.",
    ],
    offer: [
      {
        title: "Compostable packaging",
        copy: "Compostable formats suited to food and FMCG categories, validated against your shelf-life requirement.",
      },
      {
        title: "Biodegradable packaging",
        copy: "Biodegradable structures selected to keep barrier performance intact over a full export transit.",
      },
      {
        title: "Recyclable packaging",
        copy: "Recyclable rigid and flexible formats, including mono-material transitions where the product allows.",
      },
      {
        title: "Paper-based alternatives",
        copy: "Paper-based substitutes for film and plastic components, sourced from qualified Indian manufacturers.",
      },
    ],
    deliverables: [
      "Current pack material audit",
      "Reduction and substitution options",
      "Recyclability assessment",
      "Shelf-life validation plan",
      "Cost impact comparison",
      "Phased rollout schedule",
    ],
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}
