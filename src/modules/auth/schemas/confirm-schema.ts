import { z } from "zod";

export const confirmSchema = z.object({
  otp: z
    .string()
    .min(1, "OTP is required")
    .min(6, "OTP must be at least 6 characters long")
});

export type ConfirmFormData = z.infer<typeof confirmSchema>;
