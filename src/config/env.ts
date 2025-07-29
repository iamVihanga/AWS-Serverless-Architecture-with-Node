/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-namespace */
// src/config/env.ts
import z from "zod";

// Define the schema for the environment variables
const envSchema = z.object({
  NEXT_PUBLIC_USER_POOL_ID: z.string(),
  NEXT_PUBLIC_USER_POOL_CLIENT_ID: z.string()
});

// Function to validate the environment variables
export const validateEnv = () => envSchema.safeParse(process.env);

// Extend ProcessEnv interface with environment variables schema
declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envSchema> {}
  }
}
