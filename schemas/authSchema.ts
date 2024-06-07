import {z} from "zod"

export const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }).min(1, { message: "Email is required" }),
    password: z.string().min(1, { message: "Password is required" })
  });
const userType = ["tenant", "landlord"];
  export const signupSchema = z.object({
    firstName: z.string().min(1, { message: "First Name is required" }),
    lastName: z.string().min(1, { message: "Last Name is required" }),
    email: z.string().email({ message: "Invalid email address" }).min(1, { message: "Email is required" }),
    password: z.string().min(1, { message: "Password is required" }),
    userType: z.enum(userType),
})