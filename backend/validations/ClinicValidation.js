import * as z from "zod";

export const ClinicValidation = z.object({
  name: z.string({
    error: (iss) => (iss.input === undefined ? "Name is required" : "Invalid name"),
  }),
  password: z.string({
    error: (iss) => (iss.input === undefined ? "Password is required" : "Invalid password"),
  }),
  address: z.string({
    error: (iss) => (iss.input === undefined ? "Role is required" : "Invalid role"),
  }),
});