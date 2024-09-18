<script>
	import { toggleSubtitle, value } from '../store.js';
	import CloseButton from './CloseButton.svelte';
	let subtitle = '';
	const closePopup = () => {
		$toggleSubtitle = false;
	};
	const addSubtitle = () => {
		$value = [
			...$value,
			{
				tag: '<h2>...</h2>',
				content: subtitle
			}
		];
	};
</script>

<CloseButton {closePopup} />

<h2>Add Subtitle</h2>
<textarea name="subtitle" rows="20" cols="60" bind:value={subtitle}></textarea>
<button
	on:click={() => {
		addSubtitle();
	}}
>
	ADD</button
>
