import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { parseHTML } from 'linkedom';

export const load: PageServerLoad = async ({ url, params }) => {
	const course = [];
	const courseId = params.courseid;

	const res = await fetch(
		`https://www.canterbury.ac.nz/courseinfo/GetCourses.aspx?course=${courseId}&year=2023`
	);
	if (!res.redirected) {
		throw redirect(300, `/search?query=${courseId}&redirected=1`);
	}
	const html = await res.text();
	const { document } = parseHTML(html);
	const courseCode = document.querySelector('.page-type');
	const courseName = document.querySelector('.getCourseDetails');
	// const elementsArray = Array.from(elementsWithClass);
	// course = elementsArray.map((el) => el.textContent?.trim());
	// console.log(course);

	// } catch {
	// 	throw error(404, 'not found');
	// }

	return {
		course: { code: courseCode?.textContent?.trim(), name: courseName?.textContent?.trim() }
	};
};
