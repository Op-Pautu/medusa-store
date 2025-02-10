import { model } from "@medusajs/framework/utils";

export const Test = model.define("test", {
  id: model.id().primaryKey(),
  name: model.text(),
});
