<script lang="ts">
	import type { Assessment } from '$lib/zod';

	export let assessment: Assessment;
	export let invalid: Boolean;
	export let handleCalculate: () => void;
</script>

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
		class="outline-none w-16 text-inherit bg-inherit border-b border-dashed text-right"
	/>
</label>
<label>
	Mark:
	<input
		bind:value={assessment.mark}
		on:focusout={() => handleCalculate()}
		class="outline-none w-16 text-inherit bg-inherit border-b border-dashed text-right"
	/>
</label>
<label class="w-26">
	Invigilated:
	<input
		type="checkbox"
		bind:checked={assessment.invigilated}
		on:change={() => handleCalculate()}
		class="outline-none"
	/>
</label>
<slot />
