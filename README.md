# GiantzFly Exim LLP — B2B Export Catalog Website

> **"From Indian Origins to Global Markets."**  
> Farm-direct. Lab-certified. Export-ready for your shelf.

---

## About the Company

**GiantzFly Exim LLP** is an Indian export-focused LLP operating across multiple verticals of agri-commodities, packaged goods, and specialty products for international trade.

### What the company does

| Vertical | Products |
|---|---|
| **Whole Spices** | Cumin, coriander, mustard, cardamom, black pepper, ginger, turmeric |
| **Spice Powders & Masalas** | Turmeric powder, chili powder, coriander powder, garam masala, pav bhaji masala |
| **Dry Fruits** | Cashews, dates, raisins, mixed dry fruits, coconuts |
| **Makhana (Fox Nuts)** | Export-grade, lab-certified |
| **Herbal & Ayurvedic** | Juices, aloe vera gel, extracts, powders (shikakai, amla, reetha) |
| **Cosmetics & Skincare** | Gels, creams, face wash, sunscreens, serums, body wash |
| **Hair & Body Care** | Amla oil, jasmine oil, shampoos, conditioners |
| **Soaps & Cleaners** | Handmade soaps, charcoal soaps, detergent powder, hand wash |
| **Packaging Solutions** | Design, sourcing, cost optimization, supply chain for packaging materials |

GiantzFly operates as manufacturer, processor, importer, exporter, trader, distributor, and consultant across all of the above.

**Export markets:** USA · UK · Germany · France · South Africa · Nigeria · UAE

---

## About This Website

This is **not** a retail or COD e-commerce platform. It is a **B2B export catalog and quote-cart system** built for international buyers — importers, distributors, supermarket buyers, and sourcing teams.

### What the site does

- Showcases GiantzFly's full product catalog organized by category
- Lets buyers add products to a **Quote Cart** and submit trade enquiries directly via **WhatsApp and email**
- No login, no payment gateway, no backend order management — pure B2B lead generation
- Builds trust through export certifications, MOQ details, packaging specs, and product grades

### Target audience

| Buyer type | Key info shown |
|---|---|
| Importers / sourcing teams | MOQ, certifications, port of loading, lead time |
| Distributors | Private label options, bulk packaging, consistency |
| Supermarket buyers | Retail-ready grades, custom packaging |
| D2C / private label brands | Brand-neutral supply, flexible MOQ |
| International retailers | Export documentation, compliance |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) · React 19 · TypeScript |
| Styling | Tailwind CSS v4 · CSS Modules · shadcn/ui · Radix UI |
| Animation | Framer Motion · Lenis (smooth scroll) |
| CMS | Sanity v5 (product catalog, content) |
| Backend / DB | Firebase (Firestore + Admin SDK) |
| Email | Custom email templates (see `/emails`) |
| Icons | HugeIcons · Lucide React |
| Deployment | Vercel (recommended) |

---

## Project Structure

```
app/
  page.tsx              # Homepage
  layout.tsx            # Root layout
  products/
    page.tsx            # All products catalog
    [category]/         # Category pages
      [slug]/           # Individual product pages
  quote-cart/           # Quote cart + enquiry submission
  about/                # Company about page
  contact/              # Contact page
  admin/                # Admin panel
  api/
    admin/              # Admin API routes
    newsletter/         # Newsletter subscription
  studio/               # Sanity Studio (embedded)

components/
  layout/               # Header, footer, nav
  sections/             # Homepage sections (hero, features, etc.)
  product/              # Product card, carousel, filters
  ui/                   # Shared UI primitives

sanity/                 # Sanity schema definitions
lib/
  catalog.ts            # Product catalog utilities
  firebase.ts           # Firebase client
  whatsapp.ts           # WhatsApp enquiry logic
types/                  # TypeScript types
data/                   # Static data / seed data
scripts/                # Utility scripts
```

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Sanity Studio available at [http://localhost:3000/studio](http://localhost:3000/studio).

### Environment variables required

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
SANITY_API_TOKEN=
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
# ... other Firebase config keys
```

---

## Key Business Rules

- **No payments.** Enquiry-only. WhatsApp + email are the conversion channels.
- **No Indian domestic buyers.** All copy and UX targets international B2B buyers.
- **Quote Cart** replaces a shopping cart — buyers add products, fill trade details, submit.
- Every product page must show: MOQ, packaging options, certifications, origin.
- Brand positioning: premium, export-grade, internationally compliant — not a local spice shop.

---

## Scripts

```bash
npm run dev      # development server
npm run build    # production build
npm run start    # production server
npm run lint     # ESLint
```