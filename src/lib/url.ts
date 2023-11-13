import { validateAssessments, type Assessment } from './zod';

export const REQUIRED_ASSESSMENT = 'requiredassessment';
export const ASSESSMENTS = 'assessments';

export const parseAssessments = (url: URL) => {
	let assessments = null;
	if (url.searchParams.has(ASSESSMENTS)) {
		try {
			const urlAssessments = url.searchParams.get(ASSESSMENTS) as string;
			const parsed = JSON.parse(urlAssessments);
			assessments = validateAssessments(parsed).valids;
		} catch {
			/* null */
		}
	}
	return assessments;
};

export const parseRequiredAssessment = (url: URL) => {
	return url.searchParams.get(REQUIRED_ASSESSMENT);
};

export const minRequiredGradeUrl = (i: number, assessments: Assessment[]) => {
	const stringified = JSON.stringify(assessments);
	const url = `/required-grade/?${REQUIRED_ASSESSMENT}=${i}&${ASSESSMENTS}=${stringified}`
	return url;
}