import { z } from "zod";

const createAdminValidation = z.object({
  password: z.string({ required_error: "Password is required" }),
  admin: z.object({
    name: z.string({ required_error: "Name is required" }),
    email: z.string({ required_error: "Email is required" }).email({ message: "Invalid email address" }),
    contactNumber: z.string({
        required_error: "Contact number is required",
    }),
  }),
});


export const userValidation = {
  createAdminValidation,
};
// export type CreateAdminValidation = z.infer<typeof createAdminValidation>;