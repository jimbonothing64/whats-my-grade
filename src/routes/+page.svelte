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
	}
</script>

<div class="flex flex-col text-center">
	<div>
		<h1
			class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white"
		>
			What's my grade?
		</h1>
		<p
			class="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400"
		>
			A tool designed to help students calculate their current grades in various courses. Users can
			input their assignment scores, weightings, and desired final grades, and the website will
			provide them with an estimate of their current standing in the course.
		</p>
	</div>
	<div>
		<ul>
			{#each assessments as assessment}
				<li>
					<input bind:value={assessment.name} />
					<input bind:value={assessment.weight} />
					<input bind:value={assessment.mark} />
					<input type="checkbox" bind:checked={assessment.invigilated} />
				</li>
			{/each}
		</ul>
		<button on:click={() => handleCalculate()}>Calculate</button>
	</div>
	<div>
		<p>Total mark: {totalWeighted}</p>
		<p>Total invigilated mark: {totalInvigilated}</p>
	</div>
</div>
