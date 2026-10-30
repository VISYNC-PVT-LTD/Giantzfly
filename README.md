# Giantzfly Exim LLP: B2B Export Catalog

> **Connecting Markets. Delivering Growth.**

Export catalog and quote-request website for Giantzfly Exim LLP, an India-based export, import, sourcing and supply company. Built for international buyers: importers, distributors, supermarket buyers and sourcing teams.

This is not a retail store. There are no payments and no buyer accounts. Buyers browse the catalog, build a quote cart and send a trade enquiry by email or WhatsApp.

---

## Features

- **Product catalog:** 85 products across nine categories, each with grade, origin, MOQ, packaging, certifications and per-kg pricing where available
- **Quote cart:** buyers add products, set quantities (minimum order enforced) and submit one enquiry
- **Enquiry and newsletter forms:** validated server-side and delivered through Brevo email
- **Certificates:** multi-page gallery of IEC, FSSAI, GST, ICEGATE, Udyam and RCMC (redacted public copies)
- **Export markets map:** interactive map of target markets with entry notes
- **CMS:** products, certificates, reviews and contact details are managed in Sanity Studio
- **Offline fallback:** if Sanity is not configured, the site serves the local catalog, certificates and contact defaults

### Product categories

| Category | Examples |
|---|---|
| Whole Spices | Turmeric fingers, black pepper, cardamom, cumin, cloves |
| Powder Spices | Turmeric, red chilli, coriander, moringa, banana powder |
| Fresh Vegetables | Onion, garlic, ginger, fresh coconut |
| Dry Fruits | Cashew, raisins, copra, figs |
| Makhana & Others | Plain and flavoured makhana |
| Sprouted Atta | Jowar, ragi, bajra, wheat |
| Dehydrated Fruits | Mango, pineapple, strawberry, blueberry |
| Fruit Powders | Amchur, acai, blueberry, banana |
| Dehydrated Vegetables | Karela, bhindi, amla, tomato |

**Export markets:** United Arab Emirates, Saudi Arabia, Oman, Singapore, Sri Lanka, Nepal, Bangladesh

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router), React 19, TypeScript |
| Styling | CSS Modules, Tailwind CSS, Radix UI |
| Animation | Framer Motion, GSAP, Lenis |
| Maps | d3-geo, topojson-client |
| CMS | Sanity 6 with embedded Studio (`next-sanity`) |
| Email | Brevo transactional API |
| Deployment | Vercel |

---

## Getting Started

```bash
npm install
npm run dev
```

| URL | Purpose |
|---|---|
| [localhost:3000](http://localhost:3000) | Website |
| [localhost:3000/studio](http://localhost:3000/studio) | Sanity Studio (requires a Sanity login) |
| [localhost:3000/admin](http://localhost:3000/admin) | Content guide with links to each Studio section |

### Environment variables

Create `.env.local` in the project root:

```env
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
NEXT_PUBLIC_SANITY_API_VERSION=   # optional, YYYY-MM-DD
SANITY_API_TOKEN=                 # write token, used only by scripts

# Email (Brevo)
BREVO_API_KEY=
BREVO_SENDER_EMAIL=
```

Without the Sanity variables the site runs on local data. Without the Brevo variables the enquiry and newsletter endpoints return `503`.

---

## Content Management

Content is edited in Sanity Studio at `/studio`. Published changes appear on the site within about 60 seconds.

| Section | What it controls |
|---|---|
| Products | Catalog entries, pricing, MOQ, photos |
| Contact & site settings | Public email, phone / WhatsApp, business location |
| Certificates | Certificate images and pages, website visibility |
| Reviews | Buyer testimonials |

Only upload **redacted** certificate copies. Never upload PAN, TAN, bank or other identity documents.

### Syncing local data to Sanity

The local catalog in `data/` can be pushed to Sanity:

```bash
npm run sanity:sync              # dry run, shows what would change
npm run sanity:sync -- --write   # uploads products, certificates and contact settings
```

The sync can be re-run safely. It overwrites matching products and certificates and never deletes documents.

---

## Project Structure

```
app/
  page.tsx                  Home page
  products/                 Catalog, category and product pages
  quote-cart/               Quote cart and enquiry submission
  contact/  about/  services/  packaging/
  admin/                    Content guide
  studio/[[...tool]]/       Embedded Sanity Studio
  api/enquiry/              Enquiry email endpoint
  api/newsletter/           Newsletter signup endpoint

components/
  layout/                   Navbar, footer
  sections/                 Home page sections, forms, certificates, map
  product/                  Product card, quote links

context/                    Quote cart and contact settings providers
data/                       Local catalog, price list, export markets, certificates
lib/                        Catalog, settings, certificate and mail helpers
sanity/                     Schemas, Studio structure, client and queries
scripts/                    Sanity sync and review upload scripts
emails/                     Email templates
public/                     Images, category art, certificate web copies, map data
```

---

## Scripts

```bash
npm run dev              # development server
npm run build            # production build
npm run start            # production server
npm run lint             # ESLint
npm run sanity:sync      # push local content to Sanity (add -- --write to apply)
npm run reviews:upload   # upload data/reviews.txt to Sanity
```

---

## Business Rules

- **Enquiry only.** No payments. Email and WhatsApp are the conversion channels.
- **International B2B focus.** Copy and UX target overseas trade buyers.
- **Quote cart, not a shopping cart.** Buyers add products, enter trade details and submit.
- **Every product shows** MOQ, packaging options, certifications and origin.
- **Positioning:** premium, export-grade and internationally compliant.

---

## Brand Fonts

The brand typography specifies **Lateral Condensed Bold**, **Lateral Standard Regular/Bold** and **Lateral Expanded Bold**. CSS tokens are ready for these licensed webfonts and use a system fallback until the files are added. Do not commit licensed font files without permission.
