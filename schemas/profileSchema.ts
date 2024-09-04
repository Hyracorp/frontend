import { z } from "zod";

export const profileSchema = z.object({
  phone_number: z
    .string()
    .min(8, { message: "Phone number must be at least 8 characters long" }),
  address: z.string().min(1, { message: "Address is required" }),
  city: z.string().min(1, { message: "City is required" }),
  state: z.string().min(1, { message: "State is required" }),
  zip_code: z.number().min(100000, { message: "Zip Code is required" }),
});

const maritalStatus = ["Single", "Married"];
const gender = ["Male", "Female", "Other"];
const occupation = ["Student", "Employed", "Unemployed"];

export const tenantProfileSchema = z.object({
  phone_number: z
    .string()
    .min(8, { message: "Phone number must be at least 8 characters long" }),
  address: z.string().min(1, { message: "Address is required" }),
  city: z.string().min(1, { message: "City is required" }),
  state: z.string().min(1, { message: "State is required" }),
  zip_code: z.number().min(100000, { message: "Zip Code is required" }),
  marital_status: z.enum(maritalStatus),
  gender: z.enum(gender),
  occupation: z.enum(occupation),
});
