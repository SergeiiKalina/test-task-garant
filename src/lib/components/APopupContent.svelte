<script>
	import {
		togglePopup,
		generalObjectBlog,
		currentIndex,
		startSymbol,
		endSymbol,
		editableEl,
		indexLi
	} from '$lib/stores/blogs/store.js';
	import CloseButton from '$lib/components/CloseButton.svelte';
	let url = '';

	const parseString = (text, url) => {
		let startTag = false;
		let counter = 0;
		let result = '';

		[...text].forEach((el) => {
			if (el === '<') {
				startTag = true;
			}
			if (!startTag) {
				if (counter === $startSymbol) {
					result += `<a href="${url}">`;
				}
				if (counter === $endSymbol) {
					result += '</a>';
				}
				counter++;
			}
			result += el;
			if (el === '>') {
				startTag = false;
			}
		});
		return result;
	};

	function addURL(url) {
		const content = $generalObjectBlog.content[$currentIndex].content;

		if ($indexLi) {
			const regex = new RegExp(`<li\\s+data-index="${$indexLi}">(.*?)<\/li>`, 'g');
			const modifiedContent = content.replace(regex, (match, p1) => {
				return `<li data-index="${$indexLi}">${parseString(p1, url)}</li>`;
			});
			$generalObjectBlog.content[$currentIndex].content = modifiedContent;
			$indexLi = null;
		} else {
			$generalObjectBlog.content[$currentIndex].content = parseString(content, url);
		}

		document.querySelectorAll('.draggable-block').forEach((el) => (el.draggable = false));
		$togglePopup = null;
		$editableEl = null;
		$currentIndex = null;
	}

	const closePopup = () => {
		$togglePopup = null;
		$editableEl = null;
		$indexLi = null;
	};
</script>

<CloseButton {closePopup} />

<input type="text" name="a-href" bind:value={url} />

<button on:click={() => addURL(url)}>ADD HREF</button>
