import { validateAssessments } from './zod';

export const assessments = (url: URL) => {
	const urlAssessments = url.searchParams.get('assessments');
	let assessments = null;
	if (urlAssessments) {
		const parsed = JSON.parse(urlAssessments);
		assessments = validateAssessments(parsed).valids;
	}
	return assessments;
};

export const requiredAssessment = (url: URL) => {
	const assessment = url.searchParams.get('required-assessment');
	return assessment;
};
