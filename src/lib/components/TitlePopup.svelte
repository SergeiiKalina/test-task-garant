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
		const newMainTitle = {
			tag: `<h1>...</h1>`,
			content: $title,
			main: true
		};
		const index = $value.findIndex((el) => el.main && el.tag === '<h1>...</h1>');
		console.log(index);
		if (index === -1 && $value.length > 1) {
			value.update((v) => {
				v.splice(1, 0, newImageObject);
				return v;
			});
		}
		if ($value.length === 1 && $value[0].main && $value[0].tag === '<h1>...</h1>') {
			$value[0] = newMainTitle;
		}
		if ($value.length > 1 && $value[1].main) {
			$value[1] = newMainTitle;
		} else {
			console.log('call');
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
