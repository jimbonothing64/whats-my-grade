<script lang="ts">
	import type { Assessment } from '$lib/zod';
	import { weightedMark } from '$lib/grades';
	import AssessmentCard from './AssessmentCard.svelte';
	import AssessmentDetial from './AssessmentDetial.svelte';
	import { minRequiredGradeUrl } from '$lib/url';

	export let assessments: Assessment[];
	export let invalids: number[];
	export let total: number;
	export let handleCalculate: () => void = () => {};
	export let handleRemove: (i: number) => void = (i) => {};
</script>

<ul class="flex flex-col bg-slate-50 dark:bg-slate-900 gap-3 px-5 py-3">
	{#each assessments as assessment, i (assessment)}
		<AssessmentCard state={invalids.includes(i) ? 'invalid' : 'none'}>
			<AssessmentDetial bind:assessment {handleCalculate} invalid={invalids.includes(i)}>
				{#if !invalids.includes(i) && assessment.mark === 0}
					<div class="justify-end">
						<a href={minRequiredGradeUrl(i, assessments).toString()}>Calc</a>
					</div>
				{/if}
				{#if invalids.includes(i)}
					<div
						class="font-medium md:flex md:justify-end md:flex-grow text-inherit bg-inherit text-red-500 dark:text-red-400 hover:underline opacity-100 group-hover:hidden hidden"
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
								d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
							/>
						</svg>
					</div>
				{:else}
					<div class="md:flex md:flex-wrap md:flex-grow md:justify-end group-hover:hidden hidden">
						<div>
							<span class="font-bold">{(weightedMark(assessment) || 0).toFixed(2)}%&nbsp;</span>
						</div>
						<div>of {total.toFixed(2)}%</div>
					</div>
				{/if}

				<button
					on:click={() => handleRemove(i)}
					class="font-medium hidden justify-end md:justify-end md:flex-grow text-inherit bg-inherit hover:underline md:hidden md:group-hover:flex"
					><svg
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
							d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
				</button>
				<div class="flex justify-between md:hidden">
					<button
						on:click={() => handleRemove(i)}
						class="font-medium flex justify-end md:justify-between text-inherit bg-inherit hover:underline md:hidden group-hover:flex"
						><svg
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
								d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
					</button>
				</div>
			</AssessmentDetial>
		</AssessmentCard>
	{/each}
	<slot />
</ul>
