import { z } from 'zod';

export const envSchema = z.object({
  // ########## Application ##########
  // Environment
  NODE_ENV: z.string().default('development'),
  PORT: z.coerce.number().optional().default(3333),

  // Auth
  JWT_PRIVATE_KEY: z.string().min(1, 'JWT_PRIVATE_KEY cannot be empty'),
  JWT_PUBLIC_KEY: z.string().min(1, 'JWT_PUBLIC_KEY cannot be empty'),

  // ########## Database ##########
  POSTGRES_USER: z.string().min(1, 'POSTGRES_USER cannot be empty'),
  POSTGRES_PASSWORD: z.string().min(1, 'POSTGRES_PASSWORD cannot be empty'),
  POSTGRES_DB: z.string().min(1, 'POSTGRES_DB cannot be empty'),
  POSTGRES_HOST: z.string().min(1, 'POSTGRES_HOST cannot be empty'),
  POSTGRES_PORT: z.coerce.number().optional().default(5432),
  POSTGRES_SCHEMA: z.string().min(1, 'POSTGRES_SCHEMA cannot be empty'),
});

export type Env = z.infer<typeof envSchema>;
