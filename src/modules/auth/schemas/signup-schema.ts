import { z } from "zod";

export const signupSchema = z
  .object({
    name: z
      .string()
      .min(1, "Full name is required")
      .min(2, "Name must be at least 2 characters long")
      .max(50, "Name must be less than 50 characters"),
    email: z
      .email({ error: "Invalid email address" })
      .min(1, "Email is required"),
    phone: z
      .string()
      .min(1, "Phone number is required")
      .regex(/^\+?[1-9]\d{1,14}$/, "Please enter a valid phone number"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters long")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      ),
    confirmPassword: z.string().min(1, "Please confirm your password")
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"]
  });

export type SignupFormData = z.infer<typeof signupSchema>;
