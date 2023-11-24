<script lang="ts">
	import StatCard from '$lib/components/StatCard.svelte';
	import { browser } from '$app/environment';
	import { totalWeightedMark, totalWeight, requiredGrade } from '$lib/grades';
	import { validateAssessments, type Assessment } from '$lib/zod';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';
	import AssessmentList from '$lib/components/AssessmentList.svelte';
	import CalculateButton from '$lib/components/CalculateButton.svelte';
	import { FORECASTED_ASSESSMENTS, setUrlAssessments } from '$lib/url';

	export let data: PageData;
	let forcastedAssessments = data.forecastedAssessments;
	let markedAssessments = data.markedAssessments;
	let desiredGrade = 50.0;
	let requiredAssessment = data.requiredAssessment;

	$: assessments = [
		requiredAssessment,
		...validateAssessments(forcastedAssessments).valids,
		...validateAssessments(markedAssessments).valids
	];
	$: invalids = Object.keys(
		validateAssessments([requiredAssessment, ...forcastedAssessments, ...markedAssessments]).errors
	).map((el) => Number(el));
	$: total = totalWeight(assessments);
	$: required = requiredGrade(desiredGrade, requiredAssessment, assessments);
	$: totalWeighted =
		totalWeightedMark(assessments) + required.requiredGrade * (requiredAssessment.weight / total);

	function handleCalculate() {
		if (invalids.length === 0) {
			setUrlAssessments(forcastedAssessments, $page.url);
		}
	}
</script>

<section class="py-3">
	<div class="flex justify-center p-4">
		<div class="flex gap-5 flex-col md:flex-row">
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
			<CalculateButton on:click={() => handleCalculate()} />
		</div>

		<AssessmentList
			bind:assessments={forcastedAssessments}
			bind:invalids
			{total}
			{handleCalculate}
		/>
	{/if}
	{#if markedAssessments.length > 0}
		<div class="flex justify-between pt-3 sticky top-0 bg-white dark:bg-gray-800">
			<h3 class="text-xl align-middle font-bold dark:text-white p-5">Marked Assessments</h3>
			{#if forcastedAssessments.length === 0}
				<CalculateButton on:click={() => handleCalculate()} />
			{/if}
		</div>
		<AssessmentList bind:assessments={markedAssessments} bind:invalids {total} {handleCalculate} />
	{/if}
</section>
