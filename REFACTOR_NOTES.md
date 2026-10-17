# GiantzFly full-project refactor — v2

## Scope completed

- Homepage hero markup, copy, classes and `/assets/hero.png` reference are preserved exactly. The original hero binary was excluded by the supplied Repomix file, so this patch intentionally does **not** replace it.
- Header now exposes direct links to Packaging, Spices, Makhana and Dry Fruits.
- New `/packaging` page translates the supplied company profile into a complete packaging consultancy, material export, private-label, export management and industry story.
- Homepage material explorer swaps custom artwork and relative copy for all five material families on hover, focus and tap.
- The process section is real GSAP + ScrollTrigger vertical scrollytelling. It is not a horizontal carousel.
- Homepage packaging cards use custom contextual illustrations and an editorial grid—not repeated generic card backgrounds.
- Products are compact: five columns on wide screens and two columns on mobile.
- About, Contact, Products, category, product detail, Quote Cart, navigation and footer were visually refactored.
- Added custom local SVG assets for packaging structures, material systems, sourcing, shipping, quote briefs and empty states.
- Added reduced-motion behavior and keyboard-accessible material selection.
- Added local product-data fallbacks if Sanity is unavailable.

## Run

```bash
npm install
npm run dev
```

GSAP `3.13.x` is declared in `package.json` and imported directly in `components/sections/PackagingExperience.tsx`.

## Merge note

Copy the refactored files into the original project while retaining the original binary asset at:

```text
public/assets/hero.png
```

That is the untouched hero image referenced by the original hero CSS.

## QA

The redesigned system was visually reviewed at 1440×900 and 390×844. The previews reported no horizontal overflow, clipped elements, failed resources, console exceptions or overlap intersections. Framework lint/build should be run after dependency installation in the deployment environment.
