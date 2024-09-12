
import { z } from "zod";

const pType = ["Residential", "Commercial"] as const;

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
      }),
    )
    .optional(), // make bhkNo optional initially
  propertyType: z.enum(pType),
}).refine((data) => {
  // Ensure bhkNo is provided only when propertyType is "Residential"
  if (data.propertyType === "Residential") {
    return data.bhkNo && data.bhkNo.length > 0;
  }
  return true; // No need for bhkNo if propertyType is not Residential
}, {
  message: "Minimum 1 BHK should be selected for Residential properties",
  path: ["bhkNo"], // where to show the error message
});

export type SearchData = z.infer<typeof searchSchema>;

