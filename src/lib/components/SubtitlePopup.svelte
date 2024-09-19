<script>
	import { toggleSubtitle, value, subtitle, currentIndex } from '$lib/stores/blogs/store.js';
	import CloseButton from './CloseButton.svelte';

	const closePopup = () => {
		$toggleSubtitle = false;
	};
	const addSubtitle = () => {
		if ($currentIndex !== null) {
			$value[$currentIndex].content = $subtitle;
		} else {
			$value = [
				...$value,
				{
					tag: '<h2>...</h2>',
					content: $subtitle
				}
			];
		}
		$toggleSubtitle = false;
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
