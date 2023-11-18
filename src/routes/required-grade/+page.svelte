<script lang="ts">
	import StatCard from '$lib/components/StatCard.svelte';
	import { browser } from '$app/environment';
	import { totalWeightedMark, totalWeight, requiredGrade } from '$lib/grades';
	import { elementIsVisibleInViewport } from '$lib/lib';
	import type { Assessment } from '$lib/zod';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';
	import AssessmentList from '$lib/components/AssessmentList.svelte';
	import CalculateButton from '$lib/components/CalculateButton.svelte';

	export let data: PageData;
	let assessments = data.assessments;
	let forcastedAssessments = data.forecastedAssessments;
	let markedAssessments = data.markedAssessments;
	let invalids: number[] = [];
	let statsElement: Element | undefined;
	let desiredGrade = 50.0;

	$: requiredAssessment = data.requiredAssessment;
	$: total = totalWeight(assessments);
	$: required = requiredGrade(desiredGrade, requiredAssessment, assessments);
	$: totalWeighted =
		totalWeightedMark(assessments) + required.requiredGrade * (requiredAssessment.weight / total);

	function setUrlAssessments(assessments: Assessment[]) {
		const stringified = JSON.stringify(assessments);
		if (stringified && browser) {
			$page.url.searchParams.set('assessments', stringified);
			goto($page.url, { keepFocus: true }); // Set updated url.
		}
	}

	function handleCalculate(scroll = false) {
		total = totalWeight(assessments) + required.requiredGrade * (requiredAssessment.weight / total);
		totalWeighted = totalWeightedMark(assessments);
		if (scroll && invalids.length === 0 && statsElement) {
			if (!elementIsVisibleInViewport(statsElement, true)) statsElement.scrollIntoView(false);
		}
		if (invalids.length === 0) {
			setUrlAssessments(assessments);
		}
		console.log(assessments);
	}
</script>

<section class="py-3">
	<div class="flex justify-center p-4">
		<div bind:this={statsElement} class="flex gap-5 flex-col md:flex-row">
			<StatCard
				stat={required.requiredGrade}
				title="Required Grade"
				subtitle="in {requiredAssessment.name}"
			/>
			<StatCard bind:stat={totalWeighted} title="Overall Grade" subtitle="forecasted" />
		</div>
	</div>
	<div class="text-2xl font-bold text-center p-4">
		I want a final grade of
		<input
			bind:value={desiredGrade}
			class="outline-none w-16 text-inherit bg-inherit border-b border-dashed text-right"
		/>%
	</div>
	{#if forcastedAssessments.length > 0}
		<div class="flex justify-between pt-3 sticky top-0 bg-white dark:bg-gray-800">
			<h3 class="text-xl align-middle font-bold dark:text-white p-5">Forecasted Marks</h3>
			<CalculateButton on:click={() => handleCalculate(true)} />
		</div>

		<AssessmentList bind:assessments={forcastedAssessments} {invalids} {total} {handleCalculate} />
	{/if}
	<div class="flex justify-between pt-3 sticky top-0 bg-white dark:bg-gray-800">
		<h3 class="text-xl align-middle font-bold dark:text-white p-5">Marked Assessments</h3>
		{#if forcastedAssessments.length === 0}
			<CalculateButton on:click={() => handleCalculate(true)} />
		{/if}
	</div>
	<AssessmentList bind:assessments={markedAssessments} {invalids} {total} {handleCalculate} />
</section>
