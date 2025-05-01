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


const createDoctorValidation = z.object({
  password: z.string({ required_error: "Password is required" }),
  doctor: z.object({
    name: z.string({ required_error: "Name is required" }),
    email: z.string({ required_error: "Email is required" }).email({ message: "Invalid email address" }),
    contactNumber: z.string({ required_error: "Contact number is required" }),
    address: z.string({ required_error: "Address is required" }),
    registrationNumber: z.string({ required_error: "Registration number is required" }),
    experienceYears: z.number({ required_error: "Experience years is required" }),
    gender: z.enum(["MALE", "FEMALE", "OTHER"], { required_error: "Gender is required" }),
    appointmentFee: z.string({ required_error: "Appointment fee is required" }),
    qualification: z.string({ required_error: "Qualification is required" }),
    currentWorkingLocation: z.string({ required_error: "Current working location is required" }),
    designation: z.string({ required_error: "Designation is required" }),
    
  }),
});

export const userValidation = {
  createDoctorValidation,
  createAdminValidation,
};
// export type CreateAdminValidation = z.infer<typeof createAdminValidation>;
