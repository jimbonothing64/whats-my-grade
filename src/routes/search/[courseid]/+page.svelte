<script lang="ts">
	import AssessmentCard from '$lib/components/AssessmentCard.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	let course = data.course;
</script>

<h3>{course.name}</h3>
<p>
	{course.code}
</p>
