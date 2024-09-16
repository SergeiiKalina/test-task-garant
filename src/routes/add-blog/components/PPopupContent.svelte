<script>
	import { togglePPopup, lorem, value } from '../store.js';
	import CloseButton from './CloseButton.svelte';

	let paragraph = '';

	const addP = () => {
		const pTextArea = document.querySelector('textarea');
		$value = [
			...$value,
			{
				tag: `<p style="cursor: pointer;">...</p>`,
				content: pTextArea.value
			}
		];
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
		paragraph = lorem.generateParagraphs(2);
	}}
>
	generate paragraph</button
>
<textarea name="paragraph" rows="20" cols="60" bind:value={paragraph}></textarea>
<button
	on:click={() => {
		addP();
	}}
>
	ADD</button
>

<style>
	textarea {
		margin: 12px 0;
	}
</style>
