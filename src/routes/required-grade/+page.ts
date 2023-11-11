import { parseAssessments, parseRequiredAssessment } from '$lib/url';
import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ url }) => {
	const assessments = parseAssessments(url);
	const requiredAssessment = parseRequiredAssessment(url);
	if (!assessments || !requiredAssessment) {
		url.pathname = '/';
		throw redirect(301, url);
	}
	return {
		assessments,
		requiredAssessment
	};
};
