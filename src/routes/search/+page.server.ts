import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const res = await fetch(
		'https://www.canterbury.ac.nz/courseinfo/GetCourses.aspx?course=COSC&year=2023'
	);
	const courses = await res.text();
	console.log(courses);
	return {
		courses
	};
};
