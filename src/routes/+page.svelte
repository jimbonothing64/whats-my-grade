<script lang="ts">
	import { weightedMark, totalWeightedMark, totalInvigilatedWeightedMark } from '$lib/grades';
	let assessments = [
		{ name: 'Assignment1', weight: 50.0, mark: 100.0, invigilated: false },
		{ name: 'Assignment2', weight: 25.0, mark: 100.0, invigilated: false },
		{ name: 'Assignment3', weight: 25.0, mark: 100.0, invigilated: false }
	];
	let totalWeighted = totalWeightedMark(assessments);
	let totalInvigilated = totalInvigilatedWeightedMark(assessments);

	function handleCalculate() {
		totalWeighted = totalWeightedMark(assessments);
		totalInvigilated = totalInvigilatedWeightedMark(assessments);
	}

	function handleRemove(indexToRemove: number) {
		assessments = assessments.filter((_, index) => index !== indexToRemove);
	}

	function hadnleInsert() {
		assessments = [...assessments, { name: '', weight: 0, mark: 0, invigilated: false }];
	}
</script>

<div class="flex flex-col items-center gap-5">
	<div class="text-center">
		<h1
			class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white"
		>
			What's my grade?
		</h1>
		<p
			class="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400"
		>
			A tool to help students calculate their current grades in various courses. You can input
			assessment scores and weightings, and be provided with an estimate of your current standing in
			the course.
		</p>
	</div>
	<div>
		<h3 class="text-3xl font-bold dark:text-white">Assessments</h3>
		<div class="relative overflow-x-auto">
			<table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
				<thead
					class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
				>
					<tr>
						<th scope="col" class="px-6 py-3">Name </th>
						<th scope="col" class="px-6 py-3">Weight </th>
						<th scope="col" class="px-6 py-3">Grade </th>
						<th scope="col" class="px-6 py-3">Invigilated </th>
						<th scope="col" class="px-6 py-3" />
					</tr>
				</thead>
				<tbody>
					{#each assessments as assessment, i}
						<li />
						<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
							<th
								scope="row"
								class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
							>
								<input bind:value={assessment.name} />
							</th>
							<td class="px-6 py-4">
								<input bind:value={assessment.weight} />
							</td>
							<td class="px-6 py-4">
								<input bind:value={assessment.mark} />
							</td>
							<td class="px-6 py-4">
								<input type="checkbox" bind:checked={assessment.invigilated} />
							</td>
							<td class="px-6 py-4">
								<button
									on:click={() => handleRemove(i)}
									class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
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
				</tbody>
			</table>
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
		</div>
	</div>
	<div>
		<button
			on:click={() => handleCalculate()}
			class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
			>Calculate</button
		>
	</div>
	<div>
		<p>Total mark: {totalWeighted}</p>
		<p>Total invigilated mark: {totalInvigilated}</p>
	</div>
</div>
