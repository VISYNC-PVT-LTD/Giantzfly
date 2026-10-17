import { defineType, defineField } from "sanity";

const product = defineType({
  name: "product",
  title: "Product",
  type: "document",

  groups: [
    { name: "content", title: "Content", default: true },
    { name: "trade", title: "Trade terms" },
    { name: "media", title: "Photography" },
  ],

  fields: [
    defineField({ name: "id", title: "ID", type: "string", group: "content" }),
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      group: "content",
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
      group: "content",
    }),

    defineField({
      name: "category",
      title: "Category",
      type: "string",
      group: "content",
      options: {
        list: [
          { title: "Whole Spices", value: "whole-spices" },
          {
            title: "Powder Form Spices and Nutritions",
            value: "powder-spices",
          },
          { title: "Fresh Vegetables", value: "vegetables" },
          { title: "Dry Fruits", value: "dry-fruits" },
          { title: "Makhana & Others", value: "makhana" },
        ],
      },
    }),

    defineField({
      name: "origin",
      title: "Origin",
      type: "string",
      group: "content",
    }),
    defineField({
      name: "productionArea",
      title: "Major Production Area",
      type: "string",
      group: "content",
    }),
    defineField({
      name: "grade",
      title: "Grade",
      type: "string",
      group: "content",
    }),

    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "text",
      group: "content",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      group: "content",
    }),

    defineField({
      name: "packagingOptions",
      title: "Packaging Options",
      type: "array",
      of: [{ type: "string" }],
      group: "trade",
    }),

    defineField({ name: "moq", title: "MOQ", type: "string", group: "trade" }),
    defineField({
      name: "moqUnit",
      title: "MOQ Unit",
      type: "string",
      group: "trade",
    }),
    defineField({
      name: "quantityAvailable",
      title: "Quantity Available",
      type: "string",
      group: "trade",
    }),
    defineField({
      name: "pricePerUnit",
      title: "Price Per Unit",
      type: "string",
      group: "trade",
    }),
    defineField({
      name: "hsCode",
      title: "HS Code",
      type: "string",
      group: "trade",
    }),
    defineField({
      name: "shelfLife",
      title: "Shelf Life",
      type: "string",
      group: "trade",
    }),
    defineField({
      name: "leadTime",
      title: "Lead Time",
      type: "string",
      group: "trade",
    }),

    defineField({
      name: "certifications",
      title: "Certifications",
      type: "array",
      of: [{ type: "string" }],
      group: "trade",
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      group: "content",
    }),
    defineField({
      name: "exportMarkets",
      title: "Export Markets",
      type: "array",
      of: [{ type: "string" }],
      group: "trade",
    }),
    defineField({
      name: "exportPotential",
      title: "Export Potential (1-5)",
      type: "number",
      group: "trade",
    }),
    defineField({
      name: "valueAddition",
      title: "Value Addition",
      type: "string",
      group: "trade",
    }),

    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      group: "content",
    }),
    defineField({
      name: "badge",
      title: "Badge",
      type: "string",
      group: "content",
    }),

    // ---- photography: two shots per product ----
    defineField({
      name: "image",
      title: "Main image (front photo)",
      description: "Uploaded from public/products/<slug>-main.png",
      type: "image",
      options: { hotspot: true },
      group: "media",
    }),
    defineField({
      name: "imageSecondary",
      title: "Second image",
      description: "Uploaded from public/products/<slug>.png",
      type: "image",
      options: { hotspot: true },
      group: "media",
    }),
  ],

  preview: {
    select: { title: "name", subtitle: "category", media: "image" },
  },
});

export default product;
