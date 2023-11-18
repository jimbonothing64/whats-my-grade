import { parseAssessments, parseRequiredAssessmentId } from '$lib/url';
import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ url }) => {
	const assessments = parseAssessments(url);
	const requiredAssessmentId = parseRequiredAssessmentId(url);
	if (!assessments || requiredAssessmentId === null) {
		throw redirect(301, '/');
	}

	// if (
	// 	!url.searchParams.has(FORECASTED_ASSESSMENTS) ||
	// 	!url.searchParams.has(FORECASTED_ASSESSMENTS)
	// ) {}
	const forecastedAssessments = assessments.filter(
		(assessment) => assessment.mark == 0 && assessment.id !== requiredAssessmentId
	);
	const markedAssessments = assessments.filter(
		(assessment) => assessment.mark != 0 && assessment.id !== requiredAssessmentId
	);
	const [requiredAssessment] = assessments.filter(
		(assessment) => assessment.id === requiredAssessmentId
	);
	return {
		assessments,
		markedAssessments,
		forecastedAssessments,
		requiredAssessment
	};
};
