import * as z from "zod";

export const DoctorFormSchema = z.object({
  name: z.string({
    error: (iss) => (iss.input === undefined ? "Name is required" : "Invalid name"),
  }),
  email: z.email({
    error: (iss) => (iss.input === undefined ? "Email is required" : "Invalid email"),
  }),
  password: z.string({
    error: (iss) => (iss.input === undefined ? "Password is required" : "Invalid password"),
  }),
  role: z.string({
    error: (iss) => (iss.input === undefined ? "Role is required" : "Invalid role"),
  }),
  phone: z.string({
    error: (iss) => (iss.input === undefined ? "Phone is required" : "Invalid phone"),
  }),
  specialization: z.string({
    error: (iss) =>
      iss.input === undefined ? "Specialization is required" : "Invalid specialization",
  }),
  experience: z.coerce.number({
    error: (iss) =>
      iss.input === undefined ? "Experience is required" : "Invalid experience",
  }),
    consultationFee: z.coerce.number({
    error: (iss) =>
      iss.input === undefined ? "Consultation fee is required" : "Invalid consultation fee",
  }),
});