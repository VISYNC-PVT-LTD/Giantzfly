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
      validation: (rule) => rule.required().min(2),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
      group: "content",
      validation: (rule) => rule.required().custom((slug) =>
        !slug?.current || /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug.current)
          ? true : "Use lowercase words separated by hyphens.",
      ),
    }),

    defineField({
      name: "category",
      title: "Category",
      type: "string",
      group: "content",
      validation: (rule) => rule.required().custom((value) =>
        !value || ["whole-spices", "powder-spices", "vegetables", "dry-fruits", "makhana", "sprouted-atta", "dehydrated-fruits", "fruit-powders", "dehydrated-vegetables"].includes(value)
          ? true : "Choose a supported product category.",
      ),
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
          { title: "Sprouted Atta", value: "sprouted-atta" },
          { title: "Dehydrated Fruits", value: "dehydrated-fruits" },
          { title: "Fruit Powders", value: "fruit-powders" },
          { title: "Dehydrated Vegetables", value: "dehydrated-vegetables" },
        ],
      },
    }),

    defineField({
      name: "origin",
      title: "Origin",
      type: "string",
      group: "content",
      validation: (rule) => rule.required(),
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
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "text",
      group: "content",
      validation: (rule) => rule.required().min(10),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      group: "content",
      validation: (rule) => rule.required().min(20),
    }),

    defineField({
      name: "aboutParagraphs",
      title: "About this product — paragraphs",
      description: "Optional longer copy. The description is used when this list is empty.",
      type: "array",
      of: [{ type: "text", rows: 3, validation: (rule) => rule.required() }],
      group: "content",
    }),

    defineField({
      name: "packagingOptions",
      title: "Packaging Options",
      type: "array",
      of: [{ type: "string", validation: (rule) => rule.required() }],
      group: "trade",
      validation: (rule) => rule.required().min(1).unique(),
    }),

    defineField({ name: "moq", title: "MOQ", type: "string", group: "trade", validation: (rule) => rule.required() }),
    defineField({
      name: "moqUnit",
      title: "MOQ Unit",
      type: "string",
      group: "trade",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "moqOptions",
      title: "MOQ display options",
      description: "Optional alternatives, including units (for example 500 kg, negotiable).",
      type: "array",
      of: [{ type: "string", validation: (rule) => rule.required() }],
      group: "trade",
      validation: (rule) => rule.unique(),
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
      validation: (rule) => rule.integer().min(1).max(5),
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
      description: "Upload the product's main photograph.",
      type: "image",
      options: { hotspot: true },
      group: "media",
      validation: (rule) => rule.required().assetRequired(),
    }),
    defineField({
      name: "imageSecondary",
      title: "Second image",
      description: "Optional second product photograph.",
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
