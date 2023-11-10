import { assessments } from '$lib/url';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ url }) => {
	return {
		assessments: assessments(url)
	};
};
