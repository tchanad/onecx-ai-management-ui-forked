import { AIContextSearchRequest } from 'src/app/shared/generated'
import { z, ZodTypeAny } from 'zod'

export const aIContextSearchCriteriasSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  appId: z.string().optional(),
  description: z.string().optional(),
} satisfies Partial<Record<keyof AIContextSearchRequest, ZodTypeAny>>)

export type AIContextSearchCriteria = z.infer<typeof aIContextSearchCriteriasSchema>
