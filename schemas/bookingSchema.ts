import { z } from "zod";

// Define the possible values for gender as a tuple
const gender = ["Male", "Female", "Other"] as const;

export const bookingSchema = z.object({
  property: z.string().nonempty("Property ID is required"), // Ensures non-empty string
  date: z.string(), // Ensures non-empty string
  time: z.string().nonempty("Time is required"), // Ensures non-empty string
  phone: z.string().min(8, { message: "Phone number must be at least 8 characters long" }), // Validates phone number length
  gender: z.enum(gender, { errorMap: () => ({ message: "Gender is required and must be one of Male, Female, or Other" }) }) // Ensures gender is one of the specified options
});
