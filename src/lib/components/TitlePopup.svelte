<script>
	import { togglePopup, generalObjectBlog, currentIndex } from '$lib/stores/blogs/store.js';
	import CloseButton from './CloseButton.svelte';
	let title = '';

	const closePopup = () => {
		$togglePopup = null;
	};

	const writeTitle = () => {
		$generalObjectBlog = { ...$generalObjectBlog, title };
		const newMainTitle = {
			tag: `<h1>...</h1>`,
			content: title,
			main: true
		};

		const index = $generalObjectBlog.content.findIndex(
			(el) => el.main && el.tag === '<h1>...</h1>'
		);

		if (index === -1 && $generalObjectBlog.content.length > 0) {
			if (
				$generalObjectBlog.content[0].tag.startsWith('<div') &&
				$generalObjectBlog.content[0].main
			) {
				generalObjectBlog.update((v) => {
					v.content.splice(1, 0, newMainTitle);
					return v;
				});
			} else {
				generalObjectBlog.update((v) => {
					v.content.unshift(newMainTitle);
					return v;
				});
			}
		} else {
			$generalObjectBlog.content[index] = newMainTitle;
		}

		$togglePopup = null;
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
