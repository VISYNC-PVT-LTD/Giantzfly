import { defineField, defineType } from "sanity";

const certificate = defineType({
  name: "certificate",
  title: "Certificate",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Public caption",
      type: "string",
      description: "Use a document label only, such as IEC or GST. Do not include registration, PAN, banking or tax identifiers.",
      validation: (Rule) => Rule.required().max(80),
    }),
    defineField({
      name: "image",
      title: "Redacted public image",
      type: "image",
      description: "Upload redacted public copies only. Remove PAN, banking and tax identifiers. Do not upload bank authorisations or other sensitive documents; uploaded assets must be safe for public access even when website display is off.",
      options: { hotspot: false },
      validation: (Rule) => Rule.required().assetRequired(),
    }),
    defineField({
      name: "pages",
      title: "Additional pages",
      type: "array",
      description: "Optional further pages of the same document, in order. Same redaction rules as the first page.",
      of: [{ type: "image", options: { hotspot: false } }],
    }),
    defineField({
      name: "publishOnWebsite",
      title: "Publish on website",
      type: "boolean",
      initialValue: false,
      description: "Enable only for a redacted public copy approved for website display. The document must also be published in Sanity.",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: "title", media: "image", publishOnWebsite: "publishOnWebsite" },
    prepare({ title, media, publishOnWebsite }) {
      return {
        title,
        media,
        subtitle: publishOnWebsite ? "Website display enabled" : "Hidden from website",
      };
    },
  },
});

export default certificate;
