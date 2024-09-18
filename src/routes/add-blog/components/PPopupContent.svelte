<script>
	import { togglePPopup, lorem, value, paragraph, currentIndex } from '../store.js';
	import CloseButton from './CloseButton.svelte';

	const addP = () => {
		if (currentIndex !== null) {
			$value[$currentIndex].content = $paragraph;
			$currentIndex = null;
		} else {
			$value = [
				...$value,
				{
					tag: `<p style="cursor: pointer;">...</p>`,
					content: $paragraph
				}
			];
		}

		$togglePPopup = false;
	};
	const closePopup = () => {
		$togglePPopup = false;
	};
</script>

<CloseButton {closePopup} />

<h2>Add Paragraph</h2>
<button
	on:click={() => {
		$paragraph = lorem.generateParagraphs(2);
	}}
>
	generate paragraph</button
>
<textarea name="paragraph" rows="20" cols="60" bind:value={$paragraph}></textarea>
<button
	on:click={() => {
		addP();
	}}
>
	{$currentIndex !== null ? 'Rewrite' : 'ADD'}</button
>

<style>
	textarea {
		margin: 12px 0;
	}
</style>
