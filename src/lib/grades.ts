import { assignmentSchema } from '$lib/zod';

/**
 * Create an assessment item.
 * @param weight of assessment in final mark as percent, i.e. 65.
 * @param invigilated weather the assessment is invigilated or not.
 * @param mark as percent, i.e. 65 (if mark exists).
 * @returns an assessment with.
 */
const assessment = (name: string, weight: number, invigilated: boolean, mark?: number) => {
	return { name, weight, mark, invigilated };
};

/**
 * Calculate the mark for that assessment after weight adjustment, i.e. that
 * assessment's contrubution to their final grade.
 * @param ass assessment to calculate weighted mark for.
 * @param totalWeight of assessments to add up.
 * @returns the mark going towards final grade
 */
const weightedMark = (ass: ReturnType<typeof assessment>, totalWeight = 100.0) => {
	if (!ass.mark) return 0.0;
	return ass.mark * (ass.weight / totalWeight);
};

/**
 * Calculate the sum of all weights for provided assessments.
 * @param assessments to calculate total weight of.
 * @returns all weights for provided assessments
 */
const totalWeight = (assessments: ReturnType<typeof assessment>[]) => {
	let totalWeight = 0.0;
	for (const ass of assessments) {
		totalWeight += ass.weight;
	}
	return totalWeight;
};

/**
 * Calculate the total wieghted mark for assessment items.
 * Uses the combined weights to calculate this.
 * @param assessments to calculate total weighted mark for
 * @returns total weighted mark of assessments
 */
const totalWeightedMark = (assessments: ReturnType<typeof assessment>[]) => {
	const weightSum = totalWeight(assessments);
	let total = 0.0;
	for (const ass of assessments) {
		total += weightedMark(ass, weightSum);
	}
	return total;
};

/**
 *
 * @param assessments
 * @returns
 */
const totalInvigilatedWeightedMark = (assessments: ReturnType<typeof assessment>[]) => {
	const invigilateds = assessments.filter((ass) => ass.invigilated);
	return totalWeightedMark(invigilateds);
};

export { assessment, weightedMark, totalWeight, totalWeightedMark, totalInvigilatedWeightedMark };
