import { z } from 'zod';

export const routeParamSchema = z.string().email();

export type emailParam = z.infer<typeof routeParamSchema>;
