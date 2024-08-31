<script>
	import Footer from './Footer.svelte';
	import Header from './Header.svelte';
	import { dictionary, locale } from 'svelte-i18n';
	import translations from '$lib/dictionary/dictionary.json';

	dictionary.set(translations);
	locale.set('en');
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
