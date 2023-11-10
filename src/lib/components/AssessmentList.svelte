<script lang="ts">
	import type { Assessment } from '$lib/zod';
	import AssessmentCard from './AssessmentCard.svelte';
	export let assessments: Assessment[];
	export let invalids: number[];
	export let total: number;
	export let hadnleInsert: () => void | undefined;
	export let handleCalculate: () => void;
	export let handleRemove: (i: number) => void;
</script>

<ul class="flex flex-col bg-slate-50 dark:bg-slate-900 gap-3 px-5 py-3">
	{#each assessments as assessment, i (assessment)}
		<AssessmentCard
			bind:assessment
			bind:total
			{i}
			{handleCalculate}
			{handleRemove}
			invalid={invalids.includes(i)}
		/>
	{/each}
	{#if hadnleInsert}
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
	{/if}
</ul>
