
import { z } from "zod";

// BaseProperty Schema
const basePropertySchema = z.object({
  propertyType: z.enum(["Residential", "Commercial"]),
  serviceType: z.enum(["Lease", "Rent", "Management"]),
  areaSqFt: z.number().min(0.01), // Required positive number
  floorNo: z.string().min(1), // Required string
  expectedRateRent: z.number().min(0.01), // Required positive number
  expectedDeposit: z.number().min(0), // Required non-negative number
  description: z.string().min(1), // Required string
  propertyOwner: z.string().min(1), // Required string
  propertyInsured: z.boolean().refine(val => typeof val === "boolean"), // Required boolean
  title: z.string().min(1), // Required string
  latitude: z.number().min(-90).max(90), // Required latitude number
  longitude: z.number().min(-180).max(180), // Required longitude number
  addressLine1: z.string().min(1), // Required string
  addressLine2: z.string().optional(),
  pincode: z.number().int().positive(), // Required positive integer
  city: z.string().min(1), // Required string
  state: z.string().min(1), // Required string
  amenities: z.array(z.number().int().positive()).optional(), // Assuming Amenity IDs are positive integers
  rules: z.string().optional(),
});

// ResidentialProperty Schema
const residentialPropertySchema = basePropertySchema.extend({
  bhk: z.enum(["1 BHK", "2 BHK", "3 BHK", "4 BHK"]),
  flatHouse: z.string().min(1), // Required string
  petsAllowed: z.boolean().refine(val => typeof val === "boolean"), // Required boolean
  furnished: z.boolean().refine(val => typeof val === "boolean"), // Required boolean
  powerBackup: z.boolean().refine(val => typeof val === "boolean"), // Required boolean
  nonVegAllowed: z.boolean().refine(val => typeof val === "boolean"), // Required boolean
  landmark: z.string().optional(),
});

// CommercialProperty Schema
const commercialPropertySchema = basePropertySchema.extend({
  tenantPreference: z.string().min(1), // Required string
  fireSafetyStatus: z.boolean().refine(val => typeof val === "boolean"), // Required boolean
  washroomFacility: z.boolean().refine(val => typeof val === "boolean"), // Required boolean
  generator: z.boolean().refine(val => typeof val === "boolean"), // Required boolean
  noOfCarParkings: z.number().int().min(0), // Required non-negative integer
  noOfBikeParkings: z.number().int().min(0), // Required non-negative integer
});

export { residentialPropertySchema, commercialPropertySchema };


