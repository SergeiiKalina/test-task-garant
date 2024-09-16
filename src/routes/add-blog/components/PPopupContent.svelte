<script>
	import { togglePPopup, lorem, value } from '../store.js';

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
</script>

<button
	class="button-popup-close"
	type="button"
	on:click={() => {
		$togglePPopup = false;
	}}>X</button
>
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
	.button-popup-close {
		position: absolute;
		top: 10px;
		right: 10px;
		color: red;
	}
	textarea {
		margin: 12px 0;
	}
</style>
