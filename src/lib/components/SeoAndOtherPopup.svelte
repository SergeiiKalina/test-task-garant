<script>
	import {
		toggleSeoAndOtherPopup,
		generalObjectBlog,
		titleseo,
		slug,
		descriptionseo
	} from '$lib/stores/blogs/store.js';
	import CloseButton from './CloseButton.svelte';

	const closePopup = () => {
		$toggleSeoAndOtherPopup = false;
	};
	const addAll = () => {
		$generalObjectBlog = {
			...$generalObjectBlog,
			titleseo: $titleseo,
			slug: $slug,
			descriptionseo: $descriptionseo
		};
		$toggleSeoAndOtherPopup = false;
	};
</script>

<CloseButton {closePopup} />
<h2>Seo info and other</h2>
<form>
	<label>titleSEO <input type="text" bind:value={$titleseo} /></label>
	<label>slug <input type="text" bind:value={$slug} /></label>
	<label
		>descriptionSEO <textarea type="text" bind:value={$descriptionseo} rows="10" cols="40" /></label
	>
	<button on:click|preventDefault={addAll}>Add All</button>
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
