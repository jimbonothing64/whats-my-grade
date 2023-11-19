import { z } from 'zod';

export const markSchema = z.coerce.number().min(0).max(100);

export const assignmentSchema = z.object({
	id: z.number(),
	name: z.string().optional(),
	weight: z.coerce.number().min(0).max(100),
	mark: markSchema.optional(),
	invigilated: z.boolean()
});

export const validateAssessments = (assessments: Assessment[] | unknown[]) => {
	const errors: { [index: number]: unknown } = {};
	const valids = [];
	for (const [index, assessment] of assessments.entries()) {
		const serialisedAssessment = { id: index, ...(assessment as object) };
		try {
			const validAssessment = assignmentSchema.parse(serialisedAssessment);
			valids.push(validAssessment);
		} catch (error) {
			errors[serialisedAssessment.id] = error;
		}
	}

	return { errors, valids };
};

export type Assessment = z.infer<typeof assignmentSchema>;
export type ValidatedAssessments = ReturnType<typeof validateAssessments>;
