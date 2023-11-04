import { z } from 'zod';

export const assignmentSchema = z.object({
	name: z.string(),
	weight: z.number(),
	mark: z.number(),
	invigilated: z.boolean()
});
