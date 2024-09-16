<script>
	import { toggleTitlePopup, title, generalObjectBlog } from '../store.js';
	import CloseButton from './CloseButton.svelte';

	let txtTitle = '';

	const closePopup = () => {
		$toggleTitlePopup = false;
	};

	const writeTitle = () => {
		$generalObjectBlog = { ...$generalObjectBlog, title: txtTitle };
		$title = `<h1>${txtTitle}</h1>`;
		$toggleTitlePopup = false;
	};
</script>

<CloseButton {closePopup} />

<input type="text" name="a-href" bind:value={txtTitle} />

<button on:click={writeTitle}>ADD Title</button>
