import type { SchemaTypeDefinition } from "sanity";
import product from "./product";
import review from "./review";
import siteSettings from "./siteSettings";
import certificate from "./certificate";

export const schemaTypes: SchemaTypeDefinition[] = [product, siteSettings, certificate, review];
