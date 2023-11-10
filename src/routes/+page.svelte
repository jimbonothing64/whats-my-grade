<script lang="ts">
	import StatCard from '$lib/components/StatCard.svelte';
	import { browser } from '$app/environment';
	import {
		weightedMark,
		totalWeightedMark,
		totalInvigilatedWeightedMark,
		totalWeight
	} from '$lib/grades';
	import { validateAssessments, type Assessment } from '$lib/zod';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';
	import AssessmentList from '$lib/components/AssessmentList.svelte';

	const DEMO_ASSESSMENTS = [
		{ name: 'Exam', weight: 50.0, mark: 100.0, invigilated: false },
		{ name: 'Assignment 1', weight: 25.0, mark: 100.0, invigilated: false },
		{ name: 'Assignment 2', weight: 25.0, mark: 100.0, invigilated: false }
	];

	export let data: PageData;
	let assessments = intialiseAssessments();
	let total = totalWeight(assessments);
	let totalWeighted = totalWeightedMark(assessments);
	let totalInvigilated = totalInvigilatedWeightedMark(assessments);
	let invalids: number[] = [];
	let statsElement: Element | undefined;

	$: {
		setLocalAssessments(assessments);
	}

	function elementIsVisibleInViewport(el: Element, partiallyVisible = false) {
		const { top, left, bottom, right } = el.getBoundingClientRect();
		const { innerHeight, innerWidth } = window;
		return partiallyVisible
			? ((top > 0 && top < innerHeight) || (bottom > 0 && bottom < innerHeight)) &&
					((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
			: top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
	}

	function intialiseAssessments() {
		if (data?.assessments) {
			return data.assessments as Assessment[];
		}
		return getLocalAssessments() || [];
	}

	function getLocalAssessments() {
		try {
			const localAssessments = sessionStorage.getItem('assessments') as string;
			const jsonAssessments = JSON.parse(localAssessments) as Assessment[];
			let { valids } = validateAssessments(jsonAssessments);
			return valids;
		} catch {
			return null;
		}
	}

	function setLocalAssessments(assessments: Assessment[]) {
		if (browser) sessionStorage.setItem('assessments', JSON.stringify(assessments));
	}

	function setUrlAssessments(assessments: Assessment[]) {
		const stringified = JSON.stringify(assessments);
		if (stringified && browser) {
			$page.url.searchParams.set('assessments', stringified);
			goto($page.url, { keepFocus: true }); // Set updated url.
		}
	}

	function handleCalculate(scroll = false, updateUrl = false) {
		const { valids, errors } = validateAssessments(assessments);
		invalids = Object.keys(errors).map((el) => Number(el));
		total = totalWeight(valids);
		totalWeighted = totalWeightedMark(valids);
		totalInvigilated = totalInvigilatedWeightedMark(valids);
		if (scroll && invalids.length === 0 && statsElement) {
			if (!elementIsVisibleInViewport(statsElement, true)) statsElement.scrollIntoView(false);
		}
		if (invalids.length === 0 && updateUrl) {
			setUrlAssessments(assessments);
		}
	}

	function handleRemove(indexToRemove: number) {
		assessments = assessments.filter((_, index) => index !== indexToRemove);
		handleCalculate();
	}

	function hadnleInsert() {
		assessments = [...assessments, { name: '', weight: 0, mark: 0, invigilated: false }];
		handleCalculate();
	}
</script>

<section class="text-center">
	<h1
		class="mb-4 px-3 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white"
	>
		&#x1F913 What's my <span
			class="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-600">grade</span
		>?
	</h1>
	<p
		class="mb-6 px-2 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400"
	>
		A tool to help students calculate their current grades in various courses. You can input
		assessment scores and weightings, and be provided with an estimate of your current standing in
		the course.
	</p>
</section>
<section class="py-3">
	<div class="flex justify-center p-4">
		<div bind:this={statsElement} class="flex gap-5 flex-col md:flex-row">
			<StatCard bind:stat={totalWeighted} title="Grade" />
			<StatCard bind:stat={totalInvigilated} title="Invigilated" />
		</div>
	</div>
	<div>
		<div class="flex justify-between pt-3 sticky top-0 bg-white dark:bg-gray-800">
			<h3 class="text-xl align-middle font-bold dark:text-white p-5">Assessments</h3>
			<button
				on:click={() => handleCalculate(true)}
				class="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 inline-flex items-center"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-6 h-6"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0012 2.25z"
					/>
				</svg>
			</button>
		</div>
		<AssessmentList
			bind:assessments
			bind:invalids
			bind:total
			{hadnleInsert}
			{handleRemove}
			{handleCalculate}
		/>
	</div>
</section>
