import { defineType, defineField } from "sanity";

const review = defineType({
  name: "review",
  title: "Review",
  type: "document",

  fields: [
    defineField({ name: "name", title: "Buyer Name", type: "string" }),
    defineField({
      name: "company",
      title: "Company",
      type: "string",
    }),
    defineField({
      name: "country",
      title: "Country",
      type: "string",
    }),
    defineField({
      name: "rating",
      title: "Rating (1-5)",
      type: "number",
      validation: (Rule) => Rule.min(1).max(5),
    }),
    defineField({
      name: "text",
      title: "Review Text",
      type: "text",
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "date",
    }),
  ],

  preview: {
    select: { title: "name", subtitle: "text" },
  },
});

export default review;
