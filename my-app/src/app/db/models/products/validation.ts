import { z } from "zod";

export const productsValidation = z.object({
    name : z.string(),
    slug: z.string(),
})