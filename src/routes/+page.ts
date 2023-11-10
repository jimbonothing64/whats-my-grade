import type { PageLoad } from './$types';
import { validateAssessments } from '$lib/zod';

export const load: PageLoad = ({ url }) => {
    const urlAssessments = url.searchParams.get('assessments')
    let assessments = null;
    if (urlAssessments) {
        const parsed = JSON.parse(urlAssessments)
        assessments = validateAssessments(parsed).valids;
    }
	return {
        assessments
	};
};