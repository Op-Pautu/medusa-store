import {
  defineMiddlewares,
  validateAndTransformBody,
  validateAndTransformQuery,
} from "@medusajs/framework/http";
import { createFindParams } from "@medusajs/medusa/api/utils/validators";
import { z } from "zod";
import { PostAdminCreateBrand } from "./admin/brands/validators";
import { PostAdminCreateTest } from "src/api/admin/tests/validators";

export const GetBrandsSchema = createFindParams();

export default defineMiddlewares({
  routes: [
    {
      matcher: "/admin/brands",
      method: "POST",
      middlewares: [validateAndTransformBody(PostAdminCreateBrand)],
      additionalDataValidator: {
        brand_id: z.string().optional(),
      },
    },
    {
      matcher: "/admin/brands",
      method: "GET",
      middlewares: [
        validateAndTransformQuery(GetBrandsSchema, {
          defaults: ["id", "name", "products.*"],
          isList: true,
        }),
      ],
    },
    {
      matcher: "/admin/tests",
      method: "POST",
      middlewares: [validateAndTransformBody(PostAdminCreateTest)],
      additionalDataValidator: {
        test_id: z.string().optional(),
      },
    },
  ],
});
