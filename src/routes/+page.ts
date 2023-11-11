import { parseAssessments } from '$lib/url';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ url }) => {
	return {
		assessments: parseAssessments(url)
	};
};
