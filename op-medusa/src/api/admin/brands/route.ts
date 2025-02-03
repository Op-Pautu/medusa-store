import { z } from "zod";

import { MedusaRequest, MedusaResponse } from "@medusajs/framework";
import { PostAdminCreateBrand } from "src/api/admin/brands/validators";
import { createBrandWorkflow } from "src/workflows/create-brand";

type PostAdminCreateBrandType = z.infer<typeof PostAdminCreateBrand>;

export const POST = async (
  req: MedusaRequest<PostAdminCreateBrandType>,
  res: MedusaResponse
) => {
  const { result } = await createBrandWorkflow(req.scope).run({
    input: req.validatedBody,
  });

  res.json({ brand: result });
};
