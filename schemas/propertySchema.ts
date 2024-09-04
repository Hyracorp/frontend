
import { z } from "zod";

// BaseProperty Schema
const basePropertySchema = z.object({
  propertyType: z.enum(["Residential", "Commercial"]),
  serviceType: z.enum(["Lease", "Rent", "Management"]),
  areaSqFt: z.number(),
  floorNo: z.string(),
  expectedRateRent: z.number(),
  expectedDeposit: z.number(),
  description: z.string(),
  propertyOwner: z.string(),
  propertyInsured: z.boolean(),
  title: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  addressLine1: z.string(),
  addressLine2: z.string().optional(),
  pincode: z.number(),
  city: z.string(),
  state: z.string(),
  amenities: z.array(z.number()).optional(), // Assuming Amenity IDs are numbers
  rules: z.string().optional(),
});

// ResidentialProperty Schema
const residentialPropertySchema = basePropertySchema.extend({
  bhk: z.enum(["1 BHK", "2 BHK", "3 BHK", "4 BHK"]),
  flatHouse: z.string(),
  petsAllowed: z.boolean(),
  furnished: z.boolean(),
  powerBackup: z.boolean(),
  nonVegAllowed: z.boolean(),
  landmark: z.string().optional(),
});

// CommercialProperty Schema
const commercialPropertySchema = basePropertySchema.extend({
  tenantPreference: z.string(),
  fireSafetyStatus: z.boolean(),
  washroomFacility: z.boolean(),
  generator: z.boolean(),
  noOfCarParkings: z.number(),
  noOfBikeParkings: z.number(),
});

export { residentialPropertySchema, commercialPropertySchema };

