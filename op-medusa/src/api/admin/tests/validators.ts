import { z } from "zod";

export const PostAdminCreateTest = z.object({
  name: z.string(),
});
