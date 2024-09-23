<script>
	import {
		toggleTitlePopup,
		generalObjectBlog,
		value,
		currentIndex
	} from '$lib/stores/blogs/store.js';
	import CloseButton from './CloseButton.svelte';
	let title = '';

	const closePopup = () => {
		$toggleTitlePopup = false;
	};

	const writeTitle = () => {
		$generalObjectBlog = { ...$generalObjectBlog, title };
		const newMainTitle = {
			tag: `<h1>...</h1>`,
			content: title,
			main: true
		};

		const index = $value.findIndex((el) => el.main && el.tag === '<h1>...</h1>');

		if (index === -1 && $value.length > 0) {
			if ($value[0].tag.startsWith('<div') && $value[0].main) {
				value.update((v) => {
					v.splice(1, 0, newMainTitle);
					return v;
				});
			} else {
				value.update((v) => {
					v.unshift(newMainTitle);
					return v;
				});
			}
		} else {
			$value[index] = newMainTitle;
		}

		$toggleTitlePopup = false;
	};
</script>

<CloseButton {closePopup} />

<h2>Add main title</h2>
<textarea name="subtitle" rows="20" cols="60" bind:value={title}></textarea>
<button
	on:click={() => {
		writeTitle();
	}}
>
	{$currentIndex !== null ? 'Rewrite' : 'ADD'}</button
>
