import { validateAssessments, type Assessment } from './zod';

export const REQUIRED_ASSESSMENT = 'requiredassessment';
export const ASSESSMENTS = 'assessments';
export const FORECASTED_ASSESSMENTS = 'forecasted';
export const MARKED_ASSESSMENTS = 'marked';

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

export const importCourseUrl = (assessments: Assessment[]) => {
	const stringified = JSON.stringify(assessments);
	const url = `/?${ASSESSMENTS}=${stringified}`;
	return url;
};

export const parseRequiredAssessmentId = (url: URL) => {
	const required = url.searchParams.get(REQUIRED_ASSESSMENT);
	if (required) {
		return parseInt(required);
	}
	return null;
};

export const minRequiredGradeUrl = (assessment: Assessment, assessments: Assessment[]) => {
	const stringified = JSON.stringify(assessments);
	const url = `/required-grade/?${REQUIRED_ASSESSMENT}=${assessment.id}&${ASSESSMENTS}=${stringified}`;
	return url;
};
