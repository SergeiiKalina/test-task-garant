<script>
	import { toggleSeoAndOtherPopup, generalObjectBlog } from '$lib/stores/blogs/store.js';
	import CloseButton from './CloseButton.svelte';
	let titleseo = '';
	let slug = '';
	let descriptionseo = '';

	const closePopup = () => {
		$toggleSeoAndOtherPopup = false;
	};
	const addAllSeo = () => {
		$generalObjectBlog = {
			...$generalObjectBlog,
			titleseo,
			slug,
			descriptionseo
		};
		$toggleSeoAndOtherPopup = false;
	};
</script>

<CloseButton {closePopup} />
<h2>Seo info and other</h2>
<form>
	<label>titleSEO <input type="text" bind:value={titleseo} /></label>
	<label>slug <input type="text" bind:value={slug} /></label>
	<label
		>descriptionSEO <textarea type="text" bind:value={descriptionseo} rows="10" cols="40" /></label
	>
	<button on:click|preventDefault={addAllSeo}>Add All</button>
</form>

<style>
	form {
		display: flex;
		flex-direction: column;
		height: 60%;
		justify-content: space-around;
	}
	label {
		display: flex;
		flex-direction: column;
		text-align: center;
	}
</style>
