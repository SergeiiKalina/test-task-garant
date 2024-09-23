<script>
	import {
		togglePopup,
		lorem,
		generalObjectBlog,
		paragraph,
		currentIndex
	} from '$lib/stores/blogs/store.js';
	import CloseButton from './CloseButton.svelte';

	const addParagraph = () => {
		const objParagraph = {
			tag: `<p style="cursor: pointer;">...</p>`,
			content: $paragraph
		};
		if ($currentIndex !== null) {
			$generalObjectBlog.content[$currentIndex].content = $paragraph;
			$currentIndex = null;
		} else {
			$generalObjectBlog.content = [...$generalObjectBlog.content, objParagraph];
		}

		$togglePopup = null;
	};
	const closePopup = () => {
		$togglePopup = null;
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
<button on:click={addParagraph}> {$currentIndex !== null ? 'Rewrite' : 'ADD'}</button>

<style>
	textarea {
		margin: 12px 0;
	}
</style>
