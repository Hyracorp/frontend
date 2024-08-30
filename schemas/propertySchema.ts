import {z} from "zod"

const pType= ["residential", "commercial"]
const bType=['Flat','Apartment', 'House','Plot','Villa','Office','Auditorium','Diner','Presentation Room']
const sType=['Rent','Lease','Management']
export const commercialPropertySchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    city: z.string().min(1, "City is required"),
    address: z.string().min(1, "Address is required"),
    price: z.string().min(1, "Price is required"),
    state: z.string().min(1, "State is required"),
    zip: z.string().min(1, "Zipcode is required"),
    propertyType: z.enum(pType),
    rentDays: z.number().min(1, "Rent Duration is required"),
    // floor_no optional
    floor_no: z.number(),
    area: z.number().min(1, "Area is required"),
    bhkNo: z.number().min(1, "BHK is required"),
    building_type:z.enum(bType),
    serviceType:z.enum(sType),
    propertyInsured:z.boolean(),
    mapLocation:z.object({
        lat:z.number(),
        longi:z.number()
    }),
    bhkNo: z.number().min(1, "BHK is required")
    
})