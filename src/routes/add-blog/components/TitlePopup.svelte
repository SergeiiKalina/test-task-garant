<script>
	import { toggleTitlePopup, generalObjectBlog, value, currentIndex, title } from '../store.js';
	import CloseButton from './CloseButton.svelte';
	const closePopup = () => {
		$toggleTitlePopup = false;
	};

	const writeTitle = () => {
		$generalObjectBlog = { ...$generalObjectBlog, title: $title };
		$value[1].content = $title;
		$toggleTitlePopup = false;
	};
</script>

<CloseButton {closePopup} />

<h2>Add Subtitle</h2>
<textarea name="subtitle" rows="20" cols="60" bind:value={$title}></textarea>
<button
	on:click={() => {
		writeTitle();
	}}
>
	{$currentIndex !== null ? 'Rewrite' : 'ADD'}</button
>
