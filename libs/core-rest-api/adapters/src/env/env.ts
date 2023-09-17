import { z } from 'zod';

export const envSchema = z.object({
  // ######### Application #########
  // Environment
  NODE_ENV: z.string().default('development'),
  PORT: z.coerce.number().optional().default(3333),
  // Auth
  JWT_PRIVATE_KEY: z.string(),
  JWT_PUBLIC_KEY: z.string(),
  // ######### Database #########
  POSTGRES_USER: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_DB: z.string(),
  POSTGRES_HOST: z.string(),
  POSTGRES_PORT: z.coerce.number().optional().default(5432),
  POSTGRES_SCHEMA: z.string(),
});

export type Env = z.infer<typeof envSchema>;
