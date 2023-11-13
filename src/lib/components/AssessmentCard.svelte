<script lang="ts">
	export let invalid = false;
</script>

{#if invalid}
	<div
		class="flex flex-col md:flex-row md:items-center p-4 gap-x-3 justify-between text-lg hover:shadow-md group rounded-md ring-1 ring-red-200 bg-white dark:bg-gray-800 shadow-sm"
	>
		<slot />
	</div>
{:else}
	<div
		class="flex flex-col md:flex-row md:items-center p-4 gap-x-3 justify-between text-lg hover:shadow-md group rounded-md ring-1 ring-slate-200 bg-white dark:bg-gray-800 shadow-sm"
	>
		<slot />
	</div>
{/if}
