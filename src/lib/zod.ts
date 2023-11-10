import { z } from 'zod';

export const assignmentSchema = z.object({
	name: z.string().optional(),
	weight: z.coerce.number().min(0).max(100),
	mark: z.coerce.number().min(0).max(100),
	invigilated: z.boolean()
});

export const validateAssessments = (assessments: Assessment[] | unknown[]) => {
	const errors: { [index: number]: unknown } = {};
	const valids = [];
	for (const [index, assessment] of assessments.entries()) {
		try {
			const validAssessment = assignmentSchema.parse(assessment);
			valids.push(validAssessment);
		} catch (error) {
			errors[index] = error;
		}
	}

	return { errors, valids };
};

export type Assessment = z.infer<typeof assignmentSchema>;
export type ValidatedAssessments = ReturnType<typeof validateAssessments>;
