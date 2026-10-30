import { defineField, defineType } from "sanity";
import { DEFAULT_SITE_SETTINGS } from "../../lib/settings-normalize.mjs";

export default defineType({
  name: "siteSettings",
  title: "Contact & site settings",
  type: "document",
  fields: [
    defineField({
      name: "contactEmail",
      title: "Public contact email",
      description: "Displayed on the website and used for enquiry email links. Supply an address your team can receive mail at.",
      type: "string",
      initialValue: DEFAULT_SITE_SETTINGS.contactEmail,
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: "contactPhone",
      title: "Public phone / WhatsApp",
      description: "Use an international number beginning with +. The same number is displayed and used as the WhatsApp destination.",
      type: "string",
      initialValue: DEFAULT_SITE_SETTINGS.contactPhone,
      validation: (rule) => rule.required().custom((value) =>
        !value || (/^\+[\d\s().-]+$/.test(value) && /^\d{8,15}$/.test(value.replace(/\D/g, "")))
          ? true : "Enter an international phone number with 8–15 digits, beginning with +.",
      ),
    }),
    defineField({
      name: "origin",
      title: "Business location / origin",
      description: "Public location only; this field is not a registered legal-office declaration.",
      type: "string",
      initialValue: DEFAULT_SITE_SETTINGS.origin,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: { prepare: () => ({ title: "Contact & site settings" }) },
});
