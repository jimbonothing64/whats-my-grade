import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { parseHTML } from 'linkedom';

export const load: PageServerLoad = async ({ url, params }) => {
	const course = [];
	const courseId = params.courseid;

	const res = await fetch(
		`https://www.canterbury.ac.nz/courseinfo/GetCourses.aspx?course=${courseId}&year=2023`
	);

	// Unsuccessful, no page exists! Go back to search.
	if (!res.redirected) {
		throw redirect(300, `/search?query=${courseId}&redirected=1`);
	}
	const html = await res.text();
	const { document } = parseHTML(html);
	const courseCode = document.querySelector('.page-type');
	const courseName = document.querySelector('.getCourseDetails');
	const assessmentDiv = document.getElementById('ctl00_ContentPlaceHolder1_AssessmentRepeaterDiv');
	if (!assessmentDiv) console.log('unsuccessful table find');
	if (assessmentDiv) {
		const assessmentNames = Array.from(assessmentDiv.querySelectorAll("[data-title='Type']")).map(
			(el) => el.textContent?.trim()
		);
		const assessmentWeights = Array.from(
			assessmentDiv.querySelectorAll("[data-title='Percentage']")
		).map((el) => el.textContent?.trim());
		console.log(assessmentNames, assessmentWeights);
	}

	// } catch {
	// 	throw error(404, 'not found');
	// }

	return {
		course: { code: courseCode?.textContent?.trim(), name: courseName?.textContent?.trim() }
	};
};
