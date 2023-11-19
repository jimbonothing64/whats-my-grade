<script lang="ts">
	import AssessmentList from '$lib/components/AssessmentList.svelte';
	import { totalWeight } from '$lib/grades';
	import { importCourseUrl } from '$lib/url';
	import type { PageData } from './$types';

	export let data: PageData;
	let course = data.course;
</script>

<section class="py-3">
	<div class="flex flex-col items-center">
		<h2 class="text-2xl align-middle font-bold dark:text-white">{course.name}</h2>
		<h3 class="text-md align-middle font-meduim dark:text-white">{course.code}</h3>
	</div>
	<ul>
		<div class="flex justify-between pt-3 sticky top-0 bg-white dark:bg-gray-800">
			<h3 class="text-xl align-middle font-bold dark:text-white">Assessments</h3>
			<a href={importCourseUrl(course.assessments)}>Load Course</a>
		</div>
		<AssessmentList
			bind:assessments={course.assessments}
			invalids={[]}
			total={totalWeight(course.assessments)}
		/>
	</ul>
</section>
