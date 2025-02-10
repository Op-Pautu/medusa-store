import { MedusaRequest, MedusaResponse } from "@medusajs/framework";
import { PostAdminCreateTest } from "src/api/admin/tests/validators";
import { createTestWorkflow } from "src/workflows/create-test";
import { z } from "zod";

type PostAdminCreateTestType = z.infer<typeof PostAdminCreateTest>;

export const POST = async (
  req: MedusaRequest<PostAdminCreateTestType>,
  res: MedusaResponse
) => {
  const { result } = await createTestWorkflow(req.scope).run({
    input: req.validatedBody,
  });

  res.json({ test: result });
};
