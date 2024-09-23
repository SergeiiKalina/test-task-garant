<script>
	import {
		togglePopup,
		generalObjectBlog,
		subtitle,
		currentIndex
	} from '$lib/stores/blogs/store.js';
	import CloseButton from './CloseButton.svelte';

	const closePopup = () => {
		$togglePopup = null;
	};
	const addSubtitle = () => {
		if ($currentIndex !== null) {
			$generalObjectBlog.content[$currentIndex].content = $subtitle;
		} else {
			$generalObjectBlog.content = [
				...$generalObjectBlog.content,
				{
					tag: '<h2>...</h2>',
					content: $subtitle
				}
			];
		}
		$togglePopup = null;
	};
</script>

<CloseButton {closePopup} />

<h2>Add Subtitle</h2>
<textarea name="subtitle" rows="20" cols="60" bind:value={$subtitle}></textarea>
<button
	on:click={() => {
		addSubtitle();
	}}
>
	{$currentIndex !== null ? 'Rewrite' : 'ADD'}</button
>

<style>
	button {
		margin-top: 12px;
	}
</style>
