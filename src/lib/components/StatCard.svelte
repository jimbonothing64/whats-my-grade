<script lang="ts">
	export let stat: number;
	export let title: string;
	export let subtitle: string | undefined = undefined;
</script>

<div
	class="w-64 rounded-xl overflow-hidden shadow-md text-gray-700 dark:text-gray-400 bg-white dark:bg-gray-800"
>
	<div class="px-6 py-4">
		<div class=" mb-2">{title}</div>
		<p class="text-2xl font-bold text-black dark:text-white">
			{stat.toFixed(2)}%
		</p>
		{#if subtitle}
			<p class="text-sm">{subtitle}</p>
		{/if}
	</div>
</div>
