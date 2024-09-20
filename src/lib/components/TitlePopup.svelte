<script>
	import {
		toggleTitlePopup,
		generalObjectBlog,
		value,
		currentIndex,
		title
	} from '$lib/stores/blogs/store.js';
	import CloseButton from './CloseButton.svelte';
	const closePopup = () => {
		$toggleTitlePopup = false;
	};

	const writeTitle = () => {
		$generalObjectBlog = { ...$generalObjectBlog, title: $title };
		if ($value.length > 1) {
			$value.splice(1, 0, {
				tag: `<h1>...</h1>`,
				content: $title,
				main: true
			});
		} else {
			$value[1] = {
				tag: `<h1>...</h1>`,
				content: $title,
				main: true
			};
		}

		$toggleTitlePopup = false;
	};
</script>

<CloseButton {closePopup} />

<h2>Add main title</h2>
<textarea name="subtitle" rows="20" cols="60" bind:value={$title}></textarea>
<button
	on:click={() => {
		writeTitle();
	}}
>
	{$currentIndex !== null ? 'Rewrite' : 'ADD'}</button
>
