import { model } from "@medusajs/framework/utils";

export const Brand = model.define("brand", {
  id: model.id().primaryKey(),
  name: model.text(),
  description: model.text().nullable(),
  handle: model.text(),
  website: model.text().nullable(),
  logo_url: model.text().nullable(),
  featured: model.boolean().default(false),
  metadata: model.json().nullable(),
});
