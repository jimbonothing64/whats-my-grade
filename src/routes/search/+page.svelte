<script lang="ts">
	import AssessmentCard from '$lib/components/AssessmentCard.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	let courses = data.courses;
</script>

<ul class="flex flex-col gap-3 p-4">
	{#each courses as course}
		<AssessmentCard><a href={`/search/${course}`}>{course}</a></AssessmentCard>
	{/each}
</ul>
