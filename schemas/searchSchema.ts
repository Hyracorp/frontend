import { number, z } from "zod";

export const searchSchema = z.object({
  location: z
    .object({
      city: z.string().min(1, "Please select a city"),
    })
    .required(),
  bhkNo: z
    .array(
      z.object({
        value: z.number(),
      })
    )
    .min(1, "minimum 1 bhk should be selected"),
});
export type SearchData = z.infer<typeof searchSchema>;
