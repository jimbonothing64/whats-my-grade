<script lang="ts">
	import '../app.css';
</script>

<main class="text-gray-900 dark:text-white bg-white dark:bg-gray-800 pt-10">
	<section class="text-center">
		<h1
			class="mb-4 px-3 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white"
		>
			&#x1F913 What's my <span
				class="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-600"
				>grade</span
			>?
		</h1>
		<p
			class="mb-6 px-2 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400"
		>
			A tool to help students calculate their current grades in various courses. You can input
			assessment scores and weightings, and be provided with an estimate of your current standing in
			the course.
		</p>
	</section>
	<slot />
</main>
