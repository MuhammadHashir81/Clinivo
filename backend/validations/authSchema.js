import * as z from "zod";


// signupschema

export const SignupSchema = z.object({
  name: z.string().min(2, { error: "Name must be at least 2 characters long." }),
  email: z.email({ error: "Please enter a valid email address." }),
  password: z.string({ error: "password is required." }),
});

