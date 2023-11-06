<script lang="ts">
	import StatCard from '$lib/components/StatCard.svelte';
	import {
		weightedMark,
		totalWeightedMark,
		totalInvigilatedWeightedMark,
		totalWeight
	} from '$lib/grades';
	import { validateAssessments, type Assessment } from '$lib/zod';
	let assessments: Assessment[] = [
		{ name: 'Assignment1', weight: 50.0, mark: 100.0, invigilated: false },
		{ name: 'Assignment2', weight: 25.0, mark: 100.0, invigilated: false },
		{ name: 'Assignment3', weight: 25.0, mark: 100.0, invigilated: false }
	];
	let totalWeighted = totalWeightedMark(assessments);
	let totalInvigilated = totalInvigilatedWeightedMark(assessments);
	let total = totalWeight(assessments);

	function handleCalculate() {
		const { valids, errors } = validateAssessments(assessments);
		console.log(errors);
		total = totalWeight(valids);
		totalWeighted = totalWeightedMark(valids);
		totalInvigilated = totalInvigilatedWeightedMark(valids);
	}

	function handleRemove(indexToRemove: number) {
		assessments = assessments.filter((_, index) => index !== indexToRemove);
	}

	function hadnleInsert() {
		assessments = [...assessments, { name: '', weight: 0, mark: 0, invigilated: false }];
	}

	function handleKeyPress(e: KeyboardEvent) {
		if (e.key == 'Enter') handleCalculate();
	}
</script>

<section>
	<div class="text-center">
		<h1
			class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white"
		>
			What's my <span
				class="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-600"
				>grade</span
			>?
		</h1>
		<p
			class="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400"
		>
			A tool to help students calculate their current grades in various courses. You can input
			assessment scores and weightings, and be provided with an estimate of your current standing in
			the course.
		</p>
	</div>
</section>
<section class=" py-5">
	<div class="flex justify-center">
		<div class="flex gap-5 flex-col md:flex-row">
			<StatCard bind:stat={totalWeighted} title="Grade" />
			<StatCard bind:stat={totalInvigilated} title="Invigilated" />
		</div>
	</div>
	<div>
		<div class="flex justify-between">
			<h3 class="text-xl font-bold dark:text-white p-5">Assessments</h3>
			<button
				on:click={() => handleCalculate()}
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
		<div class="flex flex-col bg-slate-50 dark:bg-slate-900 gap-3 px-5 py-3">
			{#each assessments as assessment, i}
				<div
					class="flex flex-col md:flex-row md:items-center p-4 gap-x-3 justify-between text-lg hover:shadow-md group rounded-md ring-1 ring-slate-200 bg-white dark:bg-gray-800 shadow-sm"
				>
					<input
						bind:value={assessment.name}
						on:keyup={(e) => handleKeyPress(e)}
						placeholder="Assessment Name"
						class=" font-bold outline-none text-inherit bg-inherit w-48"
					/>

					<label>
						Weight:
						<input
							bind:value={assessment.weight}
							on:keyup={(e) => handleKeyPress(e)}
							class="outline-none w-32 text-inherit bg-inherit"
						/>
					</label>
					<label>
						Mark:
						<input
							bind:value={assessment.mark}
							on:keyup={(e) => handleKeyPress(e)}
							class="outline-none w-32 text-inherit bg-inherit"
						/>
					</label>
					<label class="w-32">
						Invigilated:
						<input type="checkbox" bind:checked={assessment.invigilated} class="outline-none" />
					</label>
					<div class="flex flex-wrap">
						<div>
							<span class="font-bold">{(weightedMark(assessment) || 0).toFixed(2)}%&nbsp;</span>
						</div>
						<div>of {total.toFixed(2)}%</div>
					</div>

					<button
						on:click={() => handleRemove(i)}
						class="font-medium flex justify-end md:justify-between text-inherit bg-inherit hover:underline md:opacity-0 group-hover:opacity-100"
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
			{/each}

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
		</div>
	</div>
</section>
