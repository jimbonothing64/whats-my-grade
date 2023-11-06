<script lang="ts">
	import { weightedMark, totalWeightedMark, totalInvigilatedWeightedMark } from '$lib/grades';
	import { validateAssessments, type Assessment } from '$lib/zod';
	let assessments: Assessment[] = [
		{ name: 'Assignment1', weight: 50.0, mark: 100.0, invigilated: false },
		{ name: 'Assignment2', weight: 25.0, mark: 100.0, invigilated: false },
		{ name: 'Assignment3', weight: 25.0, mark: 100.0, invigilated: false }
	];
	let totalWeighted = totalWeightedMark(assessments);
	let totalInvigilated = totalInvigilatedWeightedMark(assessments);

	function handleCalculate() {
		const { valids, errors } = validateAssessments(assessments);
		console.log(assessments);
		console.log(valids);
		console.log(errors);
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

<div class="flex flex-col items-center gap-5">
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
	<div class="flex gap-5">
		<div class="w-64 rounded-xl overflow-hidden shadow-md text-gray-700 dark:text-gray-400">
			<div class="px-6 py-4">
				<div class=" mb-2">Grade</div>
				<p class=" text-2xl font-bold">
					{totalWeighted.toFixed(2)}
				</p>
			</div>
		</div>

		<div class="w-64 rounded-xl overflow-hidden shadow-md text-gray-700 dark:text-gray-400">
			<div class="px-6 py-4">
				<div class=" mb-2">Invigilated</div>
				<p class="text-2xl font-bold">
					{totalInvigilated.toFixed(2)}%
				</p>
			</div>
		</div>
	</div>
	<div>
		<h3 class="text-3xl font-bold p-3 dark:text-white">Assessments</h3>
		<div class="relative overflow-x-auto">
			<table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
				<thead
					class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
				>
					<tr>
						<th scope="col" class="px-6 py-3">Name</th>
						<th scope="col" class="px-6 py-3">Weight</th>
						<th scope="col" class="px-6 py-3">Grade</th>
						<th scope="col" class="px-6 py-3">Invigilated</th>
						<th scope="col" class="px-6 py-3">Contribution</th>
					</tr>
				</thead>
				<tbody class="font-medium text-gray-900 dark:text-white">
					{#each assessments as assessment, i}
						<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 group">
							<td class="px-6 py-4">
								<input
									bind:value={assessment.name}
									on:keyup={(e) => handleKeyPress(e)}
									class="bg-white dark:bg-gray-800"
								/>
							</td>
							<td class="px-6 py-4">
								<input
									bind:value={assessment.weight}
									on:keyup={(e) => handleKeyPress(e)}
									class="bg-white dark:bg-gray-800"
								/>
							</td>
							<td class="px-6 py-4">
								<input
									bind:value={assessment.mark}
									on:keyup={(e) => handleKeyPress(e)}
									class="bg-white dark:bg-gray-800"
								/>
							</td>
							<td class="px-6 py-4">
								<input
									type="checkbox"
									bind:checked={assessment.invigilated}
									class="bg-white dark:bg-gray-800"
								/>
							</td>
							<td class="px-6 py-4">
								<span class="opacity-100 group-hover:opacity-0">
									{(weightedMark(assessment) || 0).toFixed(2)}%
								</span>
								<button
									on:click={() => handleRemove(i)}
									class="font-medium align-middle text-blue-600 dark:text-blue-500 hover:underline opacity-0 group-hover:opacity-100"
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
							</td>
						</tr>
					{/each}
					<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 group">
						<td class="px-6 py-4" />
						<td class="px-6 py-4" />
						<td class="px-6 py-4" />
						<td class="px-6 py-4" />
						<td class="px-6 py-4">
							<button
								on:click={() => hadnleInsert()}
								class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
								><svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="w-6 h-6"
								>
									<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
								</svg>
							</button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
	<div>
		<button
			on:click={() => handleCalculate()}
			class="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 inline-flex items-center"
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
			Calculate
		</button>
	</div>
</div>
