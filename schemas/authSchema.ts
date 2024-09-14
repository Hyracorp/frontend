import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .min(1, { message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

const userType = ["tenant", "landlord"];
export const signupSchema = z
  .object({
    first_name: z.string().min(1, { message: "First Name is required" }),
    last_name: z.string().min(1, { message: "Last Name is required" }),
    email: z
      .string()
      .email({ message: "Invalid email address" })
      .min(1, { message: "Email is required" }),
    password: z.string().min(1, { message: "Password is required" }),
    password2: z.string().min(1, { message: "Password is required" }),
    userType: z.enum(userType),
  })
  .refine((data) => {
    return data.password === data.password2;
  }, {
    message: "Passwords do not match",
    path: ["password2"],
  });
