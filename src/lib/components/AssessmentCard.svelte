<script lang="ts">
	import { weightedMark } from '$lib/grades';
	import type { Assessment } from '$lib/zod';

	export let assessment: Assessment;
	export let invalid: Boolean;
	export let i: number;
	export let total: number;
	export let handleCalculate: () => void;
	export let handleRemove: (i: number) => void;
</script>

<div
	class="flex flex-col md:flex-row md:items-center p-4 gap-x-3 justify-between text-lg hover:shadow-md group rounded-md ring-1 ring-slate-200 bg-white dark:bg-gray-800 shadow-sm"
>
	<div class="flex flex-row justify-between">
		<input
			bind:value={assessment.name}
			on:focusout={() => handleCalculate()}
			placeholder="Assessment Name"
			class=" font-bold outline-none text-inherit bg-inherit w-48"
		/>

		{#if invalid}
			<div
				class="font-medium text-red-500 dark:text-red-400 md:hidden text-inherit bg-inherit hover:underline"
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
		{/if}
	</div>

	<label>
		Weight:
		<input
			bind:value={assessment.weight}
			on:focusout={() => handleCalculate()}
			class="outline-none w-32 text-inherit bg-inherit border-b border-dashed"
		/>
	</label>
	<label>
		Mark:
		<input
			bind:value={assessment.mark}
			on:focusout={() => handleCalculate()}
			class="outline-none w-32 text-inherit bg-inherit border-b border-dashed"
		/>
	</label>
	<label class="w-32">
		Invigilated:
		<input
			type="checkbox"
			bind:checked={assessment.invigilated}
			on:change={() => handleCalculate()}
			class="outline-none"
		/>
	</label>

	{#if invalid}
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
</div>
