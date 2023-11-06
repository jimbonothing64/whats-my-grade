import type { Assessment } from '$lib/zod';

/**
 * Calculate the mark for that assessment after weight adjustment, i.e. that
 * assessment's contrubution to their final grade.
 * @param assessment assessment to calculate weighted mark for.
 * @param totalWeight of assessments to add up.
 * @returns the mark going towards final grade
 */
const weightedMark = (assessment: Assessment, totalWeight = 100.0) => {
	if (!assessment.mark) return 0.0;
	return assessment.mark * (assessment.weight / totalWeight);
};

/**
 * Calculate the sum of all weights for provided assessments.
 * @param assessments to calculate total weight of.
 * @returns all weights for provided assessments
 */
const totalWeight = (assessments: Assessment[]) => {
	let totalWeight = 0.0;
	for (const assessment of assessments) {
		totalWeight += assessment.weight;
	}
	return totalWeight;
};

/**
 * Calculate the total wieghted mark for assessment items.
 * Uses the combined weights to calculate this.
 * @param assessments to calculate total weighted mark for
 * @returns total weighted mark of assessments
 */
const totalWeightedMark = (assessments: Assessment[]) => {
	const weightSum = totalWeight(assessments);
	let total = 0.0;
	for (const assessment of assessments) {
		total += weightedMark(assessment, weightSum);
	}
	return total;
};

/**
 *
 * @param assessments
 * @returns
 */
const totalInvigilatedWeightedMark = (assessments: Assessment[]) => {
	const invigilateds = assessments.filter((assessment) => assessment.invigilated);
	return totalWeightedMark(invigilateds);
};

export { weightedMark, totalWeight, totalWeightedMark, totalInvigilatedWeightedMark };
