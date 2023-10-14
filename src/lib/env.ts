import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

const nodeEnvSchema = z.enum(["development", "test", "production"]);

export const env = createEnv({
  client: {
    NEXT_PUBLIC_NODE_ENV: nodeEnvSchema,
  },
  server: {
    NODE_ENV: nodeEnvSchema,
    NEXTAUTH_URL: z.preprocess(
      (str) => process.env.VERCEL_URL ?? str,
      process.env.VERCEL ? z.string().min(1) : z.string().url(),
    ),
    NEXTAUTH_SECRET: z.string().min(1),
    GOOGLE_CLIENT_ID: z.string().min(1),
    GOOGLE_CLIENT_SECRET: z.string().min(1),
    ADMIN_EMAIL: z.string().min(1),
    ADMIN_OPENAI_API_KEY: z.string().min(1),
  },
  runtimeEnv: {
    NEXT_PUBLIC_NODE_ENV: process.env.NODE_ENV,
    NODE_ENV: process.env.NODE_ENV,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    ADMIN_OPENAI_API_KEY: process.env.ADMIN_OPENAI_API_KEY,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});
