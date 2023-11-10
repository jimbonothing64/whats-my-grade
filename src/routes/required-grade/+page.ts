import {
	assessments as parseAssessments,
	requiredAssessment as parseRequiredAssessment
} from '$lib/url';
import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ url }) => {
	const assessments = parseAssessments(url);
	const requiredAssessment = parseRequiredAssessment(url);
	if (!assessments || !requiredAssessment) {
		throw redirect(301, '/');
	}
	return {
		assessments,
		requiredAssessment
	};
};
