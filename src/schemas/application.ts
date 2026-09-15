import { z } from 'zod'
export const applicationMetadata = z.object({ title: z.literal('Battle for Altarin') })
