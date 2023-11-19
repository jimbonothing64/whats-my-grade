import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { parseHTML } from 'linkedom';

export const load: PageServerLoad = async ({ url }) => {
	let courses: string[] = [];
	const searchParams = url.searchParams.get('query');
	if (searchParams) {
		// try {
		const res = await fetch(
			`https://www.canterbury.ac.nz/courseinfo/GetCourses.aspx?course=${searchParams}&year=2023`
		);
		// Course successfully found.
		if (res.redirected && !url.searchParams.has('redirected')) {
			throw redirect(300, `/search/${searchParams}`);
		}
		const html = await res.text();
		const { document } = parseHTML(html);
		const elementsWithClass = document.querySelectorAll('.tableTitle');
		const coursesElementsArray = Array.from(elementsWithClass);

		courses = coursesElementsArray.forEach((el) => {
			const code = el.textContent?.trim();
			const ocurancesElement = Array.from(
				el?.parentElement?.nextElementSibling?.querySelectorAll('td') || []
			);
			const ocurances = ocurancesElement
				.map((el) => {
					console.log(el.innerText?.trim());
					return el.innerText.trim();
				})
				.filter((text) => text?.trim() != '');
			// console.log(ocurances);
		});

		courses = coursesElementsArray.map((el) => el.textContent?.trim());
		console.log(courses);

		// } catch {
		// 	throw error(404, 'not found');
		// }
	}
	return {
		courses
	};
};
