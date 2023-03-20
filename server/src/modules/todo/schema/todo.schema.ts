import { z } from 'zod';

export const CreateTodoSchema = z.object({
  body: z.object({
    content: z.string(),
  }),
});
