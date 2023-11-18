<script lang="ts">
	import StatCard from '$lib/components/StatCard.svelte';
	import { browser } from '$app/environment';
	import { totalWeightedMark, totalInvigilatedWeightedMark, totalWeight } from '$lib/grades';
	import { validateAssessments, type Assessment } from '$lib/zod';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { elementIsVisibleInViewport } from '$lib/lib';
	import type { PageData } from './$types';
	import AssessmentList from '$lib/components/AssessmentList.svelte';
	import CalculateButton from '$lib/components/CalculateButton.svelte';

	const DEMO_ASSESSMENTS = [
		{ name: 'Exam', weight: 50.0, mark: 0.0, invigilated: false },
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
		assessments = [
			...assessments,
			{ id: assessments.length, name: '', weight: 0, mark: 0, invigilated: false }
		];
		handleCalculate();
	}
</script>

<section class="py-3">
	<div class="flex justify-center p-4">
		<div bind:this={statsElement} class="flex gap-5 flex-col md:flex-row">
			<StatCard
				bind:stat={totalWeighted}
				title="Grade"
				subtitle={`total weight of  ${total.toFixed(2)}%`}
			/>
			<StatCard
				bind:stat={totalInvigilated}
				title="Invigilated"
				subtitle={`total weight of ${totalInvigilated.toFixed(2)}%`}
			/>
		</div>
	</div>
	<div>
		<div class="flex justify-between pt-3 sticky top-0 bg-white dark:bg-gray-800">
			<h3 class="text-xl align-middle font-bold dark:text-white p-5">Assessments</h3>
			<CalculateButton on:click={() => handleCalculate(true, true)} />
		</div>
		<AssessmentList bind:assessments bind:invalids bind:total {handleRemove} {handleCalculate}>
			<button
				on:click={() => hadnleInsert()}
				class="flex flex-col md:flex-row p-4 justify-between text-lg hover:shadow-md group rounded-md ring-1 ring-slate-200 bg-white dark:bg-gray-800 shadow-sm"
			>
				<p>New assessment</p>

				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-6 h-6 self-center"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
				</svg>
			</button>
		</AssessmentList>
	</div>
</section>
