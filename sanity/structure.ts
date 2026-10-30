import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Giantzfly content")
    .items([
      S.listItem().id("products").title("Products")
        .child(S.documentTypeList("product").title("Products")),
      S.listItem().id("siteSettings").title("Contact & site settings")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
      S.listItem().id("certificates").title("Certificates")
        .child(S.documentTypeList("certificate").title("Certificates")),
      S.listItem().id("reviews").title("Reviews")
        .child(S.documentTypeList("review").title("Reviews")),
    ]);
