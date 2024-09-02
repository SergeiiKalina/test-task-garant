<script>
	import Footer from '$src/components/Footer.svelte';
	import Header from '$src/components/Header.svelte';
</script>

<div class="app">
	<Header />
	<main>
		<slot />
	</main>

	<Footer />
</div>

<style>
</style>
